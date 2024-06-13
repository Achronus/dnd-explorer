"use client";

import useFetchData from "@/hooks/useFetchData";
import { Category, QueryOption } from "@/types/option";
import { Undo2 } from "lucide-react";
import { useState } from "react";

type SelectProps = {
  heading: string;
  url: string;
  onValueChange: (value: QueryOption) => void;
};

const Select = ({ heading, url, onValueChange }: SelectProps) => {
  const { data, isLoading, error } = useFetchData<Category>(url);
  const [initialValue, setInitialValue] = useState(heading);
  const [urlName, setUrlName] = useState(url);
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: any) => {
    const newValue = event.target.value;
    const newName = urlName.split("/").at(-1);
    setValue(newValue);
    onValueChange({ name: newName, value: newValue });
  };

  const handleReset = (event: any) => {
    setValue(initialValue);
    const newName = urlName.split("/").at(-1);
    onValueChange({ name: newName, value: "" });
  };

  return (
    <div>
      <select
        className="select select-bordered font-rubik hover:green-shadow transition-shadow"
        value={value}
        onChange={handleChange}
      >
        <option value={heading} disabled>
          {heading}
        </option>
        {isLoading ? (
          <option>Loading...</option>
        ) : (
          <>
            {data?.items.map((item, idx) => (
              <option key={idx} disabled={item.count === 0} value={item.value}>
                {item.name} ({item.count})
              </option>
            ))}
          </>
        )}
      </select>
      <div className="label justify-end" onClick={handleReset}>
        <span className="label-text-alt flex gap-2 justify-center items-center hover:bg-base-100 cursor-pointer p-2 rounded-lg transition-all">
          Reset <Undo2 width={16} height={16} />
        </span>
      </div>
    </div>
  );
};

export default Select;
