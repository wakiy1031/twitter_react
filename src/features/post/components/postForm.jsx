import { useState } from "react";
import { usePost } from "../../../hooks/usePost";
import { useNotice } from "@yamada-ui/react";

export const PostForm = () => {
  const [content, setContent] = useState("");
  const { handleSubmit } = usePost();
  const notice = useNotice();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit({ content });
      setContent("");
      notice({
        title: "投稿が作成されました",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("投稿作成エラー:", error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="投稿内容を入力してください"
        required
      />
      <button type="submit">投稿する</button>
    </form>
  );
};
