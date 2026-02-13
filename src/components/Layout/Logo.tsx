import { useTranslation } from "react-i18next";
import { HStack, Text, Link as ChakraLink, Box } from "@chakra-ui/react";
import { FiBox } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

export const Logo = () => {
  const { t } = useTranslation();

  return (
    <HStack p={4} spacing={2} align="center">
      <ChakraLink
        as={RouterLink}
        to="/"
        display="flex"
        alignItems="center"
        role="group"
        _hover={{ textDecoration: "none" }}
      >
        <Box
          fontSize="2xl"
          color="teal.500"
          mr={2}
          transition="transform 0.6s"
          _groupHover={{ transform: "rotate(360deg)" }}
        >
          <FiBox />
        </Box>

        <Text fontWeight="bold" fontSize="lg" color="teal.700">
          {t("projectName")}
        </Text>
      </ChakraLink>
    </HStack>
  );
};
