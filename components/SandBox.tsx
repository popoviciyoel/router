import { useDrop } from "react-dnd/dist/hooks/useDrop/useDrop";
import DroppedElement from "./DroppedElement";
import { useState, useEffect, useRef } from "react";
// import { AIToolbarButton } from '@/components/plate-ui/ai-toolbar-button'
import { useCouponBuilder } from "@/app/coupon/CouponBuilderProvider";
const ItemType = {
  TEXT_ELEMENT: "text",
  FORM_INPUT: "formInput",
  BUTTON: "button",
  IMAGE_ELEMENT: "image",
  SHAPE: "shape"
};

const Sandbox = ({ onDrop }: any) => {
  const containerRef = useRef();
  const offsetRef = useRef({ x: 0, y: 0 }); // Use ref to store the offset
  const {state}  = useCouponBuilder()


  const [, drop] = useDrop(() => ({
    accept: [
      ItemType.TEXT_ELEMENT,
      ItemType.FORM_INPUT,
      ItemType.BUTTON,
      ItemType.IMAGE_ELEMENT,
      ItemType.SHAPE
    ],

    drop: ( itemDefault,monitor) => {
      const clientOffset = monitor.getClientOffset(); // Mouse position relative to viewport
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect(); // Parent container's bounding box
        const x =
          ((clientOffset.x - containerRect.left - offsetRef.current?.x) /
            containerRect.width) *
          100;
        const y =
          ((clientOffset.y - containerRect.top - offsetRef.current?.y) /
            containerRect.height) *
          100;
          console.log('itemDefault', itemDefault)
          console.log('elements',state?.elements)
          const item = state.elements.filter((element) => element?.id === itemDefault?.id)[0] || itemDefault

        onDrop({ ...item, x, y, containerLeft: containerRect.left, containerTop: containerRect.top }); // Pass relative coordinates to onDrop callback
      }
    }
  }) , [state?.elements]);


  drop(containerRef);


  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: "300px", // Restrict the max width for a coupon-like feel
        height: "500px",
        backgroundColor: state.backgroundColor || "white",
        backgroundImage: `url("${state.backgroundImage}")`,
        // border: "2px dashed #ccc", // Dashed border for the "cut-out" look
        borderRadius: "15px", // Rounded corners for a coupon-like design
        // position: "relative", // Allows absolute positioning of items
        marginTop: "20px",
        // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
        padding: "20px", // Space inside the coupon for items
        textAlign: "center", // Centers text or content inside the coupon
        position: "relative",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Box shadow property
      }}
    >
      {state?.elements?.map((element: any) => (
        <DroppedElement key={element.id} item={element} offsetRef={offsetRef}/>
      ))}
      {/* <AIToolbarButton/> */}
    </div>
  );
};

export default Sandbox;
