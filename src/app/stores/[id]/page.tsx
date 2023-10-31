"use client";

import Comments from "@/components/Comments/Comments";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Marker } from "@/components/KakaoMap/Maker";
import Map from "@/components/KakaoMap/Map";
import Like from "@/components/Like";
import Loader from "@/components/Loader/Loader";
import { StoreType } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

export default function StorePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id;
  const { status } = useSession();

  const handleDelete = async () => {
    const confirm = window.confirm("해당 가게를 삭제하시겠습니까?");
    if (confirm) {
      try {
        const result = await axios.delete(`/stores/delete?id=${store?.id}`);

        if (result.status === 200) {
          toast.success("해당 가게를 삭제했습니다.");
          router.replace("/");
        } else {
          toast.error("다시 시도해주세요.");
        }
      } catch (e) {
        console.log(e);
        toast.error("다시 시도해주세요.");
      }
    }
  };

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${id}`);
    return data as StoreType;
  };

  const {
    data: store,
    isFetching,
    isSuccess,
    isError,
  } = useQuery(`store-${id}`, fetchStore, {
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return <ErrorMessage message="다시 시도해주세요." />;
  }

  if (isFetching) {
    return <Loader className="mt-[20%]" />;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="items-center justify-between py-4 md:flex md:py-0">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            {store?.name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            {store?.category}
          </p>
        </div>
        {status === "authenticated" && (
          <div className="flex items-center gap-4 px-4 py-3 text-sm">
            <Like storeId={store?.id} />
            <Link className="underline" href={`/stores/${store?.id}/edit`}>
              수정
            </Link>
            <button
              type="button"
              className="underline hover:text-gray-400"
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              주소
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {store?.address}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              위도
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {store?.lat}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              경도
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {store?.lng}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              연락처
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {store?.phone}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              식품인증구분
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {store?.foodCertifyName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              업종
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {store?.storeType}
            </dd>
          </div>
        </dl>
      </div>
      {isSuccess && (
        <>
          <div className="mx-auto mb-20 max-h-[600px] w-full max-w-5xl overflow-hidden">
            <Map lat={store?.lat} lng={store?.lng} zoom={1} />
            <Marker store={store} />
          </div>
          <Comments storeId={store.id} />
        </>
      )}
    </div>
  );
}
