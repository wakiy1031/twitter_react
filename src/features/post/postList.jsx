import { getPosts } from "../api/postApi";
import { PostItem } from "./components/postItem";
import { POSTS_ENDPOINT } from "../../utils/api";
import useSWR from "swr";
import { Loading } from "@yamada-ui/react";

export const PostList = () => {
  const { data: posts, error, isLoading } = useSWR(POSTS_ENDPOINT, getPosts);

  if (error) {
    return <div>投稿一覧の取得中にエラーが発生しました。</div>;
  }

  if (isLoading) {
    return (
      <Loading
        variant="oval"
        fontSize="3xl"
        color="blue.500"
        mx={"auto"}
        w="full"
        mt={6}
      />
    );
  }

  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  );
};
