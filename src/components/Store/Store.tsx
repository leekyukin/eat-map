import { StoreType } from "@/interface";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface StoreProps {
  store: StoreType;
}

export default function Store({ store }: StoreProps) {
  const router = useRouter();
  return (
    <li
      className="flex cursor-pointer justify-between gap-x-6 py-5 hover:bg-gray-50"
      onClick={() => router.push(`/stores/${store.id}`)}
    >
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
          <div className="text-sm font-semibold leading-6 text-gray-900">
            {store?.name}
          </div>
          <div className="mt-1 truncate text-xs font-semibold leading-5 text-gray-500">
            {store?.storeType}
          </div>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <div className="text-sm font-semibold leading-6 text-gray-900">
          {store?.address}
        </div>
        <div className="mt-1 truncate text-xs font-semibold leading-5 text-gray-500">
          {store?.phone || "번호없음"} | {store?.foodCertifyName} |{" "}
          {store?.category}
        </div>
      </div>
    </li>
  );
}
