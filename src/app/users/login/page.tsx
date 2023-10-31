"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsGoogle } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";

export default function LoginPage() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [router, status]);

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center px-6 lg:px-8">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-center text-2xl font-semibold italic text-blue-800">
          NextMap
        </div>
        <div className="mt-6 text-center text-2xl font-bold text-gray-600">
          SNS 계정으로 로그인해주세요
        </div>

        <p className="mt-2 text-center text-sm text-gray-600">
          계정이 없다면 자동으로 회원가입이 진행됩니다
        </p>
        <div className="mx-auto mt-10 w-full max-w-sm">
          <div className="flex-col gap-2">
            <div className="flex w-full flex-col gap-4 ">
              <button
                className="flex w-full items-center justify-center gap-4 rounded-lg bg-blue-500 px-5 py-4 font-medium text-white hover:bg-blue-500/90"
                type="button"
                onClick={() => signIn("google")}
              >
                <BsGoogle />
                Sign in with Google
              </button>
              <button
                className="flex w-full items-center justify-center gap-5 rounded-lg bg-green-500 px-5 py-4 font-medium text-white hover:bg-green-500/90"
                type="button"
                onClick={() => signIn("naver")}
              >
                <SiNaver />
                Sign in with Naver
              </button>
              <button
                className="flex w-full items-center justify-center gap-3 rounded-lg bg-yellow-300 px-5 py-4 font-medium text-amber-950 hover:bg-yellow-300/80"
                type="button"
                onClick={() => signIn("kakao")}
              >
                <RiKakaoTalkFill className="h-6 w-6" />
                Sign in with Kakao
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
