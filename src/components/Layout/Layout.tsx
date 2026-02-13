import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Flex, Box } from "@chakra-ui/react";

export const Layout = () => {
  return (
    <Box h="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1" overflow="hidden" px={3}>
        <Outlet />
      </Box>
    </Box>
  );
};
