import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Subject,
  scan,
  BehaviorSubject,
  share,
  map,
  distinctUntilChanged,
} from "rxjs";
import { v4 } from "uuid";

type StringOrFalsy = string | false | undefined | null;
type HTMLID = string | undefined;
type Context = Readonly<{
  /**
   * Look up an HTML ID for a particular key.
   *
   * @example
  function DescribedInput() {
    const describedBy = useA11y().useLabelledOrDescribedBy("some-key");
    return <input type="text" aria-label="Input's label" aria-describedby={describedBy} />
  }
   */
  useLabelledOrDescribedBy: (key: StringOrFalsy) => HTMLID;
  /**
   * Register an HTML ID that can be looked up later by key
   *
   * @example
  function DescriberElement() {
    const id = useA11y().useRegisteredId("some-key")
    return <span id={id}>I describe some other element with aria-describedBy attribute</span>
  }
   */
  useRegisteredId: (key: StringOrFalsy) => HTMLID;
  /**
   * Use this in "stacked" elements such as modals, to see which one is "on top"
   */
  createComponentSpecificityId: () => {
    isComponentMostSpecific: () => boolean;
    destroy: () => void;
  };
}>;

const developerWarning = (): never => {
  throw new Error("Don't use a11y outside of a11y provider");
};

// init context
const A11yContext = createContext<Context>({
  useLabelledOrDescribedBy: developerWarning,
  useRegisteredId: developerWarning,
  createComponentSpecificityId: developerWarning,
});

const useRegisteredIdLookup = () => {
  // run only mount and memoize
  return useMemo(() => {
    // create new subject (observable that does not execute when registering a subscriber)
    const idRegistration$ = new Subject<{
      key: string;
      id: string | undefined;
    }>();
    // observer that will multicast an object of shape [key]: id
    const idLookup$ = idRegistration$.pipe(
      scan((acc, { key, id }) => ({ ...acc, [key]: id }), {}),
      share({
        // BehaviorSubject keeps track of a "value"
        connector: () =>
          new BehaviorSubject<Record<string, string | undefined>>({}),
        resetOnError: false,
        resetOnComplete: false,
        resetOnRefCountZero: false,
      })
    );
    return {
      registerKeyForId: (reg: { key: string; id: string }) => {
        // add one key-id to the registry
        idRegistration$.next(reg);
        // callback to remove the id from the registry
        return () => idRegistration$.next({ key: reg.key, id: undefined });
      },
      subscribeToKeyForRegisteredId: (
        key: StringOrFalsy,
        callback: (newValue: HTMLID) => void
      ) => {
        // subscriber runs callback on every change to the id registry
        const sub = idLookup$
          .pipe(
            map((lookup) => (key ? lookup[key] : undefined)),
            distinctUntilChanged()
          )
          .subscribe(callback);
        // returns callback to unsubscribe
        return () => sub.unsubscribe();
      },
    };
  }, []);
};

export const useA11y = () => {
  return useContext(A11yContext);
};

// helper hook to generate unique ids
export const useId = (): string => {
  return useMemo(() => v4(), []);
};

export const A11yProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const componentStack = useRef<symbol[]>([]);
  const { registerKeyForId, subscribeToKeyForRegisteredId } =
    useRegisteredIdLookup();
  // build provider context (an object with methods to interact with the registry)
  const context = useMemo<Context>(
    // memoize context on mount to avoid rerenders
    () =>
      // make context readonly
      Object.freeze({
        // look up id by key, and subscribe to changes on that key, so if the id changes, the subscriber is notified
        useLabelledOrDescribedBy: (key) => {
          const [id, setId] = useState<HTMLID>();
          useEffect(
            () => subscribeToKeyForRegisteredId(key, setId),
            [subscribeToKeyForRegisteredId, key]
          );
          return id;
        },
        // given a key, generate a unique id and register the key, id pair (add it to the registry)
        // run the effect only mount, and if key or useRegisteredId change
        useRegisteredId: (key) => {
          const id = useId();
          useEffect(() => {
            if (key) {
              return registerKeyForId({ key, id });
            }
          }, [key, registerKeyForId]);
          return key ? id : undefined;
        },
        createComponentSpecificityId: () => {
          const id = Symbol("Component stack ID");
          componentStack.current.push(id);
          return {
            isComponentMostSpecific: () =>
              componentStack.current[componentStack.current.length - 1] === id,
            destroy: () => {
              const poppedId = componentStack.current.pop();
              if (poppedId !== id) {
                throw new Error("Component specificity out of sync");
              }
            },
          };
        },
      }),
    []
  );
  return (
    <A11yContext.Provider value={context}>{children}</A11yContext.Provider>
  );
};
