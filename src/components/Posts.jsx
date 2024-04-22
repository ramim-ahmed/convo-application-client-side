import Post from "./Post";
import Loader from "./Loader";
import usePosts from "@/hooks/usePosts";
export default function Posts() {
  const { data, isLoading } = usePosts();
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
