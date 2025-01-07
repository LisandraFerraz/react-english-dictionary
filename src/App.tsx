import {
  Button,
  Flex,
  Input,
  InputGroup,
  Image,
  InputRightElement,
  Divider,
  Text,
  Link,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import "./App.scss";

import GlobalStyle from "./theme-styles/global";
import light from "./theme-styles/light";
import dark from "./theme-styles/dark";
import { ThemeProvider } from "styled-components";

import AppHeader from "./components/header";
import searchIcon from "./assets/icons/search_ icon.svg";
import WordDetails from "./components/word-details";
import SectionTitle from "./components/section-title";
import { toastMessage } from "./components/toast";

export default function App() {
  const [theme, setTheme] = useState(light);

  let [word, setWord] = useState();
  let [wordDetails, setWordDetails] = useState<any>([]);
  let [wordMeanings, setWordMeanings] = useState<any>([]);
  let [license, setLicense] = useState("");

  const toggleTheme = () => {
    setTheme(theme.title == "light" ? dark : light);
  };

  const { newToast } = toastMessage();

  function defineWord(word: any) {
    setWord(word.target.value);
  }

  function searchWord() {
    if (!word) {
      return newToast({
        title: "Please insert a word first.",
        color: "#eb4034",
      });
    }
    async function subscribeSearch() {
      try {
        let url = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        let data = await url.json();

        let getWordDefinition = {
          phonetic: data[0].phonetic,
          word: data[0].word,
          synonyms: data[0].meanings[0].synonyms,
          audio: data[0].phonetics[0].audio,
        };

        let getWordMeanings = {
          meaning1: data[0].meanings[0],
          meaning2: data[0].meanings[1],
          meaning3: data[0].meanings[2],
          meaning4: data[0].meanings[3],
        };

        setWordDetails(() => [getWordDefinition]);
        setWordMeanings(() => [getWordMeanings]);
        setLicense(() => data[0].sourceUrls[0]);
      } catch (e) {
        return newToast({ title: "Word not found.", color: "#A747ED" });
      }
    }
    subscribeSearch();
  }

  return (
    <ThemeProvider theme={theme}>
      <Flex
        flexDirection="column"
        alignItems="center"
        marginY="40px"
        position="relative"
      >
        <GlobalStyle />
        <AppHeader toggleTheme={toggleTheme} />
        <Flex
          marginY="45px"
          flexDirection={"row"}
          w={[380, 480, 700, 800]}
          align={"center"}
        >
          <InputGroup>
            <Input
              className="search-word-input"
              placeholder="Hello..."
              borderRadius="12px"
              backgroundColor="#f4f4f425"
              focusBorderColor="#E9D0FA"
              minHeight="55px"
              fontWeight={"extrabold"}
              position={"relative"}
              onChange={(e) => defineWord(e)}
            />
            <InputRightElement width={"fit-content"}>
              <Button
                top="8px"
                width={"60px"}
                _hover={{ bg: "transparent", opacity: "60%" }}
                backgroundColor="transparent"
                minHeight="55px"
                onClick={searchWord}
              >
                <Image src={searchIcon} height="18px" />
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
        {wordDetails?.map((resp: any, i: number) => {
          return (
            <WordDetails
              key={i}
              word={resp.word}
              phonetic={resp.phonetic}
              synonyms={resp.synonyms}
              audioSource={resp.audio}
            />
          );
        })}
        {wordMeanings?.map((t: any) => {
          return (
            <>
              {t.meaning1 ? (
                <SectionTitle
                  key={t.meaning1.partOfSpeech}
                  secTitle={t.meaning1.partOfSpeech}
                  definitions={t.meaning1.definitions}
                />
              ) : (
                <></>
              )}

              {t.meaning2 ? (
                <SectionTitle
                  key={t.meaning2.partOfSpeech}
                  secTitle={t.meaning2.partOfSpeech}
                  definitions={t.meaning2.definitions}
                />
              ) : (
                <></>
              )}

              {t.meaning3 ? (
                <SectionTitle
                  key={t.meaning3.partOfSpeech}
                  secTitle={t.meaning3.partOfSpeech}
                  definitions={t.meaning3.definitions}
                />
              ) : (
                <></>
              )}

              {t.meaning4 ? (
                <SectionTitle
                  key={t.meaning4.partOfSpeech}
                  secTitle={t.meaning4.partOfSpeech}
                  definitions={t.meaning4.definitions}
                />
              ) : (
                <></>
              )}
            </>
          );
        })}
        {license ? (
          <>
            <Divider
              w={[380, 480, 700, 800]}
              marginTop="50px"
              orientation="horizontal"
            />
            <Flex
              gap={"2"}
              w={[380, 480, 700, 800]}
              fontSize="14px"
              marginTop={"30px"}
            >
              <Text opacity={"60%"} fontWeight="bold">
                Source:
              </Text>
              <Link href={license} isExternal textDecoration={"underline"}>
                {license}
              </Link>
            </Flex>
          </>
        ) : (
          <></>
        )}
        {wordDetails.length ? (
          <Flex fontSize="14px" w={[380, 480, 700, 800]} gap={"2"}>
            <Text opacity={"60%"} fontWeight="bold">
              By:
            </Text>
            <Link
              href="https://github.com/LisandraFerraz"
              isExternal
              textDecoration={"underline"}
            >
              Lisandra Ferraz
            </Link>
          </Flex>
        ) : (
          <></>
        )}
      </Flex>
    </ThemeProvider>
  );
}
