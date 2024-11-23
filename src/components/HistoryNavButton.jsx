import { Button, Tooltip } from "@yamada-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const HistoryNavButton = () => {
  let navigate = useNavigate();
  let goBack = () => {
    navigate(-1);
  };
  return (
    <Tooltip label="Back" openDelay={500} gutter={2} fontSize="xs">
      <Button
        outline="none"
        bg="none"
        borderRadius="full"
        w={6}
        p={1}
        rightIcon={<BiArrowBack />}
        onClick={goBack}
      ></Button>
    </Tooltip>
  );
};
