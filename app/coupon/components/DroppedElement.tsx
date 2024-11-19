import React, { useState } from "react";
import { useDrag } from "react-dnd";
import Image from "next/image";
import { text } from "stream/consumers";

const ItemType = {
  TEXT_ELEMENT: "text",
  FORM_INPUT: "formInput",
  BUTTON: "button",
};

const DroppedElement = ({
  item,
  onUpdate,
}: {
  item: any;
  onUpdate: (updatedItem: any) => void;
}) => {
  const [, drag] = useDrag(() => ({
    type: ItemType.TEXT_ELEMENT,
    item: item,
  }));

  return (
    <div ref={drag} style={{ position: "absolute", left: item.x, top: item.y }}>
      {item.type === "formInput" ? (
        <FormInput item={item} />
      ) : item.type === "button" ? (
        <ButtonInput item={item} />
      ) : item.type === "image" ? < ImageInput item={item}/> : (
        <Text item={item} onUpdate={onUpdate} />
      )}
    </div>
  );
};

const FormInput = ({ item }: any) => {
  return (
    <input
      type="text"
      placeholder={item.text}
      style={{
        width: "150px",
        padding: "8px 12px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
        outline: "none",
        transition: "border-color 0.2s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
      onBlur={(e) => (e.target.style.borderColor = "#ccc")}
    />
  );
};

const ButtonInput = ({ item }: any) => {
  return (
    <button
      style={{
        padding: "8px 16px",
        fontSize: "14px",
        color: "#fff",
        backgroundColor: "#007BFF",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "background-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#0056b3";
        e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#007BFF";
        e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
      }}
    >
      {item.text}
    </button>
  );
};

const ImageInput = ({item}: any) => {
  return <Image src={item.text}  alt={item.text}/>
}

const Text = ({ item, onUpdate }: any) => {
  const [text, setText] = useState(item.text); // Track text state
  const [isEditing, setIsEditing] = useState(false); // Track edit mode

  // Handle text changes
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // Save changes when editing is done
  const handleBlur = () => {
    setIsEditing(false);
    // onUpdate({ ...item, text }); // Update the parent state with new text
  };

  return (
    <div
      style={{
        padding: "10px",

        cursor: isEditing ? "text" : "grab",
        resize: "both", // Allow resizing

        minHeight: "50px",

        // padding: "10px",
        background: "#ffffff",
        border: "1px solid #ccc",
        borderRadius: "3px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        // cursor: isEditing ? "text" : "grab",
        // resize: "both", // Allow resizing
        overflow: "auto", // Handle content overflow
        minWidth: "100px", // Minimum size for expandability
        // minHeight: "50px",
      }}
    >
      {isEditing ? (
        <textarea
          value={text}
          onChange={handleTextChange}
          onBlur={handleBlur}
          autoFocus
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
            resize: "none",
            fontFamily: "inherit",
            fontSize: "inherit",
          }}
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          style={{ width: "100%", height: "100%" }}
        >
          {text}
        </div>
      )}{" "}
    </div>
  );
};

export default DroppedElement;
