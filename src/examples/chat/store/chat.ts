import { Subject } from "rxjs";

const subject = new Subject();

const initialState = {
  data: [],
  newDataCount: 0,
};

// initialize state
let state = initialState;

const chatStore = {
  init: () => {
    // every time a component subscribes to the subject, reset data count
    state = { ...state, newDataCount: 0 };
    subject.next(state);
  },
  subscribe: (setState) => subject.subscribe(setState),
  sendMessage: (message) => {
    // update state
    state = {
      ...state,
      data: [...state.data, message],
      newDataCount: state.newDataCount + 1,
    };
    subject.next(state);
  },
  clearChat: () => {
    state = initialState;
  },
  // use this to set initial state in component
  initialState,
};

export { chatStore };
