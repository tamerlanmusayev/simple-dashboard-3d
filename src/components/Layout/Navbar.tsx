import { Box, HStack } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Navbar = () => {
  return (
    <Box as="nav" top={0} left={0} right={0} zIndex={1000} bg="white" boxShadow="md" px={4} py={2}>
      <HStack spacing={4} align="center">
        <Logo />
        <Box marginLeft="auto">
          <LanguageSwitcher />
        </Box>
      </HStack>
    </Box>
  );
};
