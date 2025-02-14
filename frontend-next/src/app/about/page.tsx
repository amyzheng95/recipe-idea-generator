"use client";

import Image from "next/image";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/foodwithpiggy1/",
    icon: FaInstagram,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@foodwithpiggy1",
    icon: FaYoutube,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@foodwithpiggy1",
    icon: FaTiktok,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-pink/5 to-brand-yellow/5 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Profile Image */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-pink to-brand-yellow animate-pulse" />
            <div className="absolute inset-1 rounded-full overflow-hidden bg-white">
              <Image
                src="/images/amy-profile.png"
                alt="Amy's Profile"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Name */}
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Amy Zheng
          </h1>

          {/* Bio */}
          <div className="space-y-4 text-gray-600 dark:text-gray-300 mb-8">
            <p>
              Hi! I'm Amy, a software engineer by day and a passionate home cook
              by night. I love creating healthy, delicious recipes that are easy
              to follow and budget-friendly.
            </p>
            <p>
              My cooking journey started when I realized I needed to eat
              healthier while managing a busy tech career. Now, I'm excited to
              share my recipes and cooking tips with you!
            </p>
            <p>
              Through Food with Piggy, I hope to show that healthy cooking can
              be simple, fun, and absolutely delicious. Join me on this culinary
              adventure!
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-brand-pink dark:text-gray-400 dark:hover:text-brand-pink transition-colors"
                aria-label={link.name}
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
