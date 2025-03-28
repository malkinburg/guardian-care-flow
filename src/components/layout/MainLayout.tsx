
import { ReactNode } from "react";
import { Calendar } from "lucide-react";
import MobileNavigation from "./MobileNavigation";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {title && (
        <header className="sticky top-0 z-10 bg-gradient-to-r from-sky-500 to-sky-400 text-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">{title}</h1>
              {title === "Shifts" && (
                <button className="rounded-full p-2 bg-white/20 hover:bg-white/30 transition-colors">
                  <Calendar className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </header>
      )}
      
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      <MobileNavigation />
    </div>
  );
};

export default MainLayout;
