"use client";

import { searchState } from "@/atom";
import { ErrorMessage } from "@/components/ErrorMessage";
import Loader from "@/components/Loader/Loader";
import Loading from "@/components/Loader/Loading";
import SearchFilter from "@/components/Store/SearchFIlter";
import StoreList from "@/components/Store/StoreList";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import axios from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useRecoilValue } from "recoil";

export default function StoreListPage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = pageRef?.isIntersecting;
  const searchValue = useRecoilValue(searchState);

  const searchParams = {
    q: searchValue?.q,
    district: searchValue?.district,
  };

  // const {
  //   isLoading,
  //   isError,
  //   data: stores,
  // } = useQuery(`stores-${page}`, async () => {
  //   const { data } = await axios(`/api/stores?page=${page}`);
  //   return data as StoreApiResponse;
  // });

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios("/api/stores?page=" + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
        ...searchParams,
      },
    });
    return data;
  };

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery(["stores", searchParams], fetchStores, {
    getNextPageParam: (lastPage: any) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, hasNextPage, isPageEnd]);

  if (isError) {
    return <ErrorMessage message="다시 시도해주세요." />;
  }

  return (
    <div className="mx-auto px-4 py-8 md:max-w-4xl">
      <SearchFilter />
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.pages?.map((page, index) => (
            <StoreList stores={page?.data} key={index} />
          ))
        )}
      </ul>

      {(isFetching || isFetchingNextPage || hasNextPage) && <Loader />}
      <div className="mb-10 h-10 w-full touch-none" ref={ref} />
    </div>
  );
}
