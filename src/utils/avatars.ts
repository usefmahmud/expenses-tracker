// Import all avatar images
import avatar1 from "../assets/avatars/avatar-1.svg";
import avatar2 from "../assets/avatars/avatar-2.svg";
import avatar3 from "../assets/avatars/avatar-3.svg";
import avatar4 from "../assets/avatars/avatar-4.svg";
import avatar5 from "../assets/avatars/avatar-5.svg";
import avatar6 from "../assets/avatars/avatar-6.svg";
import avatar7 from "../assets/avatars/avatar-7.svg";
import avatar8 from "../assets/avatars/avatar-8.svg";
import avatar9 from "../assets/avatars/avatar-9.svg";
import avatar10 from "../assets/avatars/avatar-10.svg";
import avatar11 from "../assets/avatars/avatar-11.svg";
import avatar12 from "../assets/avatars/avatar-12.svg";

// Create a map of avatar filenames to imported paths
export const avatarMap: Record<string, string> = {
  "avatar-1.svg": avatar1,
  "avatar-2.svg": avatar2,
  "avatar-3.svg": avatar3,
  "avatar-4.svg": avatar4,
  "avatar-5.svg": avatar5,
  "avatar-6.svg": avatar6,
  "avatar-7.svg": avatar7,
  "avatar-8.svg": avatar8,
  "avatar-9.svg": avatar9,
  "avatar-10.svg": avatar10,
  "avatar-11.svg": avatar11,
  "avatar-12.svg": avatar12,
};

// Helper function to get avatar URL
export const getAvatarUrl = (filename: string): string => {
  return avatarMap[filename] || avatar1; // fallback to avatar1 if not found
};

// Export list of available avatars
export const availableAvatars = Object.keys(avatarMap);
