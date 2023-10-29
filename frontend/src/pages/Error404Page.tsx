import React from "react";
import { useTranslation } from "react-i18next";
import { Error } from "@src/components/Error/Error";
import { PageTitle } from "@src/components/common/PageTitle/PageTitle";
import error404 from "@src/assets/images/error404.svg";

const Error404Page: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t("common.clientError")}</PageTitle>
      <Error img={error404} msg={t("error404.notFound")} />
    </>
  );
};

export default Error404Page;
