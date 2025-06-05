"use client";

import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";
import ProfileEditModal from "@/components/dashboard/profileModal/ProfileEditModal";

export default function ProfilePage() {
  const { data, isLoading } = useProfile();
  const [isModalOpen, setModalOpen] = useState(false);

  if (isLoading) return <div className="p-6">Уншиж байна...</div>;
  if (!data) return <div className="p-6 text-red-600">Мэдээлэл олдсонгүй</div>;

  const { user, profile } = data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black mb-6">Профайл</h1>

      <div className="bg-white border-2 border-[rgb(47,58,154)] rounded-2xl p-6 shadow space-y-3">
        <Section title="Хэрэглэгчийн мэдээлэл">
          <Info label="Нэр" value={user.username} />
          <Info label="И-мэйл" value={user.email} />
          <Info label="Утас" value={user.phone ?? "Байхгүй"} />
          <Info label="Хаяг" value={user.address ?? "Байхгүй"} />
        </Section>

        {profile && (
          <Section title="Дэлгүүрийн мэдээлэл">
            <Info label="Дэлгүүрийн нэр" value={profile.store_name} />
            <Info
              label="Банкны данс"
              value={profile.bank_account ?? "Байхгүй"}
            />
            <Info label="Тайлбар" value={profile.description ?? "Байхгүй"} />
          </Section>
        )}

        <div className="pt-4 flex justify-end">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded bg-[rgb(255,194,13)] text-black font-semibold hover:bg-yellow-400 transition"
          >
            Засах
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ProfileEditModal
          initialData={data}
          onClose={() => setModalOpen(false)}
        />
      )}
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
      <h3 className="text-lg font-semibold text-black border-l-4 pl-2 border-[rgb(255,194,13)] mb-2">
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

// 🔹 Key-Value Display
function Info({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="text-[rgb(255,194,13)] font-medium">{label}:</span>{" "}
      <span className="text-black">{value}</span>
    </p>
  );
}
