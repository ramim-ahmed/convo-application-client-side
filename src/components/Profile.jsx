import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";
export default function Profile() {
  const { authUser, logout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          className="w-12 h-12 border border-indigo-700 rounded-full object-cover cursor-pointer"
          src={authUser?.photoURL}
          alt=""
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link to="/my-profile">
          <DropdownMenuItem className="font-medium cursor-pointer">
            My Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={() => logout()}
          className="cursor-pointer font-medium"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
