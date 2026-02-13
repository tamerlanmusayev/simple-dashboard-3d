import { Flex, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiEdit, FiPlus } from "react-icons/fi";

export const DesignersHeader = ({ onAdd }: { onAdd: () => void }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Flex p={4} justify="space-between" align="center" bg="gray.50" borderBottom="1px solid #ccc">
      <Heading size="md">{t("designers")}</Heading>
      <Flex gap={2}>
        <Button colorScheme="teal" leftIcon={<FiPlus />} onClick={onAdd}>
          {t("addNew")}
        </Button>
        <Button colorScheme="blue" leftIcon={<FiEdit />} onClick={() => navigate("/editor")}>
          {t("goToEditor")}
        </Button>
      </Flex>
    </Flex>
  );
};
