"use client";

import { NavButton } from "./nav-button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMedia } from "react-use";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
  
const routes = [
  {
    name: "Overview",
    path: "/",
  },
  {
    name: "Transitions",
    path: "/transitions",
  },
  {
    name: "Accounts",
    path: "/accounts",
  },
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "Settings",
    path: "/settings",
  },
];

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const isMobile = useMedia('(max-width: 1024px)', false)

    const onClick = (href: string) => {
        setIsOpen(false)
        router.push(href)
    }
     
    if (isMobile) {
      return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <Button
              variant="outline"
              size="sm"
              className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="px-2">
            <nav className="flex flex-col gap-y-2 pt-6">
              {routes.map((route) => (
                <Button
                  key={route.path}
                  variant={route.path === pathname ? "secondary" : "ghost"}
                  onClick={() => onClick(route.path)}
                  className="w-full justify-start"
                >
                  {route.name }
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      );
    }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton key={route.path} path={route.path} name={route.name} />
      ))}
    </nav>
  );
};
