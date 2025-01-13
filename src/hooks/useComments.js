import useSWR from "swr";
import { getComments } from "../features/api/commentApi";

export const useComments = (postId) => {
  const { data, error, isLoading } = useSWR(
    postId ? `comments-${postId}` : null,
    () => getComments(postId)
  );

  return {
    comments: data,
    isLoading,
    error,
  };
};
