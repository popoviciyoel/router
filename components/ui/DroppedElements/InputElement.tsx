import React from "react";
const InputElement = ({ item }: any) => {
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

export default InputElement;
