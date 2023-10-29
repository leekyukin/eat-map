import { StoreType } from "@/interface";
import Store from "./Store";
import { useRouter } from "next/router";

interface StoreListProps {
  stores: StoreType[];
}

export default function StoreList({ stores }: StoreListProps) {
  return (
    <>
      {stores.map((store: StoreType, index) => (
        <Store store={store} key={index} />
      ))}
    </>
  );
}
