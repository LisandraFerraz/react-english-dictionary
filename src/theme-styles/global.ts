import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        background: ${(props: any) => props.theme.colors.background};
        color: ${(props: any) => props.theme.colors.text};
    }
    input{
        background: ${(props: any) => props.theme.colors.secondary};
        color: ${(props: any) => props.theme.colors.text};
        border: ${(props: any) => props.theme.colors.border};
    }
     option{
        background: ${(props: any) => props.theme.colors.background} !important;
    }`;
