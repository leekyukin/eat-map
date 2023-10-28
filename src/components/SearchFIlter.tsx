import { AiOutlineSearch } from "react-icons/ai";
import { DISTRICT_ARR } from "@/data/store";
import { Dispatch, SetStateAction } from "react";

interface SearchFilterProps {
  setQ: Dispatch<SetStateAction<string | null>>;
  setDistrict: Dispatch<SetStateAction<string | null>>;
}

export default function SearchFilter({ setQ, setDistrict }: SearchFilterProps) {
  return (
    <div className="my-4 flex flex-col gap-2 md:flex-row">
      <div className="flex w-full items-center justify-center gap-2">
        <AiOutlineSearch className="h-6 w-6" />
        <input
          type="search"
          onChange={(e) => setQ(e.target.value)}
          placeholder="음식점 검색"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-800 outline-none focus:border-blue-500"
        />
      </div>
      <select
        onChange={(e) => setDistrict(e.target.value)}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-800 outline-none focus:border-blue-500 md:max-w-[200px]"
      >
        <option value="">지역 선택</option>
        {DISTRICT_ARR.map((data) => (
          <option value={data} key={data}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );
}
