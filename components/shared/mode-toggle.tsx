"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  
  // To avoid hydration mismatch
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  
  if (!mounted) return <Button variant="ghost" size="icon"><Sun className="h-5 w-5 text-foreground/80" /></Button>;

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5 text-foreground/80" />
      ) : (
        <Sun className="h-5 w-5 text-foreground/80" />
      )}
    </Button>
  );
}
