import React from 'react'
import LogoImage from '../../assets/412611195_366748019231192_5001060050455103467_n-removebg-preview 1.png'
import { Link } from 'react-router-dom'

export default function Logo({ d="relative", top="top-[-40px]", w="w-20" ,h="w-24"}) {
  return (
    <div className={`${d} ${top}`}>
      <Link to="/" className='w-full'>
        <img src={LogoImage} alt="Logo" className={` ${w} ${h} `} />
      </Link>
    </div>
  )
}
