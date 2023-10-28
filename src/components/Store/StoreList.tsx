import { StoreType } from "@/interface";
import Store from "./Store";

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
