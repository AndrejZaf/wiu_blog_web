import { Home, LucideProps, Search, Settings, StickyNote } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface NavRoute {
  to: string;
  title: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export const routes: NavRoute[] = [
  {
    title: "Search",
    to: "/search",
    icon: Search,
  },
  {
    title: "Home",
    to: "/",
    icon: Home,
  },
  {
    title: "Posts",
    to: "/posts",
    icon: StickyNote,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: Settings,
  },
];
