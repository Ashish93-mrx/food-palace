import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import RestaurantCard from './RestaurantCard';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

function TopRestaurant(props) {
  const [scrollX, setScrollX] = useState(0);
  const containerRef = useRef(null);
  const { trg } = props;
  const title = trg.header?.title;
  const topResList = trg.gridElements?.infoWithStyle?.restaurants;

  const CARD_WIDTH = 276; 

  const handleNext = () => {
    const maxScroll = (topResList?.length * CARD_WIDTH) - containerRef.current.offsetWidth;
    setScrollX(prev => Math.min(prev + CARD_WIDTH, maxScroll));
  };

  const handlePrev = () => {
    setScrollX(prev => Math.max(prev - CARD_WIDTH, 0));
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between items-center mt-5">
        <h1 className="font-bold text-2xl">{title}</h1>
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            className={`w-9 h-9 flex items-center justify-center rounded-full 
              ${scrollX <= 0 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-800'}`}
          >
            <FiArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className={`w-9 h-9 flex items-center justify-center rounded-full 
              ${(scrollX + containerRef?.current?.offsetWidth >= topResList?.length * CARD_WIDTH)
                ? 'bg-gray-100 text-gray-400'
                : 'bg-gray-200 text-gray-800'}`}
          >
            <FiArrowRight />
          </button>
        </div>
      </div>

      <div
        className="flex transition-transform duration-300 mt-4"
        style={{ transform: `translateX(-${scrollX}px)` }}
        ref={containerRef}
      >
        {topResList?.map((i) => (
          <Link to={`/restaurants/${i?.info?.id}`} key={i?.info?.id}>
            <RestaurantCard resData={i.info} />
          </Link>
        ))}
      </div>

      <hr className="border mt-10" />
    </div>
  );
}

export default TopRestaurant;
