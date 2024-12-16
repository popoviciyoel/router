import React, { useState, useEffect } from "react";
import { useGameBuilder } from "../build/GameBuilderProvider";
import Image from "next/image";
const ClickTheTarget = () => {
  const { state } = useGameBuilder();

  const [gameMode, setGameMode] = useState(2); // Default mode

  const [targetPosition, setTargetPosition] = useState({
    x: 100,
    y: 100,
    size: 50,
  });
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30); // 30 seconds game duration
  const [targetSize, setTargetSize] = useState(Math.max(50 - score * 2, 20)); // Minimum size: 20px
  const [shrinkTargetOn, setShrinkTargetOn] = useState(false);
  const [velocity, setVelocity] = useState({
    x: 10 + (Math.random() - 0.5) * 10,
    y: 10 + (Math.random() - 0.5) * 10,
  });

  useEffect(() => {
    const targetOptions = state?.options;
    console.log('targetOptions', targetOptions)
    setShrinkTargetOn(targetOptions?.shrinkMode === "On");
    setTimer(targetOptions?.time)
    setGameMode(targetOptions?.type === "Discrete" ? 1 : 2)
    setVelocity({
      x: 10 + (Math.random() - 0.5) * targetOptions?.speed * 40,
      y: 10 + (Math.random() - 0.5) * targetOptions?.speed * 40,
    })
  }, [state?.options]);

  useEffect(() => {
    // Timer countdown
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const moveTargetMode1 = () => {
    const gameArea = document.getElementById("gameArea");
    if (!gameArea) return;

    const { width, height } = gameArea.getBoundingClientRect();
    const newX = Math.random() * (width - 50); // Subtract target size
    const newY = Math.random() * (height - 50);
    setTargetPosition({ x: newX, y: newY });
  };

  const moveTargetMode2 = () => {
    setTargetPosition((prev) => {
      let newVelocity = { ...velocity }; // Copy the current velocity
      let newX = prev.x + newVelocity.x;
      let newY = prev.y + newVelocity.y;

      // Reverse direction if it hits the boundaries
      if (newX <= 0 || newX >= 450) {
        newVelocity.x = -newVelocity.x;
        newX = Math.max(0, Math.min(450, newX)); // Clamp within bounds
      }

      if (newY <= 0 || newY >= 450) {
        newVelocity.y = -newVelocity.y;
        newY = Math.max(0, Math.min(450, newY)); // Clamp within bounds
      }

      setVelocity(newVelocity); // Update the velocity
      return { x: newX, y: newY };
    });
  };

  useEffect(() => {
    let interval;
    if (gameMode === 1) {
      // Game Mode 1 Logic
      interval = setInterval(() => {
        moveTargetMode1();
      }, 1000);
    } else if (gameMode === 2) {
      // Game Mode 2 Logic
      interval = setInterval(() => {
        moveTargetMode2();
      }, 50);
    }
    return () => clearInterval(interval); // Cleanup
  }, [gameMode, velocity]);

  const handleTargetClick = () => {
    setScore((prevScore) => prevScore + 1);
    if (gameMode === 1) {
      moveTargetMode1();
    } else if (gameMode === 2) {
      moveTargetMode2();
    }

    if (shrinkTargetOn) setTargetSize(Math.max(50 - score * 2, 20)); // Minimum size: 20px
  };

  return (
    <div
      id="gameArea"
      style={{
        width: "500px",
        height: "500px",
        border: "3px solid black",
        position: "relative",
        //   margin: "20px auto",
        // backgroundColor: "#f9f9f9",
        overflow: "hidden",
        borderRadius: "10px",
      }}
    >
      {timer > 0 ? (
        <>
          <Image
            src={state?.options?.target}
            alt="Target"
            onClick={handleTargetClick}
            width={200}
            height={150}
            style={{
              position: "absolute",
              top: `${targetPosition.y}px`,
              left: `${targetPosition.x}px`,
              width: `${targetSize}px`,
              height: `${targetSize}px`,
              borderRadius: "50%",
              backgroundColor: "red",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            }}
          />
        </>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "24px",
            color: "#333",
            textAlign: "center",
          }}
        >
          <p>Game Over!</p>
          <p>Your Score: {score}</p>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Time: {timer}s
      </div>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "black",
        }}
      >
        Score: {score}
      </div>
    </div>
  );
};

export default ClickTheTarget;

// Another feature is you can subtract score every time you miss the target
