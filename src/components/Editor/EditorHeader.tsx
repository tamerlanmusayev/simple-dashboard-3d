import { Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowLeft } from "react-icons/fi";

export const EditorHeader = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Flex p={4} align="center" bg="gray.50" borderBottom="1px solid #ccc">
      <Button
        mr={4}
        colorScheme="blue"
        leftIcon={<FiArrowLeft />}
        onClick={() => navigate("/designers")}
        _hover={{ transform: "translateX(-2px)" }}
        transition="0.2s"
      >
        {t("back")}
      </Button>
    </Flex>
  );
};
