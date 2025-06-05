"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending, isError } = useAuth();
  const router = useRouter();
  console.log("username", username);
  console.log("password", password);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { username, password },
      {
        onSuccess: () => {
          console.log("Login successful");
          router.push("/dashboard");
        },
      }
    );
  };

  return (
    <div>
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl space-y-6 max-w-md mx-auto "
      >
        <h2 className="text-3xl font-bold text-center text-black">Нэвтрэх</h2>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Нэвтрэх нэр
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:border-[rgb(47,58,154)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Нууц үг
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:border-[rgb(47,58,154)]"
          />
        </div>

        {isError && (
          <div className="text-red-600 text-sm font-medium text-center">
            Нэвтрэх нэр эсвэл нууц үг буруу байна.
          </div>
        )}

        <div className="text-right text-sm text-black underline cursor-pointer">
          Нууц үгээ мартсан уу?
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-[rgb(47,58,154)] hover:bg-indigo-700 text-white w-full py-2 rounded font-medium transition-colors"
        >
          {isPending ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
        </button>
      </form>
      <div className="text-center text-sm text-gray-500">
        —{" "}
        <button
          type="button"
          className="underline text-[rgb(47,58,154)]"
          onClick={() => router.push("/signup")}
        >
          Бүртгүүлэх
        </button>{" "}
        —
      </div>
    </div>
  );
}
