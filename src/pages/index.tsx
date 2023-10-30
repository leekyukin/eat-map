import CurrentLocationButton from "@/components/KakaoMap/CurrentLocationButton";
import Map from "@/components/KakaoMap/Map";
import { Markers } from "@/components/KakaoMap/Markers";
import StoreBox from "@/components/Store/StoreBox";
import { StoreType } from "@/interface";
import axios from "axios";

export default function Home({ stores }: { stores: StoreType[] }) {
  return (
    <>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
      <CurrentLocationButton />
    </>
  );
}

export async function getServerSideProps() {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);

  return {
    props: { stores: stores.data },
  };
}
