"use client";

import useFetchData from "@/hooks/useFetchData";
import { Category } from "@/types/option";
import { useState } from "react";

type SelectProps = {
  heading: string;
  url: string;
};

const Select = ({ heading, url }: SelectProps) => {
  const { data, isLoading, error } = useFetchData<Category>(url);
  const [value, setValue] = useState("");

  console.log(value);

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
          data?.items.map((item, idx) => (
            <option
              key={idx}
              disabled={item.count === 0}
              value={item.value}
              onClick={() => {
                setValue(item.value);
              }}
            >
              {item.name} ({item.count})
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default Select;
