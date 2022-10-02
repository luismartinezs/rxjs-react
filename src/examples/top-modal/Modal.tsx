export default function Modal({ onClose, children }) {
  return (
    <div className="absolute w-32 h-32 bg-zinc-200 rounded-lg flex flex-col justify-between p-2">
      <div className="text-xl font-bold my-2">{children}</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
