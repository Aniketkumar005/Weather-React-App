
import {FaThermometerEmpty} from "react-icons/fa";
import {BiSolidDropletHalf} from "react-icons/bi";
import {FiWind} from "react-icons/fi";
import {GiSunrise, GiSunset} from "react-icons/gi";
import {MdKeyboardArrowUp, MdKeyboardArrowDown} from "react-icons/md";

export default function TemperatureAndDetails({
 weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
    units, 
}){

const verticalDetails=[
    {
        id: 1, 
        Icon: FaThermometerEmpty, 
        title: "Real Feel", 
        value: `${feels_like.toFixed()} °`, 
    }, 
    {
        id: 2, 
        Icon: BiSolidDropletHalf, 
        title: "Humidity", 
        value: `${humidity.toFixed()} %` 
    }, 
    {
        id: 3, 
        Icon: FiWind, 
        title: "Wind", 
        value: `${speed.toFixed()} ${units == 'metric' ? 'km/h' : 'm/s'}` , 
    }, 
];

const horizontalDetails=[
    {
        id: 1, 
        Icon: GiSunrise, 
        title: "Sunrise", 
        value: sunrise, 
    }, 
    {
        id: 2, 
        Icon: GiSunset, 
        title: "Sunset", 
        value: sunset, 
    }, 
    {
        id: 3, 
        Icon: MdKeyboardArrowUp, 
        title: "High", 
        value: `${temp_max.toFixed()} °`, 
    }, 
     {
        id: 4, 
        Icon: MdKeyboardArrowDown, 
        title: "Low", 
        value: `${temp_min.toFixed()} °`, 
    }, 
];

    return (
     <div>
         
      <div className="flex items-center justify-center py-6 text-2xl text-cyan-300">     
        <p className="font-semibold">{details}</p>
      </div> 
        
       <div className="flex flex-col md:flex-row items-center justify-between py-3">
           
         <img src={icon} alt="weather icon" className="w-30 ml-8" />
         
         <p className="text-5xl font-semibold ml-4">{`${temp.toFixed()} °${units === "metric" ? "C" : "F"}`}
         </p>
         
         <div className="flex flex-col space-y-3 items-start"> 
             
          {verticalDetails.map(({ id, Icon, title, value }) => ( 
          
          <div key={id} className="flex font-semibold text-sm items-center justify-center" > 
           <Icon size={18} className="mr-4 text-yellow-500" aria-label={title} />
              {`${title}`}
              
           <span className="font-semibold ml-4">{value}
           </span> 
           
           </div> 
         ))} 
         
         </div> 
        
        </div>
      
      <div className="flex flex-row items-center justify-center space-x-10 text-sm py-8">
          
        {horizontalDetails.map(({ id, Icon, title, value }) => (
        
          <div key={id} className="flex flex-row items-center">
            <Icon size={40} className="text-500" aria-label={title} />
            <p className="font-semibold ml-2">
              {`${title}`} <span className="font-semibold ml-1">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
    );
}




