import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.less";
import "virtual:uno.css";
import { ConfigProvider, ConfigProviderProps } from "antd";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";

import "dayjs/locale/zh-cn";
import Router from "./router/router.tsx";

type Locale = ConfigProviderProps["locale"];
dayjs.locale("zh-cn");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider locale={zhCN as Locale}>
      <BrowserRouter>
        <Router></Router>
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
);
