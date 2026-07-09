import { MdOutlineDirectionsCar, MdOutlineMedicalServices, MdOutlineAccountBalance, MdOutlineMovie, MdOutlineShoppingCart, MdOutlineApps } from "react-icons/md";
import type { IconType } from "react-icons";

export const SECTORS = [
  "Technology",
  "Automotive",
  "Healthcare",
  "Finance",
  "Entertainment"
] as const;

export type Sector = typeof SECTORS[number];

export interface ISectorMetadata {
  name: Sector;
  color: string;
  icon: IconType;
}

export const SECTOR_METADATA: Record<Sector | "Default", ISectorMetadata | { name: string; color: string; icon: IconType }> = {
  Technology: {
    name: "Technology",
    color: "bg-primary",
    icon: MdOutlineApps,
  },
  Automotive: {
    name: "Automotive",
    color: "bg-accent-blue",
    icon: MdOutlineDirectionsCar,
  },
  Healthcare: {
    name: "Healthcare",
    color: "bg-primary-light",
    icon: MdOutlineMedicalServices,
  },
  Finance: {
    name: "Finance",
    color: "bg-purple",
    icon: MdOutlineAccountBalance,
  },
  Entertainment: {
    name: "Entertainment",
    color: "bg-cream",
    icon: MdOutlineMovie,
  },
  Default: {
    name: "Other",
    color: "bg-text-disabled",
    icon: MdOutlineShoppingCart,
  }
};

export const sectorOrder = SECTORS;
