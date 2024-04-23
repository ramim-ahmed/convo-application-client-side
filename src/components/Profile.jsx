import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
export default function Profile() {
  const { authUser, logout } = useAuth();
  console.log(authUser);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          className="w-12 h-12 rounded-full object-cover cursor-pointer"
          src={authUser?.photoURL}
          alt=""
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>{authUser?.displayName}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
