import { StoreType } from "@/interface";
import Image from "next/image";

interface StoreProps {
  store: StoreType;
}

export default function Store({ store }: StoreProps) {
  return (
    <li className="flex justify-between py-5 gap-x-6">
      <div className="flex gap-x-4">
        <Image
          src={
            store?.category
              ? `/images/markers/${store?.category}.png`
              : "/images/markers/default.png"
          }
          width={48}
          height={48}
          alt="icon image"
        />
        <div>
          <div className="text-sm font-semibold text-gray-900 leading-6">
            {store?.storeType}
          </div>
          <div className="mt-1 text-xs font-semibold text-gray-500 truncate leading-5">
            {store?.storeType}
          </div>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <div className="text-sm font-semibold text-gray-900 leading-6">
          {store?.address}
        </div>
        <div className="mt-1 text-xs font-semibold text-gray-500 truncate leading-5">
          {store?.phone || "번호없음"} | {store?.foodCertifyName} |{" "}
          {store?.category}
        </div>
      </div>
    </li>
  );
}
