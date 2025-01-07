import { useToast } from "@chakra-ui/react";

export const toastMessage = () => {
  const toast = useToast();

  const newToast = (params: any) => {
    toast({
      title: params.title,
      variant: "variant",
      isClosable: true,
      status: "error",
      containerStyle: {
        backgroundColor: params.color,
        color: "#fff",
        borderRadius: "15px",
      },
    });
  };

  return { newToast };
};
