import React, { useRef, useState } from "react";

import { ToolbarShape } from "@/components/parts/tool-bar";
import OutsideClickHandler from "react-outside-click-handler";

const ShapeElement = ({ item, isEditing, setIsEditing }) => {
  const ref = useRef();

  const [isModalOpen, setIsModalOpen] = useState(false);
  // Define shape styles
  const getShapeStyle = () => {
    switch (item?.shape) {
      case "circle":
        return {
          width: item?.width || "50px",
          height: item?.height  || "50px",
          borderRadius: "50%",
          backgroundColor: item?.backgroundColor ||  "blue",
        };
      case "square":
        return {
          width: item?.width  || "50px",
          height: item?.height || "50px",
          backgroundColor: item?.backgroundColor || "green",
        };
      case "triangle":
        return {
          width: item?.width  || "0",
          height: item?.height || "0",
          borderLeft: "25px solid transparent",
          borderRight: "25px solid transparent",
          borderBottom: `50px solid ${item?.backgroundColor || "red"}`,
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
            // if (!isModalOpen) {
            //   setIsEditing(false);
            // }
          }}
        >
          <ToolbarShape
            item={item}
   
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
