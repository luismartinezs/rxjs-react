import { FormEvent, useState } from "react";
import { useStore } from "./store";

export default function Emitter() {
  const [inputs, setInputs] = useState<[string, any]>(["", ""]);
  const [_key, _setKey] = useState("");
  const [_value, _setValue] = useState("");

  const { useUpdate } = useStore();
  useUpdate(...inputs);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!_key || !_value) {
      console.log("Key and value are required");
      return;
    }
    setInputs([_key, _value]);
    _setKey("");
    _setValue("");
  };

  return (
    <div>
      <form className="flex items-center" onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <div className="flex space-x-2">
            <label htmlFor="key">Key</label>
            <input
              type="text"
              id="key"
              value={_key}
              onChange={(e) => _setKey(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <label htmlFor="label">Value</label>
            <input
              type="text"
              id="label"
              value={_value}
              onChange={(e) => _setValue(e.target.value)}
            />
          </div>
        </div>
        <button className="bg-sky-500 text-white font-bold ml-2 ml-auto hover:bg-sky-600">
          Submit
        </button>
      </form>
    </div>
  );
}
