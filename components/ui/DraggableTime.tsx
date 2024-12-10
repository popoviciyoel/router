import React from "react";
import { useDrag } from "react-dnd";
import { CountdownTimerIcon } from "@radix-ui/react-icons";

const ItemType = {
  TIME: "time",
};

interface DraggableTimeProps {
  time: string;
}

const DraggableTime = ({ time }: DraggableTimeProps) => {
  const [, drag] = useDrag(() => ({
    type: ItemType.TIME,
    item: { type: "time", time },
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: "10px 20px",
        margin: "10px",
        backgroundColor: "#f5f5f5",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "grab",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        minWidth: "100px",
      }}
    >
      <CountdownTimerIcon />
      Timer
    </div>
  );
};

export default DraggableTime;
