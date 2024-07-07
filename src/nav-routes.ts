import { Home, LucideProps, Settings, Users } from "lucide-react";
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
    title: "Home",
    to: "/",
    icon: Home,
  },
  {
    title: "Search",
    to: "/search",
    icon: Users,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: Settings,
  },
];
