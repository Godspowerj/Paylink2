import { Link } from "react-router";
import { cn } from "~/lib/utils";

// Moniepoint-style solid blue
const BLUE = "#0361F0";

const Logo = ({ size = "default", className }: { size?: "small" | "default" | "large" | "hero"; className?: string }) => {
  const textClass = {
    small: "text-[18px]",
    default: "text-[22px]",
    large: "text-[28px]",
    hero: "text-[42px]",
  };

  return (
    <Link to="/" className={cn("flex items-center group", className)}>
      {/* Wordmark Only Logo */}
      <span
        className={cn("font-bold tracking-tight", textClass[size])}
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <span style={{ color: BLUE }}>Pay</span>
        <span className="text-[#0F172A]">link</span>
      </span>
    </Link>
  );
};

export default Logo;
