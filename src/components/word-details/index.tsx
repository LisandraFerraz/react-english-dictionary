import { Box, Button, Flex, Text, Image, Spacer } from "@chakra-ui/react";
import { toastMessage } from "../toast";

import playIcon from "./../../assets/icons/player_icon.svg";
import "./styles.scss";

export default function WordDetails(params: any) {
  const synonyms = params.synonyms;
  const { newToast } = toastMessage();

  function playAudio() {
    let audio = new Audio(params.audioSource);

    if (audio.src.slice(-3) === "mp3") {
      audio.play();
    } else {
      newToast({ title: "No audio available for this one!", color: "#eb4034" });
    }
  }

  return (
    <>
      <Flex flexDirection={"column"}>
        <Flex
          w={[380, 480, 700, 800]}
          flexDirection={"row"}
          alignItems="center"
        >
          <Box>
            <Text
              fontSize="5xl"
              fontFamily={"default"}
              fontWeight="bold"
              textTransform={"lowercase"}
            >
              {params.word}
            </Text>
            <Text fontSize="2xl" color="#A747ED">
              {params.phonetic}
            </Text>
          </Box>
          <Spacer />
          <Box>
            <Button
              backgroundColor="#E9D0FA"
              _hover={{ bg: "#E9D0FA", opacity: "60%" }}
              borderRadius="100%"
              height="50px"
              width="50px"
              onClick={playAudio}
            >
              <Image src={playIcon} />
            </Button>
          </Box>
        </Flex>

        <Flex alignItems="baseline" gap="3">
          {synonyms.length ? (
            <Text marginTop="30px" opacity={"60%"} fontWeight="semibold">
              Synonyms
            </Text>
          ) : (
            <></>
          )}
          {synonyms?.slice(0, 5).map((resp: any, i: number) => {
            return (
              <Text
                textTransform={"lowercase"}
                fontWeight={"extrabold"}
                color={"#a747ed"}
                key={i}
              >
                {resp}
              </Text>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
}
