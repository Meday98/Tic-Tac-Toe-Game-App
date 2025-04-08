import { createContext, useContext, useEffect, useState } from "react";
import calcBestMove, { calcWinner } from "../helpers/calcSquarse";
import { ModalContext } from "./ModalContext";

const GameContext = createContext();

const GameState = (props) => {
  const [playMode, setPlayMode] = useState("user"); // user || cpu
  const [screen, setScreen] = useState("start"); // start || game
  const [activeUser, setActiveUser] = useState("x"); // x || o
  const [squares, setSquares] = useState(new Array(9).fill(""));
  const [xnext, setXnext] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winnerLine, setWinnerLine] = useState(null);
  const [ties, setTies] = useState({ x: 0, o: 0 });

  const { showModal, setModalMode, hideModal } = useContext(ModalContext);

  useEffect(() => {
    checkNoWinner();
    const currentUser = xnext ? "o" : "x";
    if (playMode === "cpu" && currentUser !== activeUser && !winner) {
      cpuNextMove(squares);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xnext, winner, screen]);

  const changePlayMode = (mode) => (setPlayMode(mode), setScreen("game"));

  const handleSquareClick = (ix) => {
    if (squares[ix] || winner) {
      return;
    }
    const currentUser = xnext ? "o" : "x";
    if (playMode === "cpu" && currentUser !== activeUser) {
      return;
    }
    let ns = [...squares];
    ns[ix] = !xnext ? "x" : "o";
    setSquares(ns);
    setXnext(!xnext);
    checkWinner(ns);
  };

  const checkWinner = (ns) => {
    const isWinner = calcWinner(ns);
    if (isWinner) {
      setWinner(isWinner.winner);
      setWinnerLine(isWinner.line);

      // Update Ties
      const ti = { ...ties };
      ti[isWinner.winner] += 1;
      setTies(ti);

      showModal();
      setModalMode("winner");
    }
  };
  const handleReset = () => {
    setSquares(new Array(9).fill(""));
    setXnext(false);
    setWinner(null);
    setWinnerLine(null);
    setActiveUser("x");
    hideModal();
    setScreen("start");
  };

  const handleNextRound = () => {
    setSquares(new Array(9).fill(""));
    setXnext(winner === "x");
    setWinner(null);
    setWinnerLine(null);
    hideModal();
  };

  const checkNoWinner = () => {
    const moves = squares.filter((sq) => sq === "");
    if (moves.length === 0) {
      setWinner("no");
      showModal();
      setModalMode("winner");
    }
  };

  const cpuNextMove = (sqrs) => {
    let bestmove = calcBestMove(sqrs, activeUser === "x" ? "o" : "x");
    let ns = [...squares];
    ns[bestmove] = !xnext ? "x" : "o";
    setSquares(ns);
    setXnext(!xnext);
    checkWinner(ns);
  };
  return (
    <GameContext.Provider
      value={{
        screen,
        activeUser,
        squares,
        xnext,
        ties,
        winner,
        winnerLine,
        handleReset,
        handleNextRound,
        handleSquareClick,
        setActiveUser,
        changePlayMode,
      }}>
      {props.children}
    </GameContext.Provider>
  );
};

export { GameContext, GameState };
