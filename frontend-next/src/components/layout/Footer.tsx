import { IconType } from "react-icons";
import { FaHeart } from "react-icons/fa";
import { Amatic_SC } from "next/font/google";

const amaticSCBold = Amatic_SC({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-md mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16">
          <p
            className={`text-black dark:text-white text-sm flex items-center gap-2 ${amaticSCBold.className}`}
          >
            Made with <FaHeart className="text-brand-pink animate-pulse" /> by
            Amy and{" "}
            <a
              href="https://cursor.sh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-pink hover:text-brand-orange transition-colors duration-200"
            >
              Cursor AI
            </a>{" "}
            © 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
