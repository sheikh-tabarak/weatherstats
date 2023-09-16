import { BsFillSunFill, BsThermometerSun, BsWind } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { BiRefresh } from "react-icons/bi";
import React from "react";
import axios from "axios";
import { useState } from "react";
import FetchMyWeather from "../functions/Functions";
import { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import {AiOutlineClockCircle} from "react-icons/ai";
import {SlCalender} from "react-icons/sl";

export default function MyWeatherSidebar(props) {
  // Getting the location of User on each time he will load the Screen
  useEffect(() => {
    updateMyweather();
  }, [props.Longitude]);

  let newTime = new Date().toLocaleTimeString();
  let newDate = new Date().toLocaleDateString();

  const [time, settime] = useState(newTime);
  const [date, setdate] = useState(newDate);

  const UpdateTime = () => {
    let newTime = new Date().toLocaleTimeString();
    //   let newDate = new Date().toLocaleDateString();

    settime(newTime);
    //   setdate(newDate);
  };

  setInterval(UpdateTime, 1000);

  const [Data, setData] = useState({});

  const [LoadingMyW, setLoadingMyW] = useState(false);

  async function updateMyweather() {
    setLoadingMyW(true);

    const mainUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${props.Latitude}&lon=${props.Longitude}&units=metric&appid=${process.env.REACT_APP_MY_API_KEY_OPEN_WEATHER_MAP}`;

    try {
      await axios.get(mainUrl).then((response) => {
        // const Data = response.data;
        setData(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }

    setLoadingMyW(false);
  }

  return (
    <div className="text-white font-sans lg:fixed right-5 inset-y-5 pt-5 pb-10 px-10 bg-[#00000050] backdrop-blur-lg rounded-[10px] lg:w-[30%]">
      <div className="flex">
        <div className="flex flex-col"> </div>
      </div>
      <div className="flex justify-between">
        <div>
          <div className="flex gap-x-3">
            <span className=" text-[20px] mt-1 font-bold">My Weather </span>
            <span className="text-green-400 animate-pulse">
              <GoDotFill />
            </span>
          </div>
        </div>

        <div className="flex justify-end text-[35px] pb-2 text-[#FFFFFF]">
          <a href="#">
            <BiRefresh
              onClick={updateMyweather}
              className={LoadingMyW ? "animate-spin" : ""}
            />
          </a>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <span className="font-semibold mt-1 ">
            {Data.name ? Data.name : "Current Location"}{" "}
          </span>

          <div className="text-6xl font-bold">
            {Data.main ? Data.main.temp.toFixed() : "N/A"}°C
          </div>
        </div>
        <div className="animate-pulse	 text-[40px] text-[#FACC15] ">
          {Data.weather ? (
            Data.weather[0].id >= 200 && Data.weather[0].id <= 232 ? (
              <img src="https://openweathermap.org/img/wn/11d@2x.png" alt="" />
            ) : Data.weather[0].id >= 300 && Data.weather[0].id <= 321 ? (
              <img src="https://openweathermap.org/img/wn/09d@2x.png" alt="" />
            ) : Data.weather[0].id >= 500 && Data.weather[0].id <= 531 ? (
              <img src="https://openweathermap.org/img/wn/09d@2x.png" alt="" />
            ) : Data.weather[0].id >= 600 && Data.weather[0].id <= 622 ? (
              <img src="https://openweathermap.org/img/wn/13d@2x.png" alt="" />
            ) : Data.weather[0].id >= 701 && Data.weather[0].id <= 781 ? (
              <img src="https://openweathermap.org/img/wn/13d@2x.png" alt="" />
            ) : Data.weather[0].id == 800 ? (
              <img src="https://openweathermap.org/img/wn/01d@2x.png" alt="" />
            ) : Data.weather[0].id >= 801 && Data.weather[0].id <= 804 ? (
              <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="" />
            ) : (
              <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="" />
            )
          ) : (
            <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="" />
          )}
          {/* <img src="https://openweathermap.org/img/wn/11d@2x.png" alt="" /> */}
        </div>
      </div>

      <div className="text-[20px]  flex justify-between mt-4 bg-black rounded-[10px]  shadow-md  bg-opacity-[0.3] p-5">
        <div className="flex flex-col items-center">
          <span className="font-semibold text-lg">
            {Data.main ? Data.main.feels_like.toFixed() : "N/A "}°C
          </span>
          <BsThermometerSun className="my-[5px]" />

          <span className="font-semibold mt-1 text-sm">Feels Like</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-semibold text-lg">
            {Data.main ? Data.main.humidity : "N/A "}%
          </span>
          <WiHumidity className="my-[5px]" />
          <span className="font-semibold mt-1 text-sm">Humidity</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-semibold text-lg">
            {Data.wind ? Data.wind.speed : "N/A "}MPH
          </span>
          <BsWind className="my-[5px]" />

          <span className="font-semibold mt-1 text-sm">Wind Speed</span>
        </div>
      </div>

      <div className="mt-4 bg-black rounded-[10px]  shadow-md   bg-opacity-[0.3] p-[15px]">
        <h3 className="font-semibold text-md">
          {Data.main ? Data.weather[0].main : "Details"}
        </h3>
        <p> {Data.main ? Data.weather[0].description : "Weather Conditions"}</p>
      </div>

      <div className="mt-4 bg-black rounded-[10px]  shadow-md   bg-opacity-[0.3] p-[15px]">
        <div className="font-semibold text-sm mb-2">Current Date & Time</div>

        <div className="flex gap-5 items-center">
          <div className="flex gap-3 items-center	">
            <AiOutlineClockCircle />
            {time}
          </div>

          <div className="flex gap-3 items-center	">
            <SlCalender />

            {date}
          </div>
        </div>

        {/* <h2>
         
                
                   | 
                </h2> */}
      </div>
    </div>
  );
}
