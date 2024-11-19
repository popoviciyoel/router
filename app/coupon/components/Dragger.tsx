import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "./DraggableText";
import Sandbox from "./SandBox";
import DraggableFormInput from "./DraggableFormInput";
import DraggableButton from "./DraggableButton";
import DraggableImageInput from "./DraggableImage";

const Dragger = () => {
  const [elements, setElements] = useState<any>([]);

  // Add a new element to the sandbox at the drop position
  const handleDrop = (item: any, monitor: any) => {
    const offset = monitor.getSourceClientOffset();

    console.log('item', item)

    if (offset) {
      //    Update position if the item already exists
      if (item.id) {
        setElements((prev: any) =>
          prev.map((existingItem: any) =>
            existingItem.id === item.id
              ? { ...existingItem, x: offset.x, y: offset.y, type: item.type }
              : existingItem
          )
        );
      } else {
        // Add a new item if it's a fresh drop
        setElements((prev: any) => [
          ...prev,
          { id: Date.now(), text: item.text, x: offset.x, y: offset.y, type: item.type},
        ]);
      }
    }
  };


  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: "20px" }}>
        <h2>Drag-and-Drop Coupon Builder</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          {/* Sidebar for Draggable Items */}
          <DraggableItem text="Discount: 20%" />
          <DraggableItem text="Coupon Code: SAVE20" />
          <DraggableItem text="Expiry: 12/31/2024" />
          <DraggableFormInput />
          <DraggableButton />
          <DraggableImageInput />
        </div>
        <Sandbox elements={elements} onDrop={handleDrop} />
      </div>
    </DndProvider>
  );
};

export default Dragger;
