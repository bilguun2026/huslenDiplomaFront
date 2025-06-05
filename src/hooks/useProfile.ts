import { useCrud } from "@/hooks/useCrud";
import { updateOneProfile } from "@/services/crudService";
import { User, UserProfile } from "@/types/types";

interface FullProfile {
  user: User;
  profile: UserProfile | null;
}

const { useDetail } = useCrud<FullProfile>("profile", "/profile");

export const useProfile = () => {
  const profileDetail = useDetail(); // Will call GET /profile/
  const updateProfile = (id: number, data: any) =>
    updateOneProfile("/profile", id, data); // Will call PUT /profile/

  return { ...profileDetail, update: updateProfile };
};
