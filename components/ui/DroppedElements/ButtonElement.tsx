import React, { useRef, useState } from "react";
import ToolbarDemo from "@/components/parts/tool-bar";
import OutsideClickHandler from "react-outside-click-handler";
import RedirectLinkBar from "@/components/parts/redirect-link-bar";

const ButtonElement = ({ isEditing, item, setIsEditing, setText }: any) => {
  const ref = useRef();

  return isEditing ? (
    <OutsideClickHandler
      onOutsideClick={() => {
        // setIsEditing(false);
      }}
    >
      <ToolbarDemo
        editorRef={ref}
        setText={setText}
        item={item}
        isEditing={isEditing}
      />
      <div
        ref={ref}
        contentEditable
        autoFocus
        className="button-text-focused"
        style={{ width: item?.width, height: item?.height, backgroundColor: item?.backgroundColor }}
      >
        {item?.text}
      </div>
      {item?.action && <RedirectLinkBar />}
    </OutsideClickHandler>
  ) : (
    <div
      onClick={() => setIsEditing(!isEditing)}
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
      style={{ width: item?.width, height: item?.height, backgroundColor: item?.backgroundColor }}
      className="button-text"
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#0056b3";
        e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#007BFF";
        e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
      }}
      dangerouslySetInnerHTML={{
        __html: item.text,
      }}
    ></div>
  );
};
export default ButtonElement;
