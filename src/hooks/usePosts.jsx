import axios from "@/axios/axios";
import { useQuery } from "@tanstack/react-query";

export default function usePosts() {
  const { data, isLoading } = useQuery({
    queryKey: ["Posts"],
    queryFn: async () => {
      const data = await axios.get("/posts");
      return data?.data;
    },
  });
  return { data, isLoading };
}
