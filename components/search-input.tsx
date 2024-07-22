import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { RiHeartFill, RiSearch2Line } from '@remixicon/react'

interface iDefault {
  defaultValue: string | null;
}

export const SearchInput = ({ defaultValue }: iDefault) => {
  // initiate the router from next/navigation

  const router = useRouter();

  // We need to grab the current search parameters and use it as default value for the search input

  const [inputValue, setValue] = useState(defaultValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setValue(inputValue);
  };

  // If the user clicks enter on the keyboard, the input value should be submitted for search

  // We are now routing the search results to another page but still on the same page

  const handleSearch = () => {
    const query = inputValue?.trim();
    if (query) {
      router.push(`/search-results?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/search-results");
    }
  };

  const handleKeyPress = (event: { key: any }) => {
    if (event.key === "Enter") return handleSearch();
  };

  return (
    <div className="w-full sm:w-[600px] lg:w-[800px] search__input relative border-b border-solid border-slate-400 flex flex-row items-center gap-5 my-10 lg:my-16 ">
      <input
        type="text"
        id="inputId"
        placeholder="Search past papers...."
        value={inputValue ?? ""}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        className="w-full bg-[transparent] outline-none border-none py-2 pl-2 pr-3 text-xl"
      />
      <div className="pr-2"><RiSearch2Line size={20} color="#64748b"/></div>
    </div>
  );
};
