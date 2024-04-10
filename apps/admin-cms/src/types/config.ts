import { ReactNode } from "react";
import { AccessLevel } from "./clerk";

// Define a type for dropdown items
export interface DropdownItem {
  name: string;
  href: string;
  access: AccessLevel;
}

// Define a type for the menu items that can contain nested dropdown items
export interface MenuItem {
  name: string;
  href?: string;
  access?: AccessLevel;
  icon?: ReactNode;
  dropdownItems?: DropdownItem[];
}

// Type for the parameter of the filterMenuItems function
export type MenuItems = MenuItem[];
