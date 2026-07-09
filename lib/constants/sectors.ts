import { LayoutGrid, Building2, Stethoscope, Landmark, Film, ShoppingCart, type LucideIcon } from "lucide-react";

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
  icon: LucideIcon;
}

export const SECTOR_METADATA: Record<Sector | "Default", ISectorMetadata | { name: string; color: string; icon: LucideIcon }> = {
  Technology: {
    name: "Technology",
    color: "bg-primary",
    icon: LayoutGrid,
  },
  Automotive: {
    name: "Automotive",
    color: "bg-accent-blue",
    icon: Building2,
  },
  Healthcare: {
    name: "Healthcare",
    color: "bg-primary-light",
    icon: Stethoscope,
  },
  Finance: {
    name: "Finance",
    color: "bg-purple",
    icon: Landmark,
  },
  Entertainment: {
    name: "Entertainment",
    color: "bg-cream",
    icon: Film,
  },
  Default: {
    name: "Other",
    color: "bg-text-disabled",
    icon: ShoppingCart,
  }
};

export const sectorOrder = SECTORS;
