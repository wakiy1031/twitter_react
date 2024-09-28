import { useState } from "react";
import { usePost } from "../../../hooks/usePost";
import { useNotice } from "@yamada-ui/react";
import { uploadImage } from "../../../features/api/postApi";

export const PostForm = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const { handleSubmit } = usePost();
  const notice = useNotice();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const postResponse = await handleSubmit({ content });

      if (image) {
        const formData = new FormData();
        formData.append("images[]", image);
        formData.append("post_id", postResponse.data.id);
        await uploadImage(formData);
      }

      setContent("");
      setImage(null);
      setPreview("");
      notice({
        title: "投稿が作成されました",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("投稿作成エラー:", error);
      notice({
        title: "投稿作成エラー",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && (
        <img src={preview} alt="プレビュー" style={{ maxWidth: "200px" }} />
      )}
      <button type="submit">投稿する</button>
    </form>
  );
};
