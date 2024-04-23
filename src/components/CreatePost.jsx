import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import axios from "@/axios/axios";
import { useRef } from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
export default function CreatePost() {
  const postInputRef = useRef();
  const postTitleRef = useRef();
  const queryClient = useQueryClient();
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync: addNewPost } = useMutation({
    mutationFn: async (data) => {
      return await axios.post("/posts/create-post", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Posts"]);
    },
  });

  const handlePost = async () => {
    if (!authUser) {
      return navigate("/sign-in");
    }
    const data = {
      user: {
        name: authUser?.displayName,
        email: authUser?.email || "",
        avatar: authUser?.photoURL || "",
      },
      title: postTitleRef.current.value,
      content: postInputRef.current.value,
    };
    try {
      await addNewPost(data);
      toast.success("Post created successfully!!");
      postInputRef.current.value = "";
      postTitleRef.current.value = "";
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="bg-white p-4 rounded-md">
        <Input
          ref={postTitleRef}
          placeholder="title"
          className="placeholder:text-base text-lg"
          required
        />
        <Textarea
          ref={postInputRef}
          className="placeholder:text-base text-lg mt-2"
          placeholder="type post content..."
          required
        />
        <div className="flex justify-end mt-3">
          <Button onClick={() => handlePost()}>Post</Button>
        </div>
      </div>
    </div>
  );
}
