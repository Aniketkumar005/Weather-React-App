
import React from "react";

export default function Forecast({ title, data }) {

  if (!data || !Array.isArray(data)) {
    return <p>No forecast data available.</p>;
  }

  return (
  
    <div>
        
      <div className="flex items-center justify-start mt-6">
          
        <p className="font-semibold text-xl uppercase">{title}</p>
        
      </div>

      <hr className="my-10" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-between">
          
       {data.map((d, indx) => (
       
         <div
          key={indx}
          className="flex flex-col items-center justify-center text-center space-y-2">
          
         <p className="font-semibold text-sm md:text-base">{d.title}</p>
         
         <img src={d.icon} alt="weather icon" className="w-12 md:w-16" />
         
          <p className="font-semibold text-base">{`${d.temp.toFixed()} °`}</p>
          
       </div>
       
     ))}
     
   </div>

  </div>
    
  );
}
