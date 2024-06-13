"use client";

import useFetchData from "@/hooks/useFetchData";
import { Category, QueryOption } from "@/types/option";
import { useState } from "react";

type SelectProps = {
  heading: string;
  url: string;
  onValueChange: (value: QueryOption) => void;
};

const Select = ({ heading, url, onValueChange }: SelectProps) => {
  const { data, isLoading, error } = useFetchData<Category>(url);
  const [urlName, setUrlName] = useState(url);
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    const newValue = event.target.value;
    const newName = urlName.split("/").at(-1);
    setValue(newValue);
    onValueChange({ name: newName, value: newValue });
  };

  return (
    <div className="hover:green-shadow transition-shadow rounded-lg">
      <select
        className="select select-bordered font-rubik"
        defaultValue={heading}
      >
        <option disabled>{heading}</option>
        {isLoading ? (
          <option>Loading...</option>
        ) : (
          <>
            {data?.items.map((item, idx) => (
              <option
                key={idx}
                disabled={item.count === 0}
                value={item.value}
                onClick={handleChange}
              >
                {item.name} ({item.count})
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export default Select;
