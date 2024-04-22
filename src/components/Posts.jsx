import { useQuery } from "@tanstack/react-query";
import Post from "./Post";
import Loader from "./Loader";
import axios from "@/axios/axios";

export default function Posts() {
  const { data, isLoading } = useQuery({
    queryKey: ["Posts"],
    queryFn: async () => {
      const data = await axios.get("/posts");
      return data?.data;
    },
  });

  return (
    <div className="border">
      {isLoading ? (
        <div className="flex justify-center pt-10">
          <Loader />
        </div>
      ) : (
        data?.data.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
}
