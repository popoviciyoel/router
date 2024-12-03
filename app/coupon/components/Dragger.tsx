import React, { useState } from "react";

import DraggableItem from "./DraggableText";
import Sandbox from "./SandBox";
import DraggableFormInput from "./DraggableFormInput";
import DraggableButton from "./DraggableButton";
import DraggableImageInput from "./DraggableImage";

// const test = [
//   {
//     id: 1732053757346,
//     type: "text",
//     text: "Discount: 20%",
//     x: 33.666666666666664,
//     y: 4.775,
//   },
//   {
//     id: 1732053936659,
//     type: "formInput",
//     placeholder: "Enter text here",
//     x: 36.666666666666664,
//     y: 46.575,
//   },
//   {
//     id: 1732053945666,
//     type: "text",
//     text: "Discount: 20%",
//     x: 3.3333333333333335,
//     y: 48.575,
//   },
//   {
//     id: 1732053973715,
//     type: "text",
//     text: "Discount: 20%",
//     x: 3.6666666666666665,
//     y: 62.975,
//   },
//   {
//     id: 1732054027879,
//     type: "formInput",
//     placeholder: "Enter text here",
//     x: 34.66666666666667,
//     y: 61.175000000000004,
//   },
//   {
//     id: 1732054036520,
//     type: "button",
//     label: "Click Me",
//     x: 41.66666666666667,
//     y: 83.975,
//   },
// ];



const Dragger = () => {
  const [elements, setElements] = useState<any>();

  // Add a new element to the sandbox at the drop position
  const handleDrop = (item: any, monitor: any) => {
    // const offset = monitor.getSourceClientOffset();
    // const offset2 = monitor.getClientOffset();
    // const offset3 = monitor.getDifferenceFromInitialOffset()
    // console.log('monitor', monitor)

    // console.log("item", item);
    // console.log('offset', offset)
    // console.log('offset2', offset2)
    // console.log('offset3', offset3)

    //    Update position if the item already exists
    if (item.id) {
      setElements((prev: any) =>
        prev.map((existingItem: any) =>
          existingItem.id === item.id
            ? { ...existingItem, ...item }
            : existingItem
        )
      );
    } else {
      // Add a new item if it's a fresh drop
      setElements((prev: any) => [
        ...(prev || []),
        {
          id: Date.now(),
          ...item,
        },
      ]);
    }
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <Sandbox elements={elements} onDrop={handleDrop} />
    </div>
  );
};

export default Dragger;
