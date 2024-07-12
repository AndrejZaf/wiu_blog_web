import { Home, LucideProps, Search, Settings, StickyNote } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface NavRoute {
  to: string;
  title: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  authenticated: boolean;
}

export const routes: NavRoute[] = [
  {
    title: "Search",
    to: "/search",
    icon: Search,
    authenticated: false,
  },
  {
    title: "Home",
    to: "/",
    icon: Home,
    authenticated: false,
  },
  {
    title: "My Posts",
    to: "/my-posts",
    icon: StickyNote,
    authenticated: true,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: Settings,
    authenticated: true,
  },
];
