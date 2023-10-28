// global kakao
import Script from "next/script";
import { SetStateAction } from "react";

declare global {
	interface Window {
		kakao: any;
	}
}

const DEFAULT_LAT = 37.497175;
const DEFAULT_LNG = 127.027926;

const DEFAULT_ZOOM = 3;

interface MapProps {
	setMap: React.Dispatch<SetStateAction<any>>;
	lat?: string | null;
	lng?: string | null;
	zoom: number;
}

export default function Map({ setMap, lat, lng, zoom }: MapProps) {
	const loadKakaoMap = () => {
		// kakao map 띄우기
		window.kakao.maps.load(() => {
			const mapContainer = document.getElementById("map");
			const mapOption = {
				center: new window.kakao.maps.LatLng(lat ?? DEFAULT_LAT, lng ?? DEFAULT_LNG),
				level: zoom ?? DEFAULT_ZOOM
			};
			const map = new window.kakao.maps.Map(mapContainer, mapOption);

			setMap(map);
		});
	};
	return (
		<>
			<Script
				strategy="afterInteractive"
				type="text/javascript"
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
				onReady={loadKakaoMap}
			/>
			<div id="map" className="h-screen w-full"></div>
		</>
	);
}
