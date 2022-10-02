import { Dispatch, SetStateAction } from "react";
import { Subject } from "rxjs";

type State = number;

const subject = new Subject<State>();

const initialState = 0;

let state = initialState;

export const store = {
  init: () => subject.next(state),
  subscribe: (setState: Dispatch<SetStateAction<State>>) =>
    subject.subscribe(setState),
  updateNumber: (newNumber: State) => {
    subject.next(newNumber);
  },
  resetNumber: () => {
    subject.next(initialState);
  },
  initialState,
};
