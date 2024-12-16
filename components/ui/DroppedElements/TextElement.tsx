import React, { memo, useRef, useState } from "react";

import ToolbarDemo, { ToolbarShape } from "@/components/parts/tool-bar";
import OutsideClickHandler from "react-outside-click-handler";

const TextElement = ({ item, isEditing, setIsEditing, setText }: any) => {
  const ref = useRef<HTMLDivElement | null>(null);

  console.log('item', item)
 
  const Editor = memo(({ editorRef }) => {
    console.log('rendered')
    return        <div
    ref={editorRef}
    contentEditable
    className="focused-text"
    dangerouslySetInnerHTML={{
      __html: item.text,
    }}
  ></div>;
  });
  Editor.displayName = 'Editor'
  
  

  return (
    <>
      <div
        style={{
          cursor: isEditing ? "text" : "grab",
          userSelect: isEditing ? "text" : "none", // Prevent text selection when not editing
          borderRadius: "3px",
        }}
      >
        {isEditing ? (
          <OutsideClickHandler
            onOutsideClick={() => {
              setIsEditing(false);
            }}
          >
            <ToolbarDemo
              editorRef={ref}
              setText={setText}
              item={item}
              isEditing={isEditing}
            />
            <Editor editorRef={ref}/>
     
          </OutsideClickHandler>
        ) : (
          <div
            onClick={() => {
              setIsEditing(true);
            }}
            className="text"
            autoFocus={false}
            dangerouslySetInnerHTML={{
              __html: item.text,
            }}
          ></div>
        )}
      </div>
    </>
  );
};


export default TextElement