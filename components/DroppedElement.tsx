import React, { useRef, useState } from "react";
import { useDrag, useDragLayer } from "react-dnd";
import ImageElement from "./ui/DroppedElements/ImageElement";
import ShapeElement from "./ui/DroppedElements/ShapeElement";
import InputElement from "./ui/DroppedElements/InputElement";
import TextElement from "./ui/DroppedElements/TextElement";

import CoordinatesBar from "@/components/parts/coordinates-bar";
import ButtonElement from "./ui/DroppedElements/ButtonElement";

import "./DroppedElement.css";
import { useCouponBuilder } from "@/app/coupon/CouponBuilderProvider";
const ItemType = {
  TEXT_ELEMENT: "text",
  FORM_INPUT: "formInput",
  BUTTON: "button",
};

const DroppedElement = ({
  item,
  offsetRef,
}: {
  item: any;
  offsetRef: any;
}) => {
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const { isDragging, clientOffset, initalClientOffset } = useDragLayer(
    (monitor) => ({
      isDragging: monitor.isDragging(),
      clientOffset: monitor.getClientOffset(),
      initalClientOffset: monitor.getInitialClientOffset(),
    })
  );
  const ref = useRef<HTMLDivElement | null>(null);
  const {state, dispatch} = useCouponBuilder()

  const updateText = (content) => {
    dispatch({type: "UPDATE_ELEMENT",  payload: {...item, text: content}  })
  }

  const [collected, drag] = useDrag(() => ({
    type: ItemType.TEXT_ELEMENT,
    canDrag: () => !isEditing, // Disable dragging when in edit mode
    collect: (monitor) => {
      console.log("monitor", monitor);
      const clientOffset = monitor.getInitialClientOffset();
      const sourceOffset = monitor.getInitialSourceClientOffset();

      // Calculate offset at drag start
      if (clientOffset && sourceOffset) {
        // Store the offset in the ref (does not trigger re-renders)
        offsetRef.current = {
          x: clientOffset.x - sourceOffset.x,
          y: clientOffset.y - sourceOffset.y,
        };
      }

      if (monitor.isDragging()) {
        setIsEditing(false);
        const offset = monitor.getClientOffset();
        if (offset) {
          console.log("{ x: offset.x, y: offset.y }", {
            x: offset.x,
            y: offset.y,
          });

          return {
            isDragging: monitor.isDragging(),
            coordinates: { x: offset.x, y: offset.y },
            clientOffset: monitor.getClientOffset(), // Track mouse position
          };
        }
      } // Track dragging state
      return {
        isDragging: monitor.isDragging(),
        clientOffset: monitor.getClientOffset(), // Track mouse position
        id: item.id,
      };
    },
    previewOptions: {
      captureDraggingState: false,
    },
    item: item,
  }));

  drag(ref);




  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${item.x}%`,
        top: `${item.y}%`,
        transform: "translate(0, 0)",
        zIndex: 0,
      }}
    >
      <div
        style={{ opacity: isDragging && collected?.id !== item?.id ? 0 : 1 }}
      >
        {item.type === "formInput" ? (
          <InputElement item={item} />
        ) : item.type === "button" ? (
          <ButtonElement
            item={item}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        ) : item.type === "image" ? (
          <ImageElement item={item} />
        ) : null}
        {item.type === "text" && (
          <>
            <TextElement
              item={item}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              setText={updateText}
            />
          </>
        )}
        {item.type === "shape" ? (
          <ShapeElement
            shape={item.shape}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        ) : null}
      </div>
      {/* Display coordinates */}
      {isDragging && collected?.id !== item?.id && clientOffset && (
        <CoordinatesBar
          x={clientOffset.x - item.containerLeft - offsetRef.current?.x}
          y={clientOffset.y - item.containerTop - offsetRef.current?.y}
        />
      )}
    </div>
  );
};

export default DroppedElement;
