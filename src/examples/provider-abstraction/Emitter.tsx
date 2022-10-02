import React from "react";

export default function Emitter() {
  const [key, setKey] = React.useState("");
  const [value, setValue] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!key || !value) {
      console.log("Key and value are required");
      return;
    }
    console.log("submit", key, value);
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
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <label htmlFor="label">Value</label>
            <input
              type="text"
              id="label"
              value={value}
              onChange={(e) => setValue(e.target.value)}
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
