import {
  Box,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@yamada-ui/react";
import { BASE_URL } from "../../../utils/api";
import { Carousel, CarouselSlide } from "@yamada-ui/carousel";
import { useState } from "react";

export const PostImages = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const imageCount = post.images.length;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <Box position="relative">
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
              objectPosition="center"
              onClick={() => {
                setSelectedImageIndex(index);
                onOpen();
              }}
            />
          </GridItem>
        ))}
      </Grid>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        borderRadius="0"
        size="5xl"
        bg="none"
        boxShadow="none"
        h="full"
      >
        <ModalCloseButton
          color="white"
          zIndex={1000}
          _focusVisible={false}
          position="absolute"
          left={0}
          top={0}
          bg="gray.800"
          borderRadius="9999px"
        />
        <ModalBody p={0} m={0} display="flex" justifyContent="center">
          <Carousel
            align="start"
            withIndicators={false}
            loop={false}
            draggable={false}
            controlProps={{
              bg: "gray.800",
              color: "white",
              _hover: { bg: "gray.900" },
            }}
            defaultIndex={selectedImageIndex}
            h={"100%"}
          >
            {post.images.map((image, index) => (
              <CarouselSlide key={index} className="relative" h="full">
                <Box
                  position="relative"
                  h="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src={`${BASE_URL}${image.url}`}
                    objectFit="contain"
                    objectPosition="center"
                  />
                </Box>
              </CarouselSlide>
            ))}
          </Carousel>
        </ModalBody>
      </Modal>
    </Box>
  );
};
