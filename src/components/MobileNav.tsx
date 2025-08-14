"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface MobileNavProps {
  navLinks: { href: string; label: string }[];
}

const MobileNav: React.FC<MobileNavProps> = ({ navLinks }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-gold-500">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:w-[300px] bg-steel-900 border-r border-green-500 border-opacity-30 p-4">
        <nav className="flex flex-col gap-4 pt-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-lg text-gold-500 hover:text-green-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;