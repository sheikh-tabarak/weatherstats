import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import MyWeatherSidebar from "./components/MyWeatherSidebar";
import axios from "axios";
import { BsFillSunFill, BsThermometerSun, BsWind } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { BiRefresh } from "react-icons/bi";
import { MdVisibility } from "react-icons/md";
import { LiaCompressArrowsAltSolid } from "react-icons/lia";
import WeatherStatsLogo from "./assets/WeatherStatsLogo.png";
import SunnyImage from "./assets/cloudy.jpeg";
import CopyrightBar from "./components/copyrightBar";

function App() {
  // State for Longitude and Latitude of User Location
  const [Longitude, setLongitude] = useState("");
  const [Latitude, setLatitude] = useState("");

  // Getting the location of User on each time he will load the Screen
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log(position.coords);

      console.log(
        "API Key : " + process.env.REACT_APP_MY_API_KEY_OPEN_WEATHER_MAP
      );
    });
  });

  function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log(position.coords);
    });
  }

  const [Loading, setLoading] = useState(false);
  const [EnteredCity, setEnteredCity] = useState();
  const [Data, setData] = useState({});
  const [error, seterror] = useState("");

  async function fetchTheWeatherofCity(e) {
    e.preventDefault();

    if (EnteredCity !== "") {
      setLoading(true);

      const mainUrl = `https://api.openweathermap.org/data/2.5/weather?q=${EnteredCity}&units=metric&appid=${process.env.REACT_APP_MY_API_KEY_OPEN_WEATHER_MAP}`;

      try {
        await axios.get(mainUrl).then((response) => {
          setData(response.data);
          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
        seterror(
          "Whoops, This is not fair, you didn't entered a valid city, Try again"
        );
      }

      setLoading(false);
    } else {
      seterror(
        "Dude! Search bar is empty yet, Enter a city to see the weather stats"
      );
    }
  }

  return (
    <>
      <section
        // style={{backgroundImage:SunnyImage}}
        className={"bg-cover h-[100%] w-full bg-[url('./assets/cloudy.jpeg')]"}
      >
        <div className=" lg:w-[69%]">
          <div className=" lg:pt-5 lg:px-5 w-full ">
            {/* Start coding here */}
            <div className="text-white font-sans  p-1 bg-[#00000050] backdrop-blur-lg lg:rounded-[10px]">
              <div className="sm:flex-col md:flex-row lg:flex-row items-center justify-between p-4 md:flex md:space-y-0 md:space-x-4">
                <div className="flex lg:w-1/5 justify-center">
                  <a href="/">
                    <img
                      className="w-[169px] mb-4 lg:mb-0 lg:w-[120px]"
                      src={WeatherStatsLogo}
                      alt=""
                    />
                  </a>
                </div>

                <div className="w-full lg:w-3/5 justify-center">
                  <form
                    onSubmit={fetchTheWeatherofCity}
                    id="dropdown-button"
                    data-dropdown-toggle="dropdown"
                    className="flex items-center"
                  >
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        value={EnteredCity}
                        onChange={(e) => {
                          seterror("");
                          setEnteredCity(e.target.value);
                        }}
                        type="text"
                        id="simple-search"
                        className={
                          error
                            ? "block w-full h-[50px] p-2 pl-10 text-md text-gray-900 border border-red-600 rounded-lg bg-gray-50 focus:ring-red-600 focus:border-red-600 "
                            : "block w-full h-[50px] p-2 pl-10 text-md text-gray-900 border border-[#F58733] rounded-lg bg-gray-50 focus:ring-[#F58733] focus:border-[#F58733] "
                        }
                        placeholder="Enter the name of city to check it's weather"
                        required=""
                      />
                    </div>
                  </form>

                  <div className="text-[11px] lg:text-md  pt-1 absolute text-red-600  text-sm font-semibold">
                    {error}
                  </div>
                </div>

                <div className="w-full lg:w-1/5">
                  <button
                    onClick={fetchTheWeatherofCity}
                    type="button"
                    className="mt-8 lg:mt-0 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80  duration-300 rounded-lg w-full py-[10px] hover:bg-[#F58733] bg-[#128DBB]"
                  >
                    Find the Weather
                  </button>
                </div>

                {/* </div> */}
              </div>
            </div>

            {/* <div className="flex flex-col items-center justify-center w-screen min-h-screen text-gray-700 p-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 "> */}
            {/* Component Start */}
            {/* <div className="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40"> */}
          </div>
          <div className="mt-5 lg:mt-0 max-w-screen-xl px-4 mx-auto lg:pt-5 lg:px-5 pb-5 w-full">
            {/* Start coding here */}
            <div className="text-white font-sans  pt-5 pb-14 px-2 lg:px-10 bg-[#00000050] backdrop-blur-lg rounded-[10px] ">
              <div className=" items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex justify-between">
                  <div>
                    <span className=" text-[20px] mt-1 font-bold">
                      Detailed Weather Stats
                    </span>
                  </div>
                  <div className="flex justify-end text-[35px] pb-2 text-[#FFFFFF]">
                    <a href="#">
                      <BiRefresh
                        onClick={fetchTheWeatherofCity}
                        className={Loading ? "animate-spin" : ""}
                      />
                    </a>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div>
                    <span className="font-semibold mt-1 ">
                      {Data.name ? Data.name : "Current Location"}{" "}
                      {/* {Data.weather ? Data.weather[0].id : ""} */}
                    </span>
                    <div className="text-6xl font-bold">
                      {Data.main ? Data.main.temp.toFixed() : "N/A"}°C
                    </div>
                  </div>

                  <div className="lg:flex lg:gap-x-10 ">
                    <div className="hidden lg:block">
                      <h3 className="font-semibold text-md">
                        {Data.main ? Data.weather[0].main : "Details"}
                      </h3>
                      <p>
                        {" "}
                        {Data.main
                          ? Data.weather[0].description
                          : "Weather Conditions"}
                      </p>
                    </div>

                    <div className="animate-pulse	 text-[40px] text-[#FACC15] ">
                      {Data.weather ? (
                        Data.weather[0].id >= 200 &&
                        Data.weather[0].id <= 232 ? (
                          <img
                            src="https://openweathermap.org/img/wn/11d@2x.png"
                            alt=""
                          />
                        ) : Data.weather[0].id >= 300 &&
                          Data.weather[0].id <= 321 ? (
                          <img
                            src="https://openweathermap.org/img/wn/09d@2x.png"
                            alt=""
                          />
                        ) : Data.weather[0].id >= 500 &&
                          Data.weather[0].id <= 531 ? (
                          <img
                            src="https://openweathermap.org/img/wn/09d@2x.png"
                            alt=""
                          />
                        ) : Data.weather[0].id >= 600 &&
                          Data.weather[0].id <= 622 ? (
                          <img
                            src="https://openweathermap.org/img/wn/13d@2x.png"
                            alt=""
                          />
                        ) : Data.weather[0].id >= 701 &&
                          Data.weather[0].id <= 781 ? (
                          <img
                            src="https://openweathermap.org/img/wn/13d@2x.png"
                            alt=""
                          />
                        ) : Data.weather[0].id == 800 ? (
                          <img
                            src="https://openweathermap.org/img/wn/01d@2x.png"
                            alt=""
                          />
                        ) : Data.weather[0].id >= 801 &&
                          Data.weather[0].id <= 804 ? (
                          <img
                            src="https://openweathermap.org/img/wn/02d@2x.png"
                            alt=""
                          />
                        ) : (
                          <img
                            src="https://openweathermap.org/img/wn/10d@2x.png"
                            alt=""
                          />
                        )
                      ) : (
                        <img
                          src="https://openweathermap.org/img/wn/10d@2x.png"
                          alt=""
                        />
                      )}
                      {/* <img src="https://openweathermap.org/img/wn/11d@2x.png" alt="" /> */}
                    </div>
                  </div>
                </div>

                <div className="text-[25px] flex md:flex-row lg:flex-row justify-between mt-4 bg-black rounded-[10px]  shadow-md  bg-opacity-[0.3] px-10 py-5">
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-lg">
                      {Data.main ? Data.main.feels_like.toFixed() : "N/A "}°C
                    </span>
                    <BsThermometerSun className="my-[5px]" />

                    <span className="font-semibold mt-1 text-sm">
                      Feels Like
                    </span>
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

                    <span className="font-semibold mt-1 text-sm">
                      Wind Speed
                    </span>
                  </div>

                  <div className="hidden lg:flex lg:flex-col items-center">
                    <span className="font-semibold text-lg">
                      {Data.main ? Data.visibility : "N/A "} M
                    </span>
                    <MdVisibility className="my-[5px]" />
                    <span className="font-semibold mt-1 text-sm">
                      Visibility
                    </span>
                  </div>

                  <div className="hidden lg:flex lg:flex-col items-center">
                    <span className="font-semibold text-lg">
                      {Data.main ? Data.main.pressure : "N/A "} Pa
                    </span>
                    <LiaCompressArrowsAltSolid className="my-[5px]" />
                    <span className="font-semibold mt-1 text-sm">Pressure</span>
                  </div>
                </div>

                <div className="lg:hidden">
                  <h3 className="font-semibold text-md">
                    {Data.main ? Data.weather[0].main : "Details"}
                  </h3>
                  <p>
                    {" "}
                    {Data.main
                      ? Data.weather[0].description
                      : "Weather Conditions"}
                  </p>
                </div>

                {/* </div> */}
              </div>
            </div>
<div className="hidden lg:block">
    <CopyrightBar />
</div>
          
          </div>
        </div>


        <MyWeatherSidebar Latitude={Latitude} Longitude={Longitude} />
        <div className="block lg:hidden">
    <CopyrightBar />
</div>
       
      </section>
    </>
  );
}

export default App;
