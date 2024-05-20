"use client";
import { useCallback, useState } from "react";

const Test = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
    // Perform validation or other logic
  };
  return (
    <div>
      <div>
        <input type="text" placeholder="Enter Name" />
      </div>
      <div className="flex flex-col">
        <span className="inline-block h-7 w-9">A</span>
        <span>B</span>
      </div>
      <textarea onChange={handleChange} placeholder="Enter value" />
    </div>
  );
};
export default Test;
