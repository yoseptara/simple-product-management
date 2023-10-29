import React from "react";
import { useTranslation } from "react-i18next";
import { Error } from "@src/components/Error/Error";
import { PageTitle } from "@src/components/common/PageTitle/PageTitle";
import serverError from "@src/assets/images/server-error.svg";

const ServerErrorPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t("common.serverError")}</PageTitle>
      <Error img={serverError} msg={t("serverError.main")} />
    </>
  );
};

export default ServerErrorPage;
