"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const TermsAndConditions = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{t("terms_and_conditions")}</h1>

      <h2 className="text-xl font-semibold mb-4">{t("privacy_policy")}</h2>
      <p>{t("privacy_details")}</p>

      <h2 className="text-xl font-semibold mb-4">{t("intellectual_property")}</h2>
      <p>{t("intellectual_property_details")}</p>

      <h2 className="text-xl font-semibold mb-4">{t("content_ownership")}</h2>
      <p>{t("content_ownership_details")}</p>

      <h2 className="text-xl font-semibold mb-4">{t("third_party_links_cookies")}</h2>
      <p>{t("third_party_links_cookies_details")}</p>

      <h2 className="text-xl font-semibold mb-4">{t("website_usage")}</h2>
      <p>{t("website_usage_details")}</p>

      <h2 className="text-xl font-semibold mb-4">{t("ordering_availability")}</h2>
      <p>{t("ordering_availability_details")}</p>

      <h2 className="text-xl font-semibold mb-4">{t("payment_terms")}</h2>
      <p>{t("payment_terms_details")}</p>

      <h2 className="text-xl font-semibold mb-4">{t("return_exchange_policy")}</h2>
      <p>{t("return_exchange_policy_details")}</p>

      <h2 className="text-xl font-semibold mb-4">{t("modification_of_terms")}</h2>
      <p>{t("modification_of_terms_details")}</p>

      <h2 className="text-xl font-semibold mb-4">{t("disputes")}</h2>
      <p>{t("disputes_details")}</p>

      <h2 className="text-xl font-semibold mb-4">{t("contact_us")}</h2>
      <p>{t("contact_details")}</p>
      <p>{t("phone")}: 01273000054</p>
      <p>{t("email")}: info@coffeepointegy.com</p>
    </div>
  );
};

export default TermsAndConditions;
