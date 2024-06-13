"use client";

import { Category, QueryOption } from "@/types/option";
import { Undo2 } from "lucide-react";
import { useEffect, useState } from "react";

type SelectProps = {
  heading: string;
  category: Category | undefined;
  onValueChange: (value: QueryOption) => void;
};

const Select = ({ heading, category, onValueChange }: SelectProps) => {
  const [initialValue, setInitialValue] = useState(heading);
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue[0].toUpperCase() + newValue.substring(1));
    setDisabled(true);
    onValueChange({ name: name, value: newValue });
  };

  const handleReset = () => {
    setValue(initialValue);
    setDisabled(false);
    onValueChange({ name: name, value: "" });
  };

  return (
    <div className="flex flex-col min-w-[250px] md:min-w-[180px]">
      <select
        className="select select-bordered font-rubik hover:green-shadow transition-shadow disabled:hover:shadow-none"
        value={value}
        onChange={handleChange}
        disabled={value !== initialValue || category?.items.length === 0}
      >
        <option value={heading} disabled>
          {heading}
        </option>
        {disabled ? (
          <option>{value}</option>
        ) : !category && !disabled ? (
          <option>Loading...</option>
        ) : (
          category?.items.map((item, idx) => (
            <option
              key={idx}
              id={item.name}
              disabled={item.count === 0}
              value={item.value}
            >
              {item.name} ({item.count})
            </option>
          ))
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
