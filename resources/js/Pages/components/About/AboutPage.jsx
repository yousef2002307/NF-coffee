import React from 'react';
import { useTranslation } from 'react-i18next';  
import Image from '../../assets/4.png';

export default function AboutPage({ flexRow, titleKey, decKey, bg, text }) {
  const { t } = useTranslation();  

  return (
    <div className={`${bg} h-full flex  flex-col ${flexRow} gap-12 justify-between`}>
      <div className="flex flex-col items-start container  md:px-24 px-2 py-2 gap-7 w-full md:w-[40%]">
        <div className={`${text}  font-bold`}>
          <p>{t(titleKey)}</p>
        </div>
        <div className=" text-lg">{t(decKey)}</div>
      </div>
      <div className="w-full md:w-[50%]">
        <img className="object-cover h-[400px] md:h-[500px] rounded-xl w-full" src={Image} alt={t(titleKey)} />
      </div>
    </div>
  );
}
