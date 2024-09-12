"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { logout } from "@/actions/auth/logout.action";
import { useAuth } from "@/context/AuthContext";

export default function ActionBar() {
  const { isAuthenticated } = useAuth();
  const route = useRouter();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <Button variant={"link"} onClick={() => route.push("/game")}>
        Play
      </Button>
      {isAuthenticated ? (
        <Button variant={"link"} onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button variant={"link"} onClick={() => route.push("/auth")}>
          Login
        </Button>
      )}
    </div>
  );
}
