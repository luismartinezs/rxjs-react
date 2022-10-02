import { useStore } from "./store";

export default function Subscriber() {
  const { useSubscribe } = useStore();
  const state = useSubscribe();

  return (
    <div className="text-left">
      <pre>{JSON.stringify(state, null, 4)}</pre>
    </div>
  );
}
