import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import NotFoundSVG from "../../assets/not-found.svg";

export const NotFound = () => {
  const history = useHistory();
  return (
    <Flex
      p={["10px 15px", "10px 15px", "0", "0"]}
      justifyContent="space-evenly"
      alignItems="center"
      h={["auto", "auto", "100vh", "100vh"]}
      flexDirection={["column-reverse", "column-reverse", "row", "row"]}
    >
      <Box mt="4">
        <Heading>Ooops!</Heading>
        <Text mt="4">
          Não encontramos a página que você procurou, <br />
          <b>vamos tentar novamente.</b>
        </Text>
        <Button
          mt="4"
          bg="red.600"
          h="60px"
          color="white"
          w="100%"
          _hover={{ bg: "red.700" }}
          onClick={() => history.push("/")}
        >
          Ir para as minhas tarefas
        </Button>
      </Box>
      <Image src={NotFoundSVG} />
    </Flex>
  );
};
