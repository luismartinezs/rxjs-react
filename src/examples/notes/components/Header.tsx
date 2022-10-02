import { useState } from "react";
import { useSharedNotes } from "../state";

export default function Header() {
  // internal value of the input
  const [value, setValue] = useState("");
  // methods to push changes to store
  const { addNote, clear } = useSharedNotes();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSendNoteClick = () => {
    addNote(value);
    setValue("");
  };

  const handleClearNotesClick = () => {
    clear();
  };

  return (
    <div className="header">
      <input value={value} onChange={handleChange} placeholder="your note..." />
      <div className="buttons">
        <button onClick={handleSendNoteClick}>Send Note</button>
        <button onClick={handleClearNotesClick}>Clear Notes</button>
      </div>
    </div>
  );
}
