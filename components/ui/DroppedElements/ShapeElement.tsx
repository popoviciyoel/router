import React, { useRef, useState } from "react";

import { ToolbarShape } from "@/components/parts/tool-bar";
import OutsideClickHandler from "react-outside-click-handler";

const ShapeElement = ({ shape, isEditing, setIsEditing }) => {
  const ref = useRef();
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Define shape styles
  const getShapeStyle = () => {
    switch (shape) {
      case "circle":
        return {
          width: width || "50px",
          height: height || "50px",
          borderRadius: "50%",
          backgroundColor: "blue",
        };
      case "square":
        return {
          width: width || "50px",
          height: height || "50px",
          backgroundColor: "green",
        };
      case "triangle":
        return {
          width: width || "0",
          height: height || "0",
          borderLeft: "25px solid transparent",
          borderRight: "25px solid transparent",
          borderBottom: "50px solid red",
        };
      default:
        return {};
    }
  };

  return (
    <>
      {isEditing ? (
        <OutsideClickHandler
          onOutsideClick={() => {
            console.log("isModalOpen", isModalOpen);
            if (!isModalOpen) {
              setIsEditing(false);
            }
          }}
        >
          <ToolbarShape
            editorRef={ref}
            setWidth={setWidth}
            setHeight={setHeight}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </OutsideClickHandler>
      ) : null}
      <div
        onClick={() => setIsEditing(!isEditing)}
        ref={ref}
        style={{
          ...getShapeStyle(),

          margin: "10px",
          cursor: "grab",
          display: "inline-block",
        }}
      />
    </>
  );
};

export default ShapeElement;
