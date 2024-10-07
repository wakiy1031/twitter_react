import { getPosts } from "../../api/postApi";
import { PostItem } from "./postItem";
import { POSTS_ENDPOINT } from "../../../utils/api";
import useSWR from "swr";

export const PostList = () => {
  const { data: posts, error, isLoading } = useSWR(POSTS_ENDPOINT, getPosts);

  if (error) {
    return <div>投稿一覧の取得中にエラーが発生しました。</div>;
  }

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  );
};
