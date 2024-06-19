"use client";

import useFetchData from "@/hooks/useFetchData";
import { spellSearchUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SpellSearchResults } from "@/types/api";
import { ChevronRight, Loader, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SearchBox = () => {
  const [initialValue, setInitialValue] = useState("");
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const { data, isLoading, error } = useFetchData<SpellSearchResults>(
    `${spellSearchUrl}?query=${searchTerm}`
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  return (
    <div className="relative flex flex-col text-left">
      <label className="input input-bordered flex items-center gap-2 hover:green-shadow transition-shadow">
        <input
          type="text"
          className="grow"
          placeholder="Find a spell..."
          value={searchTerm}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Search width={16} height={16} className="opacity-70 cursor-pointer" />
      </label>
      <ul
        className={cn(
          "absolute top-full left-0 w-full z-10 mt-2 rounded-lg border border-base-content border-opacity-20 bg-base-100 shadow-lg",
          searchTerm && isFocused
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        )}
      >
        {isLoading ? (
          <li className="flex gap-2 items-center hover:bg-base-200 px-3 py-2 cursor-pointer rounded-lg animate-spin">
            <Loader width={16} height={16} />
          </li>
        ) : data?.count === 0 ? (
          <li className="flex gap-2 items-center px-3 py-2 rounded-lg">
            <span className="float-start flex-grow">No spells found.</span>
          </li>
        ) : (
          data?.results.map((item, idx) => (
            <Link
              key={idx}
              href={`/spells/${item.index}`}
              onMouseDown={(e) => e.preventDefault()}
            >
              <li className="flex gap-2 items-center hover:bg-base-200 px-3 py-2 cursor-pointer rounded-lg">
                <span className="float-start flex-grow">{item.name}</span>
                <span className="float-end">
                  <ChevronRight width={16} height={16} />
                </span>
              </li>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchBox;
