import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import {
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlineCheck,
  AiOutlinePhone,
} from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";

interface StoreBoxProps {
  store: any;
  setStore: Dispatch<SetStateAction<any>>;
}

export default function StoreBox({ store, setStore }: StoreBoxProps) {
  const bizcnd_code_nm = store?.bizcnd_code_nm;
  return (
    <div className="fixed inset-x-0 z-10 w-full max-w-sm mx-auto transition ease-in-out delay-150 bg-white rounded-lg shadow-lg bottom-20 md:max-w-xl">
      {store && (
        <>
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={
                    bizcnd_code_nm
                      ? `/images/markers/${bizcnd_code_nm}.png`
                      : "/images/markers/default.png"
                  }
                  width={100}
                  height={100}
                  alt="icon image"
                />
                <div>
                  <div className="font-semibold ">{store?.upso_nm}</div>
                  <div className="text-sm">{store?.cob_code_nm}</div>
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
              {store?.rdn_code_nm}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <AiOutlinePhone />
              {store?.tel_no}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <AiOutlineInfoCircle />
              {store?.crtfc_gbn_nm}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <AiOutlineCheck />
              {store?.bizcnd_code_nm}
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
