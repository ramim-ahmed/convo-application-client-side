/* eslint-disable react/prop-types */
import Post from "./Post";
import Loader from "./Loader";
export default function Posts({ data, isLoading }) {
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
