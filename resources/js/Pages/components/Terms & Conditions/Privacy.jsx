"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{t("privacy_policy")}</h1>
      <h2 className="text-xl font-semibold mb-4">{t("commitment_to_privacy")}</h2>
      <p>{t("information_we_collect")}</p>
      <ul className="ml-6 list-disc mb-4">
        <li><strong>{t("personal_information")}</strong></li>
        <li><strong>{t("automatic_information")}</strong></li>
      </ul>
      <h2 className="text-xl font-semibold mb-4">{t("how_we_use_information")}</h2>
      <ul className="ml-6 list-disc mb-4">
        {t("use_purposes", { returnObjects: true }).map((purpose, index) => (
          <li key={index}>{purpose}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-4">{t("how_we_protect_information")}</h2>
      <p>{t("information_protection")}</p>
      <h2 className="text-xl font-semibold mb-4">{t("disclosure_of_information")}</h2>
      <ul className="ml-6 list-disc mb-4">
        {t("disclosure_scenarios", { returnObjects: true }).map((scenario, index) => (
          <li key={index}>{scenario}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-4">{t("rights_and_choices")}</h2>
      <p>{t("rights_details")}</p>
      <p>{t("opt_out")}</p>
      <h2 className="text-xl font-semibold mb-4">{t("account_deletion")}</h2>
      <p>{t("delete_account_instructions")}</p>
      <h2 className="text-xl font-semibold mb-4">{t("policy_updates")}</h2>
      <p>{t("update_details")}</p>
      <h2 className="text-xl font-semibold mb-4">{t("contact_us")}</h2>
      <p>{t("contact_details")}</p>
      <p>{t("phone")}: 01273000054</p>
      <p>{t("email")}: info@coffeepointegy.com</p>
      <p>{t("facebook_app_management")}</p>
    </div>
  );
};

export default PrivacyPolicy;
