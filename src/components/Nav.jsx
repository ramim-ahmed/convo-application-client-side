import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useAuth from "@/hooks/useAuth";
import Profile from "./Profile";

export default function Nav() {
  const { authUser } = useAuth();
  return (
    <div className="border-b shadow">
      <nav className="max-w-3xl mx-auto flex justify-between px-3 items-center py-3">
        <Link to="/">
          <h1 className="text-2xl font-bold cursor-pointer">Convo App</h1>
        </Link>
        {authUser ? (
          <Profile />
        ) : (
          <Link to="sign-in">
            <Button variant="outline" className="rounded-none">
              SignIn
            </Button>
          </Link>
        )}
      </nav>
    </div>
  );
}
