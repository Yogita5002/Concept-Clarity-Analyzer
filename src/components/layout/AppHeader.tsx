
import { Book, GraduationCap, LineChart, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const AppHeader = () => {
  const isMobile = useIsMobile();
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center mr-4 space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg hidden sm:inline-block">Concept Clarity Analyzer</span>
          <span className="font-bold text-lg sm:hidden">CCA</span>
        </div>
        
        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={() => setShowMobileNav(!showMobileNav)} className="ml-auto">
              <List className="h-5 w-5" />
            </Button>
            {showMobileNav && (
              <div className="absolute top-14 right-0 w-full bg-background border-b p-4 flex flex-col space-y-2 animate-fade-in">
                <NavItem href="#" icon={<Book className="mr-2 h-4 w-4" />}>Subjects</NavItem>
                <NavItem href="#" icon={<LineChart className="mr-2 h-4 w-4" />}>Progress</NavItem>
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center ml-auto space-x-4 lg:space-x-6">
            <NavItem href="#" icon={<Book className="mr-2 h-4 w-4" />}>Subjects</NavItem>
            <NavItem href="#" icon={<LineChart className="mr-2 h-4 w-4" />}>Progress</NavItem>
          </nav>
        )}
      </div>
    </header>
  );
};

const NavItem = ({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <a 
    href={href} 
    className="flex items-center text-sm font-medium transition-colors hover:text-primary"
  >
    {icon}
    {children}
  </a>
);

export default AppHeader;
