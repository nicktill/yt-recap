import React, { useState } from "react";
import Link from "next/link";

const Index = () => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center h-screen bg-white">
      <h1>YT-Recap</h1>
      <form onSubmit={handleSubmit} className="m-auto">
        <input
          className="bg-gray-200 p-2 rounded-lg w-64 mt-5"
          type="text"
          placeholder="Enter YouTube URL"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Link href="/summary">
          <button className="bg-sky-200 text-white p-2 rounded-lg ml-2 hover:bg-sky-400 mt-5">
            Go!
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Index;
