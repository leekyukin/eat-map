import { currentStoreState } from "@/atom";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
import { useRecoilState } from "recoil";
import Like from "../Like";

export default function StoreBox() {
  const [store, setStore] = useRecoilState(currentStoreState);
  const router = useRouter();
  const category = store?.category;
  return (
    <div className="fixed inset-x-0 bottom-20 z-10 mx-auto w-full max-w-sm rounded-lg bg-white shadow-lg transition delay-150 ease-in-out md:max-w-xl">
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
            <div className="flex justify-between gap-4">
              <div className="col-span-3 mt-4 flex items-center gap-2">
                <HiOutlineMapPin />
                {store?.address}
              </div>
              <Like storeId={store.id} />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <AiOutlinePhone />
              {store?.phone}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <AiOutlineInfoCircle />
              {store?.storeType}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <AiOutlineCheck />
              {store?.category}
            </div>
          </div>
          <button
            type="button"
            className="w-full rounded-b-lg bg-blue-700 py-3 text-lg font-semibold text-white hover:bg-blue-500 focus:bg-blue-500"
            onClick={() => router.push(`/stores/${store.id}`)}
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
