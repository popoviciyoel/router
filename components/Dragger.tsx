import React, { useState } from "react";

import DraggableItem from "./DraggableText";
import Sandbox from "./SandBox";
import DraggableFormInput from "./DraggableFormInput";
import DraggableButton from "./DraggableButton";
import DraggableImageInput from "./DraggableImage";
import { useCouponBuilder } from "@/app/coupon/CouponBuilderProvider";

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
  const { state, dispatch } = useCouponBuilder();

  const setElements = (element) => {
    dispatch({ type: "ADD_ELEMENT", payload: element });
  };

  const updateElement = (element) => {
    dispatch({ type: "UPDATE_ELEMENT", payload: element  });
  };

  // Add a new element to the sandbox at the drop position
  const handleDrop = (item: any) => {
    //    Update position if the item already exists
    if (item.id) {
      console.log('item', item)
      updateElement(item);
    } else {
      // Add a new item if it's a fresh drop
      setElements({
        id: Date.now(),
        ...item,
      });
    }
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <Sandbox elements={state?.elements} onDrop={handleDrop} />
    </div>
  );
};

export default Dragger;
