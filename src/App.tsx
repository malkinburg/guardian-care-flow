
import React, { StrictMode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Shifts from "./pages/Shifts";
import ShiftDetail from "./pages/ShiftDetail";
import Clients from "./pages/Clients";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Timesheets from "./pages/Timesheets";
import Invoices from "./pages/Invoices";
import Participants from "./pages/Participants";
import Certificates from "./pages/Certificates";
import Incidents from "./pages/Incidents";
import Companions from "./pages/Companions";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";

// Create a client outside of the component to avoid re-initializations
const queryClient = new QueryClient();

const App = () => {
  const isAuthenticated = !!localStorage.getItem("user");

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route 
                path="/" 
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/shifts" 
                element={isAuthenticated ? <Shifts /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/shifts/available" 
                element={isAuthenticated ? <Shifts initialTab="available" /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/shifts/:id" 
                element={isAuthenticated ? <ShiftDetail /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/clients" 
                element={isAuthenticated ? <Clients /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/messages" 
                element={isAuthenticated ? <Messages /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/timesheets" 
                element={isAuthenticated ? <Timesheets /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/invoices" 
                element={isAuthenticated ? <Invoices /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/profile" 
                element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/participants" 
                element={isAuthenticated ? <Participants /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/certificates" 
                element={isAuthenticated ? <Certificates /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/incidents" 
                element={isAuthenticated ? <Incidents /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/companions" 
                element={isAuthenticated ? <Companions /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/events" 
                element={isAuthenticated ? <Events /> : <Navigate to="/login" />} 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;
