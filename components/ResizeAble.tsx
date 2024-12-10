import React, { useRef } from "react";
import "./Resizeable.css"; // External CSS for better organization

const Resizable = ({ children, initialWidth = 300, initialHeight = 200 }) => {
  const resizableRef = useRef(null);

  const handleMouseDown = (e, direction) => {
    e.preventDefault();

    const resizable = resizableRef.current;
    const rect = resizable.getBoundingClientRect();

    console.log('rect', rect)
    console.log('e.clientX', e.clientX)
    console.log('e.clientY', e.clientY)

    

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = rect.width;
    const startHeight = rect.height;
    const startTop = rect.top;
    const startLeft = rect.left;

    const onMouseMove = (event) => {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      if (direction.includes("top")) {
        resizable.style.height = `${startHeight - dy}px`;
        resizable.style.top = `${startTop + dy}px`;
      }
      if (direction.includes("bottom")) {
        resizable.style.height = `${startHeight + dy}px`;
      }
      if (direction.includes("left")) {
        resizable.style.width = `${startWidth - dx}px`;
        resizable.style.left = `${startLeft + dx}px`;
      }
      if (direction.includes("right")) {
        resizable.style.width = `${startWidth + dx}px`;
      }
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={resizableRef}
      className="resizable"
      style={{
        width: `${initialWidth}px`,
        height: `${initialHeight}px`,
      }}
    >
      {children}
      {/* Resize Handles */}
      <div
        className="resize-handle top-left"
        onMouseDown={(e) => handleMouseDown(e, "top-left")}
      ></div>
      <div
        className="resize-handle top-right"
        onMouseDown={(e) => handleMouseDown(e, "top-right")}
      ></div>
      <div
        className="resize-handle bottom-left"
        onMouseDown={(e) => handleMouseDown(e, "bottom-left")}
      ></div>
      <div
        className="resize-handle bottom-right"
        onMouseDown={(e) => handleMouseDown(e, "bottom-right")}
      ></div>
    </div>
  );
};

export default Resizable;
