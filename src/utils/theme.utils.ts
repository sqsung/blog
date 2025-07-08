import { ColorScheme } from "@/types/shared.types";

export const checkIsProperScheme = (
  scheme?: string | null,
): scheme is ColorScheme => {
  if (!scheme) {
    return false;
  }

  return ["dark", "light"].includes(scheme);
};
