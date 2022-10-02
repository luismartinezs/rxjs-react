export default function Modal({ onClose, children }) {
  return (
    <div className="absolute w-32 h-32 bg-zinc-200 rounded-lg">
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
}
