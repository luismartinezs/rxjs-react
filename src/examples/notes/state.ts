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
  // create notes state
  const [notes, setNotes] = useState([]);

  if (!subject$) {
    subject$ = new BehaviorSubject([]);
  }

  useEffect(() => {
    // subscribe to notes subject, and update notes state when it changes
    const subscription = subject$.subscribe((notes) => {
      setNotes(notes);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // push new notes to subject

  function addNote(newNote) {
    subject$.next([...notes, newNote]);
  }

  function clear() {
    subject$.next([]);
  }

  return { addNote, clear, notes };
};
