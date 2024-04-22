/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import axios from "@/axios/axios";
import toast from "react-hot-toast";
export default function Post({ post }) {
  const { _id, content, user, like } = post || {};
  const { name, avatar } = user || {};
  const queryClient = useQueryClient();
  const { mutateAsync: addLike } = useMutation({
    mutationFn: async () => {
      return await axios.patch(`/posts/add-like/${_id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Posts"]);
    },
  });

  const handleAddLikePost = async () => {
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
            <p className=" text-sm text-gray-600">an hour ago</p>
          </div>
        </div>
        <div className="py-5">
          <p className="text-base font-medium">{content}</p>
        </div>
        <div>
          <Button onClick={() => handleAddLikePost()} variant="outline">
            {" "}
            {like} Likes
          </Button>
        </div>
      </div>
    </div>
  );
}
