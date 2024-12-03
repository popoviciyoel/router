"use client";
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {AccordionDemo2} from "@/components/parts/accordian";

const ClickTheTarget = () => {
  const [targetPosition, setTargetPosition] = useState({ x: 100, y: 100 });
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30); // 30 seconds game duration
  const [targetSize, setTargetSize] = useState(Math.max(50 - score * 2, 20)); // Minimum size: 20px

  useEffect(() => {
    // Timer countdown
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Game Mode 1

  useEffect(() => {
    // Randomly move the target every 1 second
    const interval = setInterval(() => {
      moveTarget();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const moveTarget = () => {
    const gameArea = document.getElementById("gameArea");
    if (!gameArea) return;

    const { width, height } = gameArea.getBoundingClientRect();
    const newX = Math.random() * (width - 50); // Subtract target size
    const newY = Math.random() * (height - 50);
    setTargetPosition({ x: newX, y: newY });
  };

  // Game Mode 2

  // const [velocity, setVelocity] = useState({ x: 10 + (Math.random() - 0.5) * 10, y: 10 + + (Math.random() - 0.5) * 10 });

  // const moveTarget = () => {
  //     setTargetPosition((prev) => {
  //       let newVelocity = { ...velocity }; // Copy the current velocity
  //       let newX = prev.x + newVelocity.x;
  //       let newY = prev.y + newVelocity.y;

  //       // Reverse direction if it hits the boundaries
  //       if (newX <= 0 || newX >= 450) {
  //         newVelocity.x = -newVelocity.x;
  //         newX = Math.max(0, Math.min(450, newX)); // Clamp within bounds
  //         setVelocity((v) => ({
  //             x: -v.x + (Math.random() - 0.5) * 10, // Add random change
  //             y: -v.y + (Math.random() - 0.5) * 10,
  //           }));
  //       }

  //       if (newY <= 0 || newY >= 450) {
  //         newVelocity.y = -newVelocity.y;
  //         newY = Math.max(0, Math.min(450, newY)); // Clamp within bounds
  //         setVelocity((v) => ({
  //             x: -v.x + (Math.random() - 0.5) * 10, // Add random change
  //             y: -v.y + (Math.random() - 0.5) * 10,
  //           }));
  //       }

  //       // Update the velocity synchronously
  //       setVelocity(newVelocity);

  //       return { x: newX, y: newY };
  //     });
  //   };

  // useEffect(() => {
  //   const interval = setInterval(moveTarget, 50);
  //   return () => clearInterval(interval);
  // }, [velocity]);

  const handleTargetClick = () => {
    setScore((prevScore) => prevScore + 1);
    moveTarget(); // Move the target immediately after a hit
    setTargetSize(Math.max(50 - score * 2, 20)); // Minimum size: 20px
  };

  return (
    <div>
      <AccordionDemo2/>

      <div
        id="gameArea"
        style={{
          width: "500px",
          height: "500px",
          border: "2px solid #333",
          position: "relative",
          margin: "20px auto",
          backgroundColor: "#f9f9f9",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        {timer > 0 ? (
          <div
            onClick={handleTargetClick}
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
            color: "#333",
          }}
        >
          Score: {score}
        </div>
      </div>
    </div>
  );
};

export default ClickTheTarget;

// Another feature is you can subtract score every time you miss the target
