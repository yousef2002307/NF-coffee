import React from 'react';
import Image1 from '../../assets/5.png';
import Image2 from '../../assets/6.png';
import Image3 from '../../assets/7.png';
import Image4 from '../../assets/8.png';
import Image5 from '../../assets/9.png';

const ExperienceSection = () => {
  return (
    <section className="container h-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
        <div className="grid grid-rows-2 gap-3">
          <img src={Image1} alt="Experience 1" className="rounded-lg shadow-lg w-full h-auto object-cover" />
          <img src={Image2} alt="Experience 2" className="rounded-lg shadow-lg w-full h-auto object-cover" />
        </div>

    
        <div className="md:translate-y-[-50px] row-span-2">
          <img src={Image3} alt="Experience 3" className="rounded-lg shadow-lg w-full h-auto object-cover" />
        </div>

      
        <div className="grid grid-rows-2 gap-3">
          <img src={Image4} alt="Experience 4" className="rounded-lg shadow-lg w-full h-auto object-cover" />
          <img src={Image5} alt="Experience 5" className="rounded-lg shadow-lg w-full h-auto object-cover" />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
