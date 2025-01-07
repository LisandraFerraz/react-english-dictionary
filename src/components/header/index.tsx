import {
  Box,
  Divider,
  Flex,
  Image,
  Select,
  Spacer,
  Stack,
  Switch,
} from "@chakra-ui/react";
import "./styles.scss";

import bookIcon from "./../../assets/icons/book_icon.svg";
import darkbBookIcon from "./../../assets/icons/dark_book_icon.svg";
import moonIcon from "./../../assets/icons/moon_icon.svg";
import sunIcon from "./../../assets/icons/sun_icon.svg";
import { useContext, useEffect, useState } from "react";

import { ThemeContext } from "styled-components";

interface Props {
  toggleTheme(): void;
}

export default function AppHeader(props: Props) {
  const { colors, title } = useContext(ThemeContext);

  let [fontType, setFontType] = useState("");

  function switchFont(e: any) {
    setFontType(String(e.target.value));
    if (fontType === "noserif") {
      document.body.style.fontFamily = "Merriweather";
    } else {
      document.body.style.fontFamily = "Open Sans";
    }
  }

  useEffect(() => {
    document.body.style.fontFamily = "Merriweather";
  }, []);

  return (
    <Flex w={[380, 480, 700, 800]} alignItems="center" gap="2">
      <Box>
        {colors.background == "#fff" ? (
          <Image src={bookIcon} boxSize="36px" />
        ) : (
          <Image src={darkbBookIcon} boxSize="36px" />
        )}
      </Box>
      <Spacer />
      <Stack direction="row">
        <Flex gap="20px">
          <Select
            focusBorderColor="transparent"
            border="none"
            minWidth="80px"
            maxWidth="fit-content"
            cursor={"pointer"}
            defaultValue={"serif"}
            onChange={(e) => switchFont(e)}
          >
            <option value="serif">Serif</option>
            <option value="noserif">Non Serif</option>
          </Select>
          <Divider orientation="vertical" />
          <Flex alignItems="center" gap="3">
            <Switch
              colorScheme="purple"
              onChange={props.toggleTheme}
              checked={title == "dark"}
            />
            {colors.background == "#fff" ? (
              <Image src={moonIcon} boxSize="22px" />
            ) : (
              <Image src={sunIcon} boxSize="22px" />
            )}
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
}
