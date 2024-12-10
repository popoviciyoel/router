import React from "react";
import { useDrag } from "react-dnd";

const ItemType = {
  SHAPE: "shape",
};

interface DraggableShapeProps {
  shape: "circle" | "square" | "triangle";
}

const DraggableShape = ({ shape }: DraggableShapeProps) => {
  const [, drag] = useDrag(() => ({
    type: ItemType.SHAPE,
    item: { type: "shape", shape },
  }));

  // Define shape styles
  const getShapeStyle = () => {
    switch (shape) {
      case "circle":
        return {
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "blue",
        };
      case "square":
        return {
          width: "50px",
          height: "50px",
          backgroundColor: "green",
        };
      case "triangle":
        return {
          width: "0",
          height: "0",
          borderLeft: "25px solid transparent",
          borderRight: "25px solid transparent",
          borderBottom: "50px solid red",
        };
      default:
        return {};
    }
  };

  return (
    <div
      ref={drag}
      style={{
        ...getShapeStyle(),
        margin: "10px",
        cursor: "grab",
        display: "inline-block",
      }}
    />
  );
};

export default DraggableShape;
