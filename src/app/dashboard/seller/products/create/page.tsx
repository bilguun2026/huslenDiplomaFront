"use client";

import { useForm } from "react-hook-form";
import { createOne } from "@/services/crudService";
import { Product } from "@/types/types";
import { useCategories } from "@/hooks/useCategories";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateProductPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Product>>();
  const { data: categories } = useCategories();
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onSubmit = async (data: Partial<Product>) => {
  const formData = new FormData();
  formData.append("name", data.name || "");
  formData.append("description", data.description || "");
  formData.append("price", String(data.price || ""));
  formData.append("stock", String(data.stock || ""));
  formData.append("category", String(data.category || ""));
  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    await createOne("/products/", formData, true); // isMultipart = true
    router.push("/dashboard/seller/products");
  } catch (err) {
    console.error("Бараа үүсгэхэд алдаа гарлаа:", err);
  }
};

  return (
    <div className="p-6 max-w-2xl mx-auto text-gray-700">
      <h1 className="text-2xl font-bold text-black mb-6">Шинэ бараа нэмэх</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border-2 border-[rgb(47,58,154)] rounded-2xl p-6 space-y-5 shadow"
      >
        <FormGroup label="Нэр" htmlFor="name" error={errors.name}>
          <input
            id="name"
            {...register("name", { required: true })}
            className="w-full border p-2 rounded"
          />
        </FormGroup>

        <FormGroup label="Тайлбар" htmlFor="description">
          <textarea
            id="description"
            {...register("description")}
            className="w-full border p-2 rounded"
          />
        </FormGroup>

        <FormGroup label="Үнэ" htmlFor="price" error={errors.price}>
          <input
            id="price"
            type="number"
            {...register("price", { required: true })}
            className="w-full border p-2 rounded"
          />
        </FormGroup>

        <FormGroup label="Үлдэгдэл" htmlFor="stock">
          <input
            id="stock"
            type="number"
            {...register("stock", { required: true })}
            className="w-full border p-2 rounded"
          />
        </FormGroup>

        <FormGroup label="Ангилал" htmlFor="category">
          <select
            id="category"
            {...register("category")}
            className="w-full border p-2 rounded"
          >
            <option value="">Сонгох</option>
            {categories?.results.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </FormGroup>

        <FormGroup label="Зураг" htmlFor="image">
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setImageFile(e.target.files[0]);
              }
            }}
            className="w-full border p-2 rounded"
          />
        </FormGroup>

        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-[rgb(47,58,154)] text-white rounded hover:bg-indigo-700 transition"
          >
            Хадгалах
          </button>
        </div>
      </form>
    </div>
  );
}

// 🔹 Reusable FormGroup component
function FormGroup({
  label,
  htmlFor,
  children,
  error,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  error?: any;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-[rgb(255,194,13)] mb-1"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600 mt-1">{label} шаардлагатай</p>
      )}
    </div>
  );
}
