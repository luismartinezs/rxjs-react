import { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";

let subject$ = null;

export const getNotes = () => {
  if (!subject$) {
    return undefined;
  }

  return subject$.value;
};

export const useSharedNotes = () => {
  // create notes reactive state so that it works with React
  const [notes, setNotes] = useState([]);

  // initialize observable
  if (!subject$) {
    subject$ = new BehaviorSubject([]);
  }

  useEffect(() => {
    // subscribe to notes subject, get current notes and update notes state when it changes
    const subscription = subject$.subscribe((notes) => {
      setNotes(notes);
    });

    // unsubscribe on unmount
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // push new notes to subject, any subscribers will receive the change
  function addNote(newNote) {
    subject$.next([...notes, newNote]);
  }

  function clear() {
    subject$.next([]);
  }

  return { addNote, clear, notes };
};
