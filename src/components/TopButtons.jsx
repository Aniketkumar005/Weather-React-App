
import React from "react";

export default function TopButtons({setQuery}){

const cities = [
    {
      id: 1,
      name: "London",
    },
    {
      id: 2,
      name: "Sydney",
    },
    {
      id: 3,
      name: "Tokyo",
    },
    {
      id: 4,
      name: "Toronto",
    },
    {
      id: 5,
      name: "Paris",
    },
  ];

    return (
        
        <div className="flex flex-wrap items-center justify-around my-8 gap-4">
            
  {cities.map((city) => (
  
    <button
      key={city.id}
      className="text-lg md:text-xl lg:text-2xl font-semibold hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in"
      onClick={() => setQuery({ q: city.name })}
    >
    
      {city.name}
      
    </button>
    
  ))}
  
</div>

        
    )
}