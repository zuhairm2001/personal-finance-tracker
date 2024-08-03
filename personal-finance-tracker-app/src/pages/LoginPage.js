import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";

const baseURL = "https://localhost:3000/api";

function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("api/login", {
      email: email,
      password: password,
    });
    // Here you would typically handle the login logic
    console.log("Login attempt with:", { email, password });
  };
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <HeaderComponent />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <h2 className="text-2xl font-bold text-center">Login</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <CardFooter className="flex justify-center pt-6">
                  <Button type="submit" className="w-full">
                    Log In
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </main>
        <FooterComponent />
      </div>
    </>
  );
}
export default LoginPage;
