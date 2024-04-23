import axios from "@/axios/axios";
import CreatePost from "@/components/CreatePost";
import Posts from "@/components/Posts";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["Posts"],
    queryFn: async () => {
      const data = await axios.get(`/posts`);
      return data?.data;
    },
  });
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-3 pt-4">
        <CreatePost />
        <div className="mt-2 space-x-3">
          <Button variant="outline">All Posts</Button>
        </div>
        <div className="mt-2">
          <Posts data={data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
