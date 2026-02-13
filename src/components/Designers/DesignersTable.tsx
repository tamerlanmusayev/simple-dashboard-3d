import { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, HStack, Button, Text, IconButton, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FiChevronLeft, FiChevronRight, FiInbox } from "react-icons/fi";

type Designer = {
  id: string;
  fullName: string;
  workingHours: string;
  attachedObjectsCount: number;
};

type Props = {
  data: Designer[];
};

export const DesignersTable = ({ data }: Props) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const hasData = data.length > 0;
  const totalPages = hasData ? Math.ceil(data.length / itemsPerPage) : 0;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = hasData ? data.slice(startIdx, startIdx + itemsPerPage) : [];

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <Flex h="100%" direction="column">
      {/* TABLE / EMPTY */}
      <Box flex="1" overflowY="auto">
        {hasData ? (
          <Table variant="simple">
            <Thead bg="gray.100" position="sticky" top={0} zIndex={1}>
              <Tr>
                <Th>{t("fullName")}</Th>
                <Th>{t("workingHours")}</Th>
                <Th>{t("attachedObjects")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentData.map((d, idx) => (
                <Tr key={d.id} bg={idx % 2 === 0 ? "gray.50" : "white"} _hover={{ bg: "teal.50" }}>
                  <Td>{d.fullName}</Td>
                  <Td>{d.workingHours}</Td>
                  <Td>{d.attachedObjectsCount}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Flex h="100%" align="center" justify="center" direction="column" color="gray.400">
            <FiInbox size={48} />
            <Text mt={2} fontSize="md">
              {t("noData")}
            </Text>
          </Flex>
        )}
      </Box>

      {/* PAGINATION */}
      <Box flexShrink={0} borderTop="1px solid" borderColor="gray.200" bg="white" py={2}>
        <HStack justify="center" spacing={2}>
          <IconButton
            aria-label="Previous page"
            icon={<FiChevronLeft />}
            size="sm"
            isDisabled={!hasData || currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          />

          {hasData &&
            Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                size="sm"
                colorScheme={i + 1 === currentPage ? "teal" : "gray"}
                onClick={() => changePage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

          <IconButton
            aria-label="Next page"
            icon={<FiChevronRight />}
            size="sm"
            isDisabled={!hasData || currentPage === totalPages}
            onClick={() => changePage(currentPage + 1)}
          />
        </HStack>

        <Text mt={1} textAlign="center" fontSize="sm" color="gray.500">
          {hasData ? `${t("page")} ${currentPage} ${t("of")} ${totalPages}` : t("noPages")}
        </Text>
      </Box>
    </Flex>
  );
};
