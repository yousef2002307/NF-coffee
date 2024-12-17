import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CategoryCard = ({ name, description, icon, status }) => {
  const { t } = useTranslation();

  
  const isComingSoon = status === t('status');

  return (
    <div
      className={`relative p-4 flex flex-col justify-center items-center gap-10 rounded-lg border ${
        isComingSoon ? 'bg-gray-200 shadow-lg' : 'bg-white'
      } shadow-md`}
    >
      {isComingSoon && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <span className="text-white text-lg font-bold">{t('status')}</span>
        </div>
      )}
      <div>
        <h3
          className={`mt-2 text-lg text-left font-semibold ${
            isComingSoon ? 'opacity-50' : ''
          }`}
        >
          {name}
        </h3>
        <p
          className={`text-sm text-left text-[#577260] ${
            isComingSoon ? 'opacity-50' : ''
          }`}
        >
          {description}
        </p>
      </div>
      <div className={`text-5xl ${isComingSoon ? 'opacity-50' : ''}`}>
        {icon}
      </div>
     <Link to="/Menu" className="mt-4 w-[70%] p-2 bg-orange-500 text-white rounded-[10px] hover:bg-orange-600 transition duration-200">  <button >
      {t('btn')}
      </button></Link> 
    </div>
  );
};

const CategoriesSection = () => {
  const { t } = useTranslation();

  const categories = [
    {
      name: t('categories.specialCoffee.name'),
      description: t('categories.specialCoffee.description'),
      status: t('categories.specialCoffee.status'),
      icon: '☕',
    },
    {
      name: t('categories.desserts.name'),
      description: t('categories.desserts.description'),
      status: t('categories.desserts.status'),
      icon: '🍰',
    },
    {
      name: t('categories.beverages.name'),
      description: t('categories.beverages.description'),
      status: t('categories.beverages.status'),
      icon: '🥤',
    },
    {
      name: t('categories.salad.name'),
      description: t('categories.salad.description'),
      status: t('categories.salad.status'),
      icon: '🥗',
    },
  ];

  return (
    <div className="text-center my-10 py-10">
      <h2 className="text-3xl font-semibold mb-6">{t('categories.heading')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-4 max-w-7xl mx-auto">
        {categories.map((category) => (
          <CategoryCard key={category.name} {...category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
