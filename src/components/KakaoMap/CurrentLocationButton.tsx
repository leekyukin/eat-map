import { mapState } from "@/atom";
import { useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import FullPageLoader from "../Loader/FullPageLoader";

export default function CurrentLocationButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const map = useRecoilValue(mapState);

  const handleCurrentPosition = () => {
    setIsLoading(true);
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          );

          if (currentPosition && map) {
            setIsLoading(false);
            map.panTo(currentPosition);
            toast.success("현재 위치로 이동되었습니다.");
          }
          return currentPosition;
        },
        () => {
          toast.error("현재 위치를 가져울 수 없습니다.");
          setIsLoading(false);
        },
      );
    }
  };
  return (
    <>
      {isLoading && <FullPageLoader />}
      <button
        type="button"
        className="fixed bottom-20 right-10 z-10 rounded-md bg-blue-500 p-2 shadow hover:shadow-lg focus:bg-blue-700 focus:shadow-lg"
        onClick={handleCurrentPosition}
      >
        <MdOutlineMyLocation className="h-5 w-5 fill-white" />
      </button>
    </>
  );
}
