/* eslint-disable react/prop-types */
import { Button } from "./ui/button";

export default function Post({ post }) {
  const { content, user, like } = post || {};
  const { name } = user || {};
  return (
    <div className="border-b">
      <div className="bg-white p-6">
        <div className="flex space-x-4">
          <img
            className="w-12 h-12 object-cover rounded-full"
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
          <Button variant="outline"> {like} Likes</Button>
        </div>
      </div>
    </div>
  );
}
