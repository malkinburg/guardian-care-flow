
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      // For demo, just check if fields are filled
      if (email && password) {
        // Store user data in localStorage for demo purposes
        localStorage.setItem("user", JSON.stringify({ email, name: "Demo User" }));
        toast({
          title: "Login successful",
          description: "Welcome to Guardian Care Pro!",
        });
        navigate("/");
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <Card className="w-full bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-3xl overflow-hidden">
      <CardHeader className="space-y-1 pb-8 pt-8">
        <CardTitle className="text-2xl font-bold text-center text-gray-800">Welcome Back</CardTitle>
        <CardDescription className="text-center text-gray-600">
          Sign in to continue to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-xl border-gray-200 focus:border-sky-400 focus:ring-sky-400 bg-gray-50 text-gray-800 placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
              <Button variant="link" className="p-0 h-auto text-sm text-sky-600 hover:text-sky-700" type="button">
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-xl border-gray-200 focus:border-sky-400 focus:ring-sky-400 bg-gray-50 text-gray-800"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-xl font-medium text-base transition-all duration-200 shadow-lg hover:shadow-xl" 
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center pb-8">
        <Button variant="link" className="text-sm text-gray-600 hover:text-gray-800" type="button">
          Don't have an account? Sign up
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
