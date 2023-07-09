import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Router from "./Router";

const theme = extendTheme({
  fonts: {
    heading: `'Noto Sans KR', sans-serif`,
    body: `'Noto Sans KR', sans-serif`,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <Router />
  </ChakraProvider>
);
