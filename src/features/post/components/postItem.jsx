import { BASE_URL } from "../../../utils/api";
import { Text, Image } from "@yamada-ui/react";

export const PostItem = ({ post }) => {
  return (
    <>
      <Text>{post.content}</Text>
      {post.images.length > 0 &&
        post.images.map((image) => (
          <Image key={image.id} src={`${BASE_URL}${image.url}`} />
        ))}
    </>
  );
};
