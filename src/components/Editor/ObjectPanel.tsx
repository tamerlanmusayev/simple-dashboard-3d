import { Box, VStack, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useStore } from "../../store";
import { useTranslation } from "react-i18next";

export const ObjectPanel = () => {
  const { objects, selectedObjectId, updateObject, designers } = useStore();
  const { t } = useTranslation();
  const obj = objects.find((o) => o.id === selectedObjectId);

  if (!obj) return <Box p={4}>{t("selectObjectToEdit")}</Box>;

  return (
    <VStack spacing={4} p={4} align="stretch">
      <FormControl>
        <FormLabel>{t("designer")}</FormLabel>
        <Select value={obj.designerId || ""} onChange={(e) => updateObject({ ...obj, designerId: e.target.value })}>
          {designers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.fullName}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>{t("name")}</FormLabel>
        <Input value={obj.name} onChange={(e) => updateObject({ ...obj, name: e.target.value })} />
      </FormControl>

      <FormControl>
        <FormLabel>{t("color")}</FormLabel>
        <Input type="color" value={obj.color} onChange={(e) => updateObject({ ...obj, color: e.target.value })} />
      </FormControl>

      <FormControl>
        <FormLabel>{t("size")}</FormLabel>
        <Select value={obj.size} onChange={(e) => updateObject({ ...obj, size: e.target.value as any })}>
          <option value="small">{t("sizeSmall")}</option>
          <option value="normal">{t("sizeNormal")}</option>
          <option value="large">{t("sizeLarge")}</option>
        </Select>
      </FormControl>
    </VStack>
  );
};
