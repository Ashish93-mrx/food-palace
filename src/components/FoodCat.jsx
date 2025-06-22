import { useState } from "react";
import { CON_URL } from "../utils/constants";
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';


function FoodCat({data = []}) {

    const [value, setValue] = useState(0);

    function handleNext() {
        value >= 124 ? "" : setValue((prev) => prev + 31);
    }

    function handlePrev() {
        value <= 0 ? "" : setValue((prev) => prev - 31);
    }

    return (
        <div className="">
            <div className='flex justify-between mt-5'>
                <h1 className="font-bold text-2xl">What's on your mind?</h1>
                <div className="flex gap-3">
                    <div
                        onClick={handlePrev}
                        className={
                            ` cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` +
                            (value <= 0 ? "bg-gray-100" : "bg-gray-200")
                        }
                    >
                          <span
                                className={`w-9 h-9 flex items-center justify-center rounded-full 
                                  ${value <=0 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-800'}`}
                              >
                                <FiArrowLeft />
                              </span>
                    </div>
                    <div
                        onClick={handleNext}
                        className={
                            ` cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` +
                            (value >= 124 ? "bg-gray-100" : "bg-gray-200")
                        }
                    >
                              <span
                                className={`w-9 h-9 flex items-center justify-center rounded-full 
                                  ${value >= 124 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-800'}`}
                              >
                                <FiArrowRight />
                              </span>
                    </div>
                </div>
            </div>

            <div
                style={{ translate: `-${value}%` }}
                className={`flex mt-4  duration-300 `}
            >
                {
                    data?.map((item) => (
                    
                    <img
                    key={item.id}
                        className="w-40 "
                        src={CON_URL + "/" + item?.imageId}
                        alt=""
                    />
                ))}
            </div>

            <hr className="border"/>
        </div>
    );
}

export default FoodCat;