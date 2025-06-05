"use client";

import { FullProfile, User, UserProfile } from "@/types/types";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";

interface Props {
  initialData: {
    user: User;
    profile: UserProfile | null;
  };
  onClose: () => void;
}

export default function ProfileEditModal({ initialData, onClose }: Props) {
  const { update } = useProfile();

  const [form, setForm] = useState({
    username: initialData.user.username,
    email: initialData.user.email,
    phone: initialData.user.phone ?? "",
    address: initialData.user.address ?? "",
    store_name: initialData.profile?.store_name ?? "",
    bank_account: initialData.profile?.bank_account ?? "",
    description: initialData.profile?.description ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const payload: Partial<FullProfile> = {
        user: {
          id: initialData.user.id,
          username: form.username,
          email: form.email,
          phone: form.phone,
          address: form.address,
        },
        profile: initialData.profile
          ? {
              user: initialData.user.id,
              store_name: form.store_name,
              bank_account: form.bank_account,
              description: form.description,
            }
          : null,
      };

      await update.mutateAsync({ id: initialData.user.id, data: payload });
      onClose();
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg border-2 border-[rgb(47,58,154)] space-y-5">
        <h2 className="text-2xl font-bold border-b pb-2 border-[rgb(47,58,154)]">
          Профайл засах
        </h2>

        {/* Хэрэглэгчийн мэдээлэл */}
        <Section title="Хэрэглэгчийн мэдээлэл">
          <Input
            label="Нэр"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <Input
            label="Имэйл"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            label="Утас"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          <Input
            label="Хаяг"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </Section>

        {/* Худалдагч мэдээлэл */}
        {initialData.profile && (
          <Section title="Дэлгүүрийн мэдээлэл">
            <Input
              label="Дэлгүүрийн нэр"
              name="store_name"
              value={form.store_name}
              onChange={handleChange}
            />
            <Input
              label="Банкны данс"
              name="bank_account"
              value={form.bank_account}
              onChange={handleChange}
            />
            <Textarea
              label="Тайлбар"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Section>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-gray-600 hover:underline"
          >
            Хаах
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-[rgb(47,58,154)] text-white hover:bg-indigo-800"
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
}

// 🔹 Section Wrapper
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-black border-l-4 pl-2 border-[rgb(255,194,13)]">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-3">{children}</div>
    </div>
  );
}

// 🔹 Styled Input Field
function Input({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[rgb(255,194,13)] mb-1">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border text-black border-gray-300 rounded p-2 focus:ring-2 focus:ring-[rgb(47,58,154)]"
      />
    </div>
  );
}

// 🔹 Styled Textarea
function Textarea({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[rgb(255,194,13)] mb-1">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full border text-black border-gray-300 rounded p-2 focus:ring-2 focus:ring-[rgb(47,58,154)]"
      />
    </div>
  );
}
