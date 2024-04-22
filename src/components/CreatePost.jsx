import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function CreatePost() {
  return (
    <div>
      <div>
        <Textarea
          className="placeholder:text-base"
          placeholder="Type your content...."
          required
        />
        <div className="flex justify-end mt-3">
          <Button>Post</Button>
        </div>
      </div>
    </div>
  );
}
