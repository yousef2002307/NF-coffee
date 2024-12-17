import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { CiLocationOn } from 'react-icons/ci';
import { BsClockFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const MyMap = ({ flex, w, wf , position , address}) => {
 
const {t}=useTranslation()
  const customIcon = new L.Icon({
    iconUrl: "https://www.freeiconspng.com/uploads/blue-location-icon-png-19.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className={`${flex} flex justify-around gap-5`}>
      <div className={`${w} flex flex-col gap-5`}>
        <div className='bg-[#57726026] p-1 w-full md:w-1/2'>
          <p>{t("Elmansoura Branch")}</p>
        </div>
        <div className='flex text-[#577260] justify-start items-center gap-2'>
          <FaPhone />
          <p>{t("Ph")} +20 1273000054</p>
        </div>
        <div className='flex text-[#577260] justify-start items-center gap-2'>
          <MdEmail />
          <p>{t("em")}: info@coffepointegy.com</p>
        </div>
        <div className='flex text-[#577260] justify-start items-center gap-2'>
          <CiLocationOn />
          <p>{t("ad")} {address}</p>
        </div>
        <div className='flex text-[#577260] justify-start items-center gap-2'>
          <BsClockFill />
          <p>{t("h")} </p>
        </div>
      </div>

      <div className={`${wf}`}>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "300px", width: "100%", borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={customIcon}>
            <Popup>
              
            </Popup>
          </Marker>
          <ZoomControl position="bottomleft" />
        </MapContainer>
      </div>
    </div>
  );
};

export default MyMap;
