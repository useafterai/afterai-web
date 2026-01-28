"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMail, FiArrowLeft } from "react-icons/fi";

function VerifyContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-6">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-dark" />
        <div className="absolute left-0 top-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-gold-500/8 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <Image src="/logo.png" alt="AfterAI" width={28} height={28} className="h-7 w-auto" />
            <span className="text-xl font-bold">AfterAI</span>
          </Link>
        </div>

        <div className="p-8 rounded-2xl border border-white/14 bg-gradient-to-b from-white/8 to-white/4 backdrop-blur-xl text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-500/20 flex items-center justify-center">
            <FiMail className="w-8 h-8 text-gold-500" />
          </div>

          <h1 className="text-2xl font-bold mb-3">Verify your email</h1>
          <p className="text-muted mb-8">
            We sent a verification link to <span className="text-white font-semibold">{email}</span>. Once verified, sign in to continue.
          </p>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-gold-500 text-dark font-bold hover:shadow-lg transition-all"
          >
            <FiArrowLeft />
            Back to Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark flex items-center justify-center">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
