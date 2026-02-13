import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";
import { useStore } from "../../store";
import { Designer } from "../../api/types";
import { Button, Input, FormControl, FormLabel, FormErrorMessage, VStack } from "@chakra-ui/react";
import InputMask from "react-input-mask";
import { useTranslation } from "react-i18next";

// Hook returning schema with i18n error messages
const useDesignerFormSchema = () => {
  const { t } = useTranslation();

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // 00:00 - 23:59

  return z.object({
    fullName: z
      .string()
      .nonempty({ message: t("errors.fullNameRequired") })
      .min(3, { message: t("errors.fullNameMin") }),

    workingHours: z
      .string()
      .nonempty({ message: t("errors.workingHoursRequired") })
      .regex(/^\d{2}:\d{2}-\d{2}:\d{2}$/, { message: t("errors.workingHoursFormat") })
      .refine(
        (val) => {
          if (!val) return false;

          const [startStr, endStr] = val.split("-");
          if (!startStr || !endStr) return false;
          if (!timeRegex.test(startStr) || !timeRegex.test(endStr)) return false;

          const [startH, startM] = startStr.split(":").map(Number);
          const [endH, endM] = endStr.split(":").map(Number);

          return startH < endH || (startH === endH && startM < endM);
        },
        { message: t("errors.workingHoursInvalid") },
      ),
  });
};

export const DesignerForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const addDesigner = useStore((s) => s.addDesigner);
  const { t } = useTranslation();
  const schema = useDesignerFormSchema(); // schema inside component
  type FormData = z.infer<typeof schema>; // infer type from schema here

  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const newDesigner: Designer = {
      id: uuid(),
      fullName: data.fullName,
      workingHours: data.workingHours,
    };
    addDesigner(newDesigner);
    reset();
    onSuccess?.();
  };

  return (
    <VStack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!formState.errors.fullName}>
        <FormLabel>{useTranslation().t("fullName")}</FormLabel>
        <Input placeholder="Elon Musk" {...register("fullName")} />
        <FormErrorMessage>{formState.errors.fullName?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!formState.errors.workingHours}>
        <FormLabel>{useTranslation().t("workingHours")}</FormLabel>
        <InputMask mask="99:99-99:99" {...register("workingHours")}>
          {(inputProps: any) => <Input {...inputProps} placeholder="09:00-17:00" />}
        </InputMask>
        <FormErrorMessage>{formState.errors.workingHours?.message}</FormErrorMessage>
      </FormControl>

      <Button colorScheme="teal" type="submit">
        {t("addNew")}
      </Button>
    </VStack>
  );
};
