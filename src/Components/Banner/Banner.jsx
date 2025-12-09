import { useState, useEffect } from "react";
import axios from "../../Utils/axios";
import requests from "../../Utils/requests";
import "./banner.css";
import netflixLogo from "../../assets/images/Netflix_2015_logo.svg.png";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const Banner = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
const [movie, setMovie] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={`header-container ${scrolled ? "scrolled" : ""}`}>
        <div className="netflix-logo">
          <ul>
            <li>
              <img src={netflixLogo} alt="Netflix logo" />
            </li>
          </ul>
        </div>
        <div className="lists-left-side">
          <ul>
            <li>
              <input className="search-input" type="text" placeholder="Search Movie"/>
            </li>
            <li className="notification">
              <NotificationsNoneIcon className="notification-icon" />
              <button className="notification-button">3</button>
            </li>
            <li>
              <AccountBoxIcon />
            </li>
            <li>
              <ArrowDropDownIcon />
            </li>
          </ul>
        </div>
      </div>
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner_fadeBottom" />
      <div className="list-container">
        <button>Originals</button>
        <button>Top Rated</button>
        <button>Romance</button>
        <button>TV Shows</button>
        <button>Documentaries</button>
        <button>Trending</button>
        <button>Action</button>
        <button>Comedy</button>
        <button>Horror</button>
      </div>
    </div>
  );
};
export default Banner;
