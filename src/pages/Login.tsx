
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Plus } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    }
  }, [navigate]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-400 via-sky-500 to-cyan-500 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-32 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
      
      <div className="relative z-10 mb-12 text-center">
        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg relative">
          <div className="relative">
            <Briefcase className="w-8 h-8 text-sky-500" />
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
              <Plus className="w-3 h-3 text-sky-500" />
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">GuardianCare+</h1>
        <p className="text-white/80 text-lg">Your comprehensive caregiving assistant</p>
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
