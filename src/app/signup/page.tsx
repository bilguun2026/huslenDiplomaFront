"use client";
import Image from "next/image";
import Head from "next/head";
import SignupForm from "@/components/signup/signupForm";

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Бүртгүүлэх</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl shadow-lg flex w-full max-w-4xl overflow-hidden">
          {/* Left form */}

          {/* Right image */}
          <div className="w-1/2 bg-white flex items-center justify-center p-6">
            <Image
              src="/login-illustration.svg"
              alt="Login illustration"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
          <div className="w-1/2 p-10 flex flex-col justify-center">
            <SignupForm />
          </div>
        </div>
      </div>
    </>
  );
}
