import React from "react";
import { ConfigProvider } from "antd";
import { HelmetProvider } from "react-helmet-async";
import enUS from "antd/lib/locale/en_US";
import GlobalStyle from "./styles/GlobalStyle";
import "typeface-montserrat";
import "typeface-lato";
import { AppRouter } from "./components/router/AppRouter";

const App: React.FC = () => {
  return (
    <>
      <meta name="theme-color" />
      <GlobalStyle />
      <HelmetProvider>
        <ConfigProvider locale={enUS}>
          <AppRouter />
        </ConfigProvider>
      </HelmetProvider>
    </>
  );
};

export default App;
