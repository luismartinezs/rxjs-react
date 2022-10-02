import { useSharedNotes } from "../state";
import "./styles.css";

export default function Content() {
  const { notes } = useSharedNotes();
  return (
    <div className="content">
      {notes.map((note, index) => (
        <p key={index}>{note}</p>
      ))}
    </div>
  );
}
