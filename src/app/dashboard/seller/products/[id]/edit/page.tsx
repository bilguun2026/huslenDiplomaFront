"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product, Category } from "@/types/types";
import { getOne, updateOne, getList } from "@/services/crudService";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function EditProductPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { data: user } = useCurrentUser();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    category: 0,
    discount_price: 0,
    stock: 0,
  });

  useEffect(() => {
    getOne<Product>("/products", Number(id)).then((data) => {
      if (user?.id !== data.seller) {
        router.push("/dashboard/seller/products");
        return;
      }
      setProduct(data);
      setForm({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        discount_price: data.discount_price ?? 0,
        stock: data.stock ?? 0,
      });
    });

    getList<Category>("/categories").then((data) =>
      setCategories(data.results ?? data)
    );
  }, [id, user, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "category" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    await updateOne<Product>("/products", Number(id), form);
    router.push("/dashboard/seller/products");
  };

  if (!product) return <div className="p-6">Уншиж байна...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-black mb-6">Бараа засах</h1>

      <div className="bg-white border-2 border-[rgb(47,58,154)] p-6 rounded-2xl shadow space-y-5 text-gray-700">
        <FormGroup label="Нэр" htmlFor="name">
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </FormGroup>

        <FormGroup label="Тайлбар" htmlFor="description">
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </FormGroup>

        <FormGroup label="Үнэ" htmlFor="price">
          <input
            id="price"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </FormGroup>

        <FormGroup label="Хямдарсан үнэ" htmlFor="discount_price">
          <input
            id="discount_price"
            type="number"
            name="discount_price"
            value={form.discount_price}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </FormGroup>

        <FormGroup label="Нөөц" htmlFor="stock">
          <input
            id="stock"
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </FormGroup>

        <FormGroup label="Ангилал" htmlFor="category">
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value={0}>Сонгох</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </FormGroup>

        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[rgb(47,58,154)] text-white rounded hover:bg-indigo-700 transition"
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
}

function FormGroup({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
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
    </div>
  );
}
