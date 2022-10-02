import { Dispatch, SetStateAction } from "react";
import { Subject } from "rxjs";

type State = any;

const subject = new Subject<State>();

const initialState = {
  name: "John",
  age: 30,
  active: true,
};

let state = initialState;

export const store = {
  init: () => subject.next(state),
  subscribe: (setState: Dispatch<SetStateAction<State>>) =>
    subject.subscribe(setState),
  updateState: (newState: State) => {
    subject.next(newState);
  },
  resetState: () => {
    subject.next(initialState);
  },
  initialState,
};
