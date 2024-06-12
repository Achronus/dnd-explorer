"use client";

import useFetchData from "@/hooks/useFetchData";
import { Category } from "@/types/option";
import { Loader } from "lucide-react";

type SelectProps = {
  heading: string;
  url: string;
};

const Select = ({ heading, url }: SelectProps) => {
  const { data, isLoading, error } = useFetchData<Category>(url);

  return (
    <div>
      <select className="select select-bordered font-rubik">
        <option disabled selected>
          {heading}
        </option>
        {isLoading ? (
          <Loader className="animate-spin" />
        ) : (
          data?.items.map((item, idx) => (
            <option key={idx} disabled={item.count === 0}>
              {item.name} ({item.count})
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default Select;
