import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button, HStack, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";

const flags = {
  en: "US",
  ru: "RU",
  az: "AZ",
};

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const handleChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language || "en";

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="sm">
        <HStack spacing={2}>
          <Flag code={flags[currentLanguage as keyof typeof flags]} style={{ width: 24, height: 16 }} />
          <Text>{t(`languages.${currentLanguage}`)}</Text>
        </HStack>
      </MenuButton>
      <MenuList>
        {Object.keys(flags).map((code) => (
          <MenuItem key={code} onClick={() => handleChange(code)}>
            <HStack spacing={2}>
              <Flag code={flags[code as keyof typeof flags]} style={{ width: 24, height: 16 }} />
              <Text>{t(`languages.${code}`)}</Text>
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
