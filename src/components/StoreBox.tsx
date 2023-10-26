import { StoreType } from "@/interface";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";

interface StoreBoxProps {
  store: StoreType | null;
  setStore: Dispatch<SetStateAction<any>>;
}

export default function StoreBox({ store, setStore }: StoreBoxProps) {
  const category = store?.category;
  return (
    <div className="fixed inset-x-0 z-10 w-full max-w-sm mx-auto transition ease-in-out delay-150 bg-white rounded-lg shadow-lg bottom-20 md:max-w-xl">
      {store && (
        <>
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={
                    category
                      ? `/images/markers/${category}.png`
                      : "/images/markers/default.png"
                  }
                  width={100}
                  height={100}
                  alt="icon image"
                />
                <div>
                  <div className="font-semibold ">{store?.name}</div>
                  <div className="text-sm">{store?.storeType}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStore(null);
                }}
              >
                <AiOutlineClose />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <HiOutlineMapPin />
              {store?.address}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <AiOutlinePhone />
              {store?.phone}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <AiOutlineInfoCircle />
              {store?.storeType}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <AiOutlineCheck />
              {store?.category}
            </div>
          </div>
          <button
            type="button"
            className="w-full focus:bg-blue-500 hover:bg-blue-500 text-lg bg-blue-700 font-semibold py-3 text-white rounded-b-lg"
            onClick={() => {
              window.alert("상세보기");
            }}
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
