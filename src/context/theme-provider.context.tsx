import { initialState } from "@/constants/initial-theme-state";
import type { ThemeProviderState } from "@/types";
import { createContext } from "react";

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
