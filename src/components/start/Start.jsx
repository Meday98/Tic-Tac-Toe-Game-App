import React, { useContext } from "react";
import Xicon from "../icons/Xicon";
import Oicon from "../icons/Oicon";
import { GameContext } from "../../context/GameContext";

const Start = () => {
  const { activeUser, setActiveUser, changePlayMode } = useContext(GameContext);
  return (
    <div className="start">
      <div className="start__header">
        <Xicon />
        <Oicon />
      </div>
      <div className="card shadow-gray">
        <h1 className="text-lg">Pick Player 1's Mark</h1>
        <div className="start__players">
          <span
            className={activeUser === "x" ? "start__players--active" : ""}
            onClick={() => setActiveUser("x")}>
            <Xicon color={activeUser === "x" ? "dark" : "light"} />
          </span>
          <span
            className={activeUser === "o" ? "start__players--active" : ""}
            onClick={() => setActiveUser("o")}>
            <Oicon color={activeUser === "o" ? "dark" : "light"} />
          </span>
        </div>
        <p className="text-light">Remember: X Goes First</p>
      </div>
      <div className="start__btns">
        <button
          className="btn btn-yellow"
          onClick={() => changePlayMode("cpu")}>
          New Game (vs CPU)
        </button>
        <button className="btn btn-blue" onClick={() => changePlayMode("user")}>
          New Game (vs Player)
        </button>
      </div>
    </div>
  );
};

export default Start;
