import "./styles.scss";
import { Flex, Divider, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { useEffect } from "react";

export default function SectionTitle(params: any) {
  let def = params.definitions;

  return (
    <>
      <Flex
        marginTop="30px"
        w={[380, 480, 700, 800]}
        flexDirection="row"
        alignItems="center"
        gap="5"
      >
        <Text fontSize="1.6rem" fontFamily="Delicious Handrawn">
          {params.secTitle}
        </Text>
        <Divider orientation="horizontal" marginTop="10px" />
      </Flex>
      <Flex flexDirection="column" w={[380, 480, 700, 800]} marginTop="30px">
        <Text opacity={"60%"} fontWeight="semibold">
          Meaning
        </Text>
        <UnorderedList marginLeft="35px" marginTop="30px" spacing={4}>
          {def?.slice(0, 4).map((def: any, index: number) => {
            return <ListItem key={index}>{def.definition}</ListItem>;
          })}
        </UnorderedList>
      </Flex>
    </>
  );
}
