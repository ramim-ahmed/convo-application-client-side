import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const handleSignInUser = async () => {
    await signInUser();
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div>
        <Button
          onClick={() => handleSignInUser()}
          className="border border-green-500"
        >
          SignIn With Google
        </Button>
      </div>
    </div>
  );
}
