import {
  Box,
  Flex,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  IconButton,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { Scene } from "../three/Scene";
import { ObjectPanel } from "../components/Editor/ObjectPanel";
import { EditorHeader } from "../components/Editor/EditorHeader";

export default function EditorPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex direction="column" height="100vh">
      {/* Header at top */}
      <EditorHeader />

      {/* Main content */}
      <Flex flex="1" overflow="hidden" position="relative">
        {/* Scene */}
        <Box flex="1" overflow="hidden">
          <Scene />

          {/* Menu button for smaller screens */}
          <IconButton
            aria-label="Open Object Panel"
            icon={<FiMenu />}
            position="absolute"
            top={4}
            left={4}
            display={{ base: "inline-flex", md: "none" }}
            zIndex={10}
            onClick={onOpen}
          />
        </Box>

        {/* Sidebar for medium+ screens */}
        <Box
          w={{ base: 0, md: "300px" }}
          bg="gray.50"
          borderLeft={{ base: "none", md: "1px solid" }}
          borderColor="gray.200"
          overflowY="auto"
          display={{ base: "none", md: "block" }}
        >
          <ObjectPanel />
        </Box>

        {/* Drawer for small screens */}
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody p={0}>
              <ObjectPanel />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Flex>
  );
}
