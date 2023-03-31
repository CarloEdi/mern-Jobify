import React, { useContext } from "react";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link, Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Landing = () => {
  const { user } = useContext(AppContext);
  return (
    <>
      {user && <Navigate to="/" />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          <div className="info">
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              Air plant readymade ramps sus hella before they sold out
              asymmetrical migas keytar etsy green juice. Ennui chambray
              cold-pressed banjo kogi locavore. Man braid asymmetrical poutine
              tumeric kinfolk viral shaman small batch kogi enamel pin
              skateboard.
            </p>
            <Link to="/register">
              <button className="btn btn-hero">Login/Register</button>
            </Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </Wrapper>
    </>
  );
};

export default Landing;
