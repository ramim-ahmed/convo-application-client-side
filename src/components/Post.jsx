/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import axios from "@/axios/axios";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import TimeAgo from "./TimeAgo";
export default function Post({ post }) {
  const { authUser } = useAuth();
  const { _id, content, user, like, createdAt } = post || {};
  const { name, avatar } = user || {};
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: addLike } = useMutation({
    mutationFn: async () => {
      return await axios.patch(`/posts/add-like/${_id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Posts"]);
    },
  });

  const handleAddLikePost = async () => {
    if (!authUser) {
      return navigate("/sign-in");
    }
    try {
      await addLike();
      toast.success("Like Added!!");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="border-b">
      <div className="bg-white p-6">
        <div className="flex space-x-4">
          <img
            className="w-12 h-12 object-cover rounded-full"
            src={avatar}
            alt=""
          />
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className=" text-sm text-gray-600">
              <TimeAgo date={createdAt} />
            </p>
          </div>
        </div>
        <div className="py-5">
          <p className="text-base font-medium">{content}</p>
        </div>
        <div>
          <Button onClick={() => handleAddLikePost()} variant="outline">
            {like} {like > 1 ? "Likes" : "Like"}
          </Button>
        </div>
      </div>
    </div>
  );
}
