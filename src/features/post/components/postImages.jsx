import { Grid, GridItem, Image } from "@yamada-ui/react";
import { BASE_URL } from "../../../utils/api";

export const PostImages = ({ post }) => {
  const imageCount = post.images.length;

  return (
    <Grid
      templateColumns={
        imageCount === 1 ? "1fr" : imageCount >= 2 ? "repeat(2, 1fr)" : "1fr"
      }
      templateRows={
        imageCount === 3
          ? "repeat(2, 1fr)"
          : imageCount === 4
          ? "repeat(2, 1fr)"
          : "auto"
      }
      gap={0.5}
      borderRadius="xl"
      overflow="hidden"
    >
      {post.images.map((image, index) => (
        <GridItem
          key={image.id}
          gridColumn={
            imageCount === 3 && index === 0
              ? "1 / 2"
              : imageCount === 3 && index > 0
              ? "2 / 3"
              : imageCount === 4
              ? index % 2 === 0
                ? "1 / 2"
                : "2 / 3"
              : "auto"
          }
          gridRow={
            imageCount === 3 && index === 0
              ? "1 / 3"
              : imageCount === 3 && index === 1
              ? "1 / 2"
              : imageCount === 3 && index === 2
              ? "2 / 3"
              : imageCount === 4
              ? index < 2
                ? "1 / 2"
                : "2 / 3"
              : "auto"
          }
        >
          <Image
            src={`${BASE_URL}${image.url}`}
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </GridItem>
      ))}
    </Grid>
  );
};
