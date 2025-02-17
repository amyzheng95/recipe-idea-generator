"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Barriecito } from "next/font/google";
import { Mystery_Quest } from "next/font/google";
import { Amatic_SC } from "next/font/google";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { IconType } from "react-icons";

const barriecito = Barriecito({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const mysteryQuest = Mystery_Quest({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const amaticSCBold = Amatic_SC({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

type NavItem = {
  name: string;
  href: string;
  external?: boolean;
  icon?: IconType;
};

const navigation: NavItem[] = [
  { name: "All Recipes", href: "/" },
  { name: "Cooking Technique", href: "/techniques" },
  { name: "Product Recs", href: "/products" },
  { name: "About Me", href: "/about" },
];

const socialLinks: NavItem[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/foodwithpiggy1/",
    icon: FaInstagram,
    external: true,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@foodwithpiggy1",
    icon: FaYoutube,
    external: true,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@foodwithpiggy1",
    icon: FaTiktok,
    external: true,
  },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const ActiveIcon = () => (
    <div className="relative w-6 h-6 ml-2">
      <Image
        src="/images/noodles.png"
        alt=""
        width={50}
        height={50}
        className="transition-transform duration-300 group-hover:rotate-12"
      />
    </div>
  );

  const NavLink = ({
    item,
    isMobile = false,
    onClick,
  }: {
    item: NavItem;
    isMobile?: boolean;
    onClick?: () => void;
  }) => {
    const pathname = usePathname();
    const isActive = !item.external && pathname === item.href;
    const baseClasses = `${
      isActive
        ? "text-brand-pink dark:text-blue-400"
        : "text-black hover:text-brand-pink dark:text-gray-300 dark:hover:text-white"
    } ${
      isMobile ? "block" : ""
    } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`;

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} flex items-center`}
          onClick={onClick}
        >
          {item.name}
        </a>
      );
    }

    return (
      <Link
        href={item.href}
        onClick={onClick}
        className={`${baseClasses} flex items-center group`}
      >
        {item.name}
        {isActive && <ActiveIcon />}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-yellow dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center group">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.png"
                  alt="Donut Logo"
                  width={40}
                  height={40}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
              </div>
              <span
                className={`ml-2 text-2xl text-black dark:text-white ${amaticSCBold.className}`}
              >
                Healthy Piggy
              </span>
            </Link>
            <nav className="hidden md:flex space-x-4">
              {navigation.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-brand-pink dark:text-gray-300 
                    dark:hover:text-white transition-colors duration-200"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <ThemeToggle />
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-black hover:text-brand-pink 
                dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-x-0 top-full transform transition-all duration-300 md:hidden
          ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0 pointer-events-none"
          }
          bg-brand-yellow dark:bg-gray-900 shadow-lg
          border-t border-brand-orange/10 dark:border-gray-700`}
      >
        <div className="container mx-auto px-4">
          <div className="py-3 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                item={item}
                isMobile
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
            <div className="flex items-center space-x-4 px-3 py-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-brand-pink dark:text-gray-300 
                    dark:hover:text-white transition-colors duration-200"
                  aria-label={item.name}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
