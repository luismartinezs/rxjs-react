import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useRef,
} from "react";
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  scan,
  share,
  Subject,
} from "rxjs";

type Context = Readonly<{
  stackModal: () => {
    isTopmostModal: () => boolean;
    destroy: () => void;
  };
}>;

const developerWarning = (): never => {
  throw new Error("Don't use a11y outside of a11y provider");
};

const ModalsContext = createContext<Context>({
  // implement initial context methods
  stackModal: developerWarning,
});

type ModalSubject = {
  key: string;
  id: string | undefined;
};

const useRegisteredModals = () => {
  return useMemo(() => {
    const modalRegistration$ = new Subject<ModalSubject>();
    const modalLookup$ = modalRegistration$.pipe(
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
      registerModal: (reg: { key: string; id: string }) => {
        modalRegistration$.next(reg);
        return () => modalRegistration$.next({ key: reg.key, id: undefined });
      },
      subscribeToModalRegister: (
        key: string,
        callback: (newValue: string | undefined) => void
      ) => {
        const sub = modalLookup$
          .pipe(
            map((lookup) => (key ? lookup[key] : undefined)),
            distinctUntilChanged()
          )
          .subscribe(callback);
        return () => sub.unsubscribe();
      },
    };
  }, []);
};

export const useModals = () => {
  return useContext(ModalsContext);
};

export const ModalsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const modalStack = useRef<symbol[]>([]);
  const context = useMemo<Context>(
    () =>
      Object.freeze({
        stackModal: () => {
          const id = Symbol("Modal stack ID");
          modalStack.current.push(id);
          return {
            isTopmostModal: () =>
              modalStack.current[modalStack.current.length - 1] === id,
            destroy: () => {
              const poppedId = modalStack.current.pop();
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
    <ModalsContext.Provider value={context}>{children}</ModalsContext.Provider>
  );
};
