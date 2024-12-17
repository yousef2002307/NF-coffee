import React from 'react'

import AboutPage from './AboutPage'
import AboutText from './AboutText'
import ExperienceSection from './ExperienceSection '
import { useTranslation } from 'react-i18next';
export default function About() {
    const { t } = useTranslation();
  return (
    <div className='flex flex-col  gap-28'>
    <AboutPage 
        bg="bg-[#086169] text-white" 
        text="text-center bg-[#577260] px-9 py-3 rounded-md text-3xl" 
        titleKey="coffePointTitle" 
        decKey="coffePointDescription"
         flexRow="md:flex-row"
      />
    
  <AboutText />
     
    
      <AboutPage 
        bg="bg-[#F2E9E0] text-black" 
        text="text-4xl" 
        titleKey="theOriginalTasteOfCoffeeTitle" 
        decKey="theOriginalTasteOfCoffeeDescription" 
        flexRow="md:flex-row-reverse"
      />

    <div className="text-center bg-[#086169]  text-white p-3">
    <p className="text-4xl font-bold">{t('moreThan5YearsExperience')}</p> 
        </div>
    <ExperienceSection/>
    </div>
  )
}
