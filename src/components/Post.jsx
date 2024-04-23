/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import axios from "@/axios/axios";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import TimeAgo from "./TimeAgo";
import PostAction from "./PostAction";
import { useRef, useState } from "react";
export default function Post({ post }) {
  const [editable, setEditable] = useState(false);
  const updateInputRef = useRef();
  const updateTitleRef = useRef();
  const { authUser } = useAuth();
  const { _id, content, user, likes, createdAt, title } = post || {};
  const { name, avatar, email } = user || {};
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

  const { mutateAsync: updateContent } = useMutation({
    mutationFn: async (data) => {
      return await axios.patch(`/posts/${_id}`, data);
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

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const data = {
      title: updateTitleRef.current.value,
      content: updateInputRef.current.value,
    };
    try {
      await updateContent(data);
      toast.success("Post is updated successfully!!");
      setEditable(false);
    } catch (error) {
      toast.error(error.message);
      setEditable(false);
    }
  };

  return (
    <div className="border-b">
      <div className="bg-white p-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <img
              className="w-12 h-12 object-cover rounded-full border border-indigo-700"
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
          {authUser?.email === email && (
            <PostAction
              editable={editable}
              setEditable={setEditable}
              id={_id}
            />
          )}
        </div>
        <div className="py-5">
          {editable ? (
            <form onSubmit={handleUpdatePost} className="space-y-2">
              <input
                ref={updateTitleRef}
                type="text"
                className="w-full px-5 py-2 rounded-md border border-black"
                defaultValue={title}
              />
              <input
                className="w-full px-5 py-2 rounded-md border border-black"
                ref={updateInputRef}
                defaultValue={content}
              />
              <input hidden type="submit" value="submit" />
            </form>
          ) : (
            <div>
              <h1 className="text-xl font-semibold">{title}</h1>
              <p className="text-base mt-2 text-gray-600">{content}</p>
            </div>
          )}
        </div>
        <div>
          <Button onClick={() => handleAddLikePost()} variant="outline">
            {likes} {likes > 1 ? "Likes" : "Like"}
          </Button>
        </div>
      </div>
    </div>
  );
}
