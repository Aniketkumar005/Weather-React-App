
import React from "react";

export default function TimeAndLocation({ weather: { formattedLocalTime, name, country } }) {

  if (!formattedLocalTime || !name || !country) {
  
    return (
      <div className="flex items-center justify-center my-6">
          
        <p className="text-xl font-medium">Loading location...</p>
        
      </div>
    );
    
  }

  return (
  
    <div>
        
  <div className="flex items-center justify-center my-4">
    <p className="text-base md:text-xl lg:text-2xl font-medium">
      {formattedLocalTime}
    </p>
  </div>
  <div className="flex items-center justify-center my-3">
    <p className="text-lg md:text-2xl lg:text-3xl font-semibold">
      {`${name}, ${country}`}
    </p>
  </div>
  
</div>

  );
}

