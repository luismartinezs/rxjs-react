import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  scan,
  share,
  Subject,
} from "rxjs";

interface IContext {
  // define types for hooks provided by context
}

interface IState {
  [index: string]: any;
}

// helper function
const developerWarning = (): never => {
  throw new Error("Don't use a11y outside of a11y provider");
};

const Context = createContext<IContext>({
  // provide hooks that components will execute to get state and methods
});

// this is basically a store with initial state, mutations and getters
const useObservable = () => {
  /**
   * include here observable logic:
   * - Create observable, possibly a Subject or a BehaviorSubject (its shape will depend on things such as the number of subscribers, the number of events, etc.)
   * - Define methods to interact with observable
   *  - Push data / register events ("setters")
   *  - Subscribe / unsubscribe ("getters")
   * - Return the methods
   */
  // Only initialize state on mount
  return useMemo(() => {
    // Create new observable, to define state. We're going to allow an object with any shape to make it generic
    // imagine the subject as something that captures new events, like a bucket where we put events
    const subject$ = new Subject<IState>();
    // create new source, it will pipe the events from the observable
    // imagine the source as a literal source that produces new state that subscribers listen to
    const source$ = subject$.pipe(
      // do whatever you need to do with the events, this is the equivalent of reducer or mutation logic
      // we're going to merge the payload with the current state
      scan((acc, curr) => {
        return { ...acc, ...curr };
      }),
      // we use "share" to multicast the source, so that we don't have to recompute the state for each subscriber (i.e. we plan to have multiple subscribers)
      share({
        // we use a BehaviorSubject because we need to have the last state available to new subscribers
        connector: () => new BehaviorSubject({}), // "{}" is essentially the initial state
        // we don't want to reset state
        resetOnError: false,
        resetOnComplete: false,
        resetOnRefCountZero: false,
      })
    );
    return {
      // method to push data to the observable
      update: (data: IState) => {
        // we push data to the SUBJECT
        subject$.next(data);
        // we could return a callback if we wanted to, for example, remove data on unmount
      },
      // method to subscribe to state changes
      subscribe: (callback: (state: IState) => void) => {
        // we subscribe to the SOURCE, and run the callback for each event
        const sub = source$
          // we pipe the source. this is the equivalent to a getter
          .pipe(
            // we're going to simply return the state untouched
            map((state) => state),
            // only emit if state changed
            distinctUntilChanged()
          )
          .subscribe(callback);
        return () => sub.unsubscribe();
      },
    };
  }, []);
};

export const useStore = () => useContext(Context);

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const context = {};

  return <Context.Provider value={context}>{children}</Context.Provider>;
};
