import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AboutText() {
  const { t } = useTranslation();

  return (
    <div className="flex container p-5 md:flex-row flex-col gap-12  ">
      <div className="flex flex-col justify-center gap-7 items-start  ">
        <div className="text-3xl md:text-3xl font-bold ">
          {t('whoWeAreTitle')}
        </div>
        <div className="text-[17px]">
          {t('whoWeAreText')}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-7 items-start ">
        <div className="text-3xl md:text-3xl font-bold">
          {t('aSweetStoryTitle')}
        </div>
        <div className="text-base md:text-lg">
          {t('aSweetStoryText')}
        </div>
      </div>
    </div>
  );
}
