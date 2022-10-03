import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BehaviorSubject, distinctUntilChanged, map } from "rxjs";
import { v4 } from "uuid";

interface IStackItem {
  id: string;
  value: string;
  priority: number;
}

type TContext = Readonly<{
  useAdd: (priority: number, value: any) => void;
  useSubscribe: () => string;
}>;

const developerWarning = (): never => {
  throw new Error("Don't use store outside of store provider");
};

const Context = createContext<TContext>({
  useAdd: developerWarning,
  useSubscribe: developerWarning,
});

const usePriorityStack = () => {
  return useMemo(() => {
    const subject$ = new BehaviorSubject<IStackItem[]>([]);
    return {
      add: (item: IStackItem) => {
        subject$.next([...subject$.getValue(), item]);
      },
      remove: (id: string) => {
        subject$.next(subject$.getValue().filter((item) => item.id !== id));
      },
      subscribe: (callback: (value: string) => void) => {
        const sub = subject$
          .pipe(
            map((state) => {
              return state.sort((a, b) => {
                const dif = b.priority - a.priority;
                if (dif === 0 || dif === 1) {
                  return 1;
                }
                return -1;
              })[0]?.value;
            }),
            distinctUntilChanged()
          )
          .subscribe(callback);
        return () => sub.unsubscribe();
      },
    };
  }, []);
};

export const useStore = () => useContext(Context);

export const useId = (): string => {
  return useMemo(() => v4(), []);
};

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const { add, remove, subscribe } = usePriorityStack();

  const context = useMemo<TContext>(
    () =>
      Object.freeze({
        useAdd: (priority: number, value: any) => {
          const id = useId();
          useEffect(() => {
            if (priority && value) {
              add({ id, priority, value });
            }
            return () => remove(id);
          }, [priority, value]);
        },
        useSubscribe: () => {
          const [state, setState] = useState<string>("");
          useEffect(() => {
            return subscribe(setState);
          }, []);
          return state;
        },
      }),
    []
  );

  return <Context.Provider value={context}>{children}</Context.Provider>;
};
