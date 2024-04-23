import axios from "@/axios/axios";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  const { authUser } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["Posts"],
    queryFn: async () => {
      const data = await axios.get(`/posts/?email=${authUser?.email}`);
      return data?.data;
    },
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-3 grid grid-cols-12 gap-x-6 pt-5">
        <div className="lg:col-span-4 col-span-12">
          <div className="bg-white rounded-md p-4 border">
            <div className="flex justify-center">
              <img
                className="w-24 h-24 border border-indigo-600 rounded-full"
                src={authUser?.photoURL}
                alt=""
              />
            </div>
            <h1 className="text-xl font-semibold mt-3 text-center">
              {authUser?.displayName}
            </h1>
            <p className="text-gray-800 text-sm text-center">
              {authUser?.email}
            </p>
            <div className="flex justify-center mt-2">
              <button className="bg-indigo-600 font-semibold text-white text-center px-5 py-1 ">
                BATCH: 9
              </button>
            </div>
          </div>
          <div className="bg-white mt-4 border rounded-md p-4  mb-3 lg:mb-0">
            <Button variant="outline" className="w-full flex justify-between">
              <span>My Posts</span>
              <span>{isLoading ? <p>loading</p> : data?.data?.length}</span>
            </Button>
          </div>
        </div>
        <div className="lg:col-span-8 col-span-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
