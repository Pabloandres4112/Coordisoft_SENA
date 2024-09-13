import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import { FaBox, FaWrench, FaHammer, FaTools, FaCut } from 'react-icons/fa'; // Usa iconos alternativos
import { TbShovel } from "react-icons/tb";
import { GiDrill } from "react-icons/gi";
import { LuUtensilsCrossed } from "react-icons/lu";
function HomePage() {
  const cards = [
    { title: 'Consumibles', icon: <FaBox className='text-3xl' />, description: ['Sede 1', 'Área 1', 'Centro 1'], color: 'bg-yellow-100', borderColor: 'border-yellow-400', link: '/areas' },
    { title: 'Herramientas de mano', icon: <FaWrench className='text-3xl' />, description: ['Sede 2', 'Área 2', 'Centro 2'], color: 'bg-green-100', borderColor: 'border-green-400', link: '/areas' },
    { title: 'Martillo', icon: <FaHammer className='text-3xl' />, description: ['Sede 3', 'Área 3', 'Centro 3'], color: 'bg-red-100', borderColor: 'border-red-400', link: '/sedes' },
    { title: 'Taladro', icon: <GiDrill className='text-3xl' />, description: ['Sede 4', 'Área 4', 'Centro 4'], color: 'bg-blue-100', borderColor: 'border-blue-400', link: '/sedes' },
    { title: 'Cuchilla', icon: <LuUtensilsCrossed className='text-3xl' />, description: ['Sede 5', 'Área 5', 'Centro 5'], color: 'bg-purple-100', borderColor: 'border-purple-400', link: '/areas' },
    { title: 'Pala', icon: <TbShovel className='text-3xl' />, description: ['Sede 6', 'Área 6', 'Centro 6'], color: 'bg-orange-100', borderColor: 'border-orange-400', link: '/sedes' },
  ];

  return (
    <>
      <main className='w-full px-7'>
        <div className='flex flex-wrap justify-center gap-6'>
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className={`bg-white ${card.color} border ${card.borderColor} shadow-lg rounded-lg p-6 w-full md:w-1/2 lg:w-1/3 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:${card.color} hover:border-${card.borderColor.split('-')[1]}`}
            >
              <div className='flex items-center justify-between'>
                <h2 className='text-xl font-bold'>{card.title}</h2>
                {card.icon}
              </div>
              {card.description.map((desc, idx) => (
                <p key={idx} className={idx === 0 ? 'mt-4' : ''}>{desc}</p>
              ))}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export default HomePage;
