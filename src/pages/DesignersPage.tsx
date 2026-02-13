import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";
import { useStore } from "../store";
import { DesignersHeader } from "../components/Designers/DesignersHeader";
import { useTranslation } from "react-i18next";
import { DesignersTable } from "../components/Designers/DesignersTable";
import { DesignerForm } from "../components/Designers/DesignerForm";

export default function DesignersPage() {
  const { t } = useTranslation();
  const { designers, objects } = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Prepare data with attached objects count
  const data = designers.map((d) => ({
    ...d,
    attachedObjectsCount: objects.filter((o) => o.designerId === d.id).length,
  }));

  return (
    <Box h="100%" display="flex" flexDirection="column">
      <DesignersHeader onAdd={onOpen} />

      <Box flex="1" overflow="hidden">
        <DesignersTable data={data} />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("addNew")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DesignerForm onSuccess={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
