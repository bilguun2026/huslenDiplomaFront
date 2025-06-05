import { useCrud } from "@/hooks/useCrud";
import { User, UserProfile } from "@/types/types";

interface FullProfile {
  user: User;
  profile: UserProfile | null;
}

const { useDetail, useUpdate } = useCrud<FullProfile>("profile", "/profile");

export const useProfile = () => {
  const profileDetail = useDetail(); // Will call GET /profile/
  const updateProfile = useUpdate(); // Will call PUT /profile/

  return { ...profileDetail, update: updateProfile };
};
