import { useState } from "react";
import { signup, SignupData } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [form, setForm] = useState<SignupData>({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    is_seller: false,
    is_buyer: false,
  });
  const router = useRouter();

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: signup,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "role") {
      setForm((prev) => ({
        ...prev,
        is_seller: value === "seller",
        is_buyer: value === "buyer",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" p-8 rounded-2xl  space-y-4 max-w-md mx-auto"
      >
        <h2 className="text-3xl font-bold text-center text-black">
          Бүртгүүлэх
        </h2>

        {[
          { name: "username", placeholder: "Нэвтрэх нэр" },
          { name: "email", placeholder: "Имэйл" },
          { name: "password", placeholder: "Нууц үг", type: "password" },
          { name: "first_name", placeholder: "Нэр" },
          { name: "last_name", placeholder: "Овог" },
          { name: "phone", placeholder: "Утасны дугаар" },
          { name: "address", placeholder: "Хаяг" },
        ].map(({ name, placeholder, type = "text" }) => (
          <input
            key={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={(form as any)[name]}
            onChange={handleChange}
            className="w-full border border-gray-300 text-black p-2 rounded focus:outline-none focus:border-[rgb(47,58,154)]"
          />
        ))}

        <div className="flex justify-between gap-4 text-black">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="buyer"
              checked={form.is_buyer}
              onChange={handleChange}
            />
            Худалдан авагч
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="seller"
              checked={form.is_seller}
              onChange={handleChange}
            />
            Худалдагч
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-[rgb(47,58,154)] hover:bg-indigo-700 text-white w-full py-2 rounded font-medium transition-colors"
        >
          {isPending ? "Бүртгүүлж байна..." : "Бүртгүүлэх"}
        </button>

        {isError && (
          <p className="text-red-600 text-sm font-medium">
            Алдаа гарлаа: {(error as any)?.message}
          </p>
        )}
        {isSuccess && (
          <p className="text-[rgb(255,194,13)] text-sm font-medium">
            Амжилттай бүртгэгдлээ!
          </p>
        )}
      </form>
      <div className="text-center text-sm text-gray-500">
        —{" "}
        <button className="underline" onClick={() => router.push("/login")}>
          Нэвтрэх
        </button>{" "}
        —
      </div>
    </div>
  );
}
