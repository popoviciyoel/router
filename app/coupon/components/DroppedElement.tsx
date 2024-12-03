import React, { useEffect, useRef, useState } from "react";
import { useDrag, useDragLayer } from "react-dnd";
import Image from "next/image";
import ToolbarDemo from "@/components/parts/tool-bar";
import OutsideClickHandler from "react-outside-click-handler";
import CoordinatesBar from "@/components/parts/coordinates-bar";
import RedirectLinkBar from "@/components/parts/redirect-link-bar";
import { Textarea } from "@/components/ui/textarea";

import "./DroppedElement.css";
const ItemType = {
  TEXT_ELEMENT: "text",
  FORM_INPUT: "formInput",
  BUTTON: "button",
};

const DroppedElement = ({
  item,
  onUpdate,
  offsetRef,
}: {
  item: any;
  onUpdate: (updatedItem: any) => void;
  offsetRef: any;
}) => {
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const { isDragging, clientOffset, initalClientOffset } = useDragLayer(
    (monitor) => ({
      isDragging: monitor.isDragging(),
      clientOffset: monitor.getClientOffset(),
      initalClientOffset: monitor.getInitialClientOffset(),
      

      // canDrag: () => !isEditing, // Disable dragging when in edit mode
    })
  );
  const ref = useRef();

  const [collected, drag, previewRef] = useDrag(() => ({
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


  const [text, setText] = useState(item.text); // Track text state
  const refTool = useRef();


  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${item.x}%`,
        top: `${item.y}%`,
        transform: "translate(0, 0)",
        zIndex: 0
      }}
    >
       {isEditing ? (  <ToolbarDemo
            editorRef={refTool}
            setText={setText}
          />): null}
      <div
        style={{ opacity: isDragging && collected?.id !== item?.id ? 0 : 1 }}
      >
        {item.type === "formInput" ? (
          <FormInput item={item} />
        ) : item.type === "button" ? (
          <ButtonInput
            item={item}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        ) : item.type === "image" ? (
          <ImageInput item={item} />
        ) : (
          <>
            <Text
              item={item}
              onUpdate={onUpdate}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </>
        )}
      </div>
      {/* Display coordinates */}
      {isDragging && collected?.id !== item?.id && (
        <CoordinatesBar
          x={clientOffset.x - item.containerLeft - offsetRef.current?.x}
          y={clientOffset.y - item.containerTop - offsetRef.current?.y}
        />
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

const ButtonInput = ({ isEditing, item, setIsEditing }: any) => {
  const [text, setText] = useState(item.text); // Track text state
  const ref = useRef();

  return isEditing ? (
    <OutsideClickHandler
      onOutsideClick={() => {
        setIsEditing(false);

        if (ref.current) setText(ref.current.innerHTML);
      }}
    >
      <ToolbarDemo />
      <div ref={ref} contentEditable autoFocus className="button-text-focused">
        {text}
      </div>
      {item?.action && <RedirectLinkBar />}
    </OutsideClickHandler>
  ) : (
    <div
      onClick={() => setIsEditing(true)}
      // style={{
      //   padding: "8px 16px",
      //   fontSize: "14px",
      //   color: "#fff",
      //   backgroundColor: "#007BFF",
      //   border: "none",
      //   borderRadius: "4px",
      //   cursor: "pointer",
      //   boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      //   transition: "background-color 0.2s, box-shadow 0.2s",
      // }}
      className="button-text"
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#0056b3";
        e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#007BFF";
        e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
      }}
    >
      {text}
    </div>
  );
};

const ImageInput = ({ item }: any) => {
  return <Image src={item.text} alt={item.text} />;
};

const Text = ({ item, onUpdate, isEditing, setIsEditing }: any) => {
  const [text, setText] = useState(item.text); // Track text state
  const ref = useRef();
  const [properties, setProperties] = useState({});
  const [selectedText, setSelectedText] = useState();
  console.log("selectedText", text);

  // useEffect(() => {
  //   if(isDragging) {
  //     setIsEditing(false)
  //   }
  // }, [isDragging])

  // Handle text changes
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("e", e);
    setText(e.target.value);
    const textArea = ref.current;
    console.log("textArea", textArea);
    if (textArea) {
      const start = textArea.selectionStart;
      const end = textArea.selectionEnd;
      const selectedText = textArea.value.substring(start, end);
      console.log("Selected text:", selectedText);
      setSelectedText(selectedText);
    }
  };

  const editorRef = useRef(null); // Reference for the DOM element

  return (
    <>
    <div>
            
    </div>
    <div
      style={{
        cursor: isEditing ? "text" : "grab",
        // userSelect: isEditing ? "text" : "none", // Prevent text selection when not editing
        borderRadius: "3px",
        userSelect: "none", // Prevent text selection during drag
      }}
    >
      {isEditing ? (
        <OutsideClickHandler
          onOutsideClick={() => {
            setIsEditing(false);

            if (ref.current) setText(ref.current.innerHTML);
          }}
        >
      
          <div
            ref={ref}
            contentEditable
            onChange={handleTextChange}
            autoFocus
            className="focused-text"
            dangerouslySetInnerHTML={{
              __html: text,
            }}
          ></div>
        </OutsideClickHandler>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="text"
          onMouseDown={(e) => {}}
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        ></div>
      )}
    </div>
    </>
  );
};

export default DroppedElement;
