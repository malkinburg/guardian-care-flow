
import { ReactNode } from "react";
import MobileNavigation from "./MobileNavigation";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {title && (
        <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <h1 className="text-xl font-semibold text-primary">{title}</h1>
          </div>
        </header>
      )}
      
      <main className="flex-1 container mx-auto px-4 py-4 mb-16">
        {children}
      </main>
      
      <MobileNavigation />
    </div>
  );
};

export default MainLayout;
