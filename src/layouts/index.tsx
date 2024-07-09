import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Shield, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useKeycloak } from "@/features/keycloak/useKeycloak";
import { routes } from "@/nav-routes";
import { Toaster } from "@/components/ui/toaster";

export default function Layout() {
  const { keycloak } = useKeycloak();

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r dark:border-muted bg-muted/40 dark:bg-background md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b dark:border-muted px-4 lg:h-[60px] lg:px-6">
              <Link
                to="/"
                className="flex items-center gap-2 font-semibold dark:text-white"
              >
                <Shield className="h-6 w-6" />
                <span className="">Write It Up</span>
              </Link>
            </div>
            <div className="flex flex-col justify-between lg:h-full">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {routes.map((route) => (
                  <NavLink
                    key={route.title}
                    to={route.to}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary transition-all hover:text-primary"
                        : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    }
                  >
                    {<route.icon className="h-4 w-4" />}
                    {route.title}
                  </NavLink>
                ))}
              </nav>
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4 lg:mb-4">
                {!keycloak.authenticated ? (
                  <div
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
                    onClick={() => keycloak.login()}
                  >
                    <User className="h-4 w-4" />
                    Log In
                  </div>
                ) : (
                  <div
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
                    onClick={() => keycloak.logout()}
                  >
                    <User className="h-4 w-4" />
                    Log Out
                  </div>
                )}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex lg:hidden h-14 items-center gap-4 border-b dark:border-muted bg-muted/40 dark:bg-background px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5 dark:text-white" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col justify-between"
              >
                <nav className="grid gap-2 text-lg font-medium mt-4">
                  {routes.map((route) => (
                    <NavLink
                      key={route.title}
                      to={route.to}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary transition-all hover:text-primary"
                          : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                      }
                    >
                      {<route.icon className="h-4 w-4" />}
                      {route.title}
                    </NavLink>
                  ))}
                </nav>
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 lg:mb-4">
                  {!keycloak.authenticated ? (
                    <div
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer text-lg"
                      onClick={() => keycloak.login()}
                    >
                      <User className="h-4 w-4" />
                      Log In
                    </div>
                  ) : (
                    <div
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer text-lg"
                      onClick={() => keycloak.logout()}
                    >
                      <User className="h-4 w-4" />
                      Log Out
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 dark:bg-background">
            <Outlet />
            <Toaster />
          </main>
        </div>
      </div>
    </>
  );
}
