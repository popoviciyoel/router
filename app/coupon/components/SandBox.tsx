'use client';

import React from 'react';

import { useDrop } from "react-dnd/dist/hooks/useDrop/useDrop";
import DroppedElement from "./DroppedElement";





const ItemType = {
    TEXT_ELEMENT: "text",
    FORM_INPUT: "formInput",
    BUTTON: "button",
    IMAGE_ELEMENT: 'image'
  };

const Sandbox = ({ elements, onDrop }: any) => {
    const [, drop] = useDrop(() => ({
      accept: [ItemType.TEXT_ELEMENT, ItemType.FORM_INPUT, ItemType.BUTTON, ItemType.IMAGE_ELEMENT],
      drop: (item, monitor) => onDrop(item, monitor),
    }));
    console.log('elements', elements)


    
  
    return (
      <div
        ref={drop}
        style={{
          width: "100%",
          height: "400px",
          border: "2px dashed #ccc",
        //   position: "relative",
          marginTop: "20px",
        }}
      >
        {elements.map((element: any) => (
          <DroppedElement key={element.id} item={element} />
        ))}

      </div>
    );
  };
  

  export default Sandbox