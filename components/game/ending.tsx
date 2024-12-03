import { useState } from "react";

const test = [
  {
    id: 1732053757346,
    type: "text",
    text: "Discount: 20%",
    x: 33.666666666666664,
    y: 4.775,
  },
  {
    id: 1732053936659,
    type: "formInput",
    placeholder: "Enter text here",
    x: 36.666666666666664,
    y: 46.575,
  },
  {
    id: 1732053945666,
    type: "text",
    text: "Discount: 20%",
    x: 3.3333333333333335,
    y: 48.575,
  },
  {
    id: 1732053973715,
    type: "text",
    text: "Discount: 20%",
    x: 3.6666666666666665,
    y: 62.975,
  },
  {
    id: 1732054027879,
    type: "formInput",
    placeholder: "Enter text here",
    x: 34.66666666666667,
    y: 61.175000000000004,
  },
  {
    id: 1732054036520,
    type: "button",
    label: "Click Me",
    x: 41.66666666666667,
    y: 83.975,
  },
];

// game State over, shows the player a reward, or form, or whatever was created from the coupon page

const GameOver = () => {
  const [elements, setElements] = useState(test);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "300px", // Restrict the max width for a coupon-like feel
        height: "500px",
        // border: "2px dashed #ccc", // Dashed border for the "cut-out" look
        borderRadius: "15px", // Rounded corners for a coupon-like design
        backgroundColor: "white", // Light background color
        // position: "relative", // Allows absolute positioning of items
        marginTop: "20px",
        // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
        padding: "20px", // Space inside the coupon for items
        textAlign: "center", // Centers text or content inside the coupon
        position: "relative",
      }}
    >
      {elements.map((item: any) => {
        return (
          <div
            key={item.id}
            style={{
              position: "absolute",
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
          >
               {item.type === "formInput" ? (
        <FormInput item={item} />
      ) : item.type === "button" ? (
        <ButtonInput item={item} />
      ) : (
        <Text item={item}  />
      )}
          </div>
        );
      })}
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
  
//   const ImageInput = ({ item }: any) => {
//     return <Image src={item.text} alt={item.text} />;
//   };
  
  const Text = ({ item }: any) => {
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
          // padding: "10px",
  
          cursor: isEditing ? "text" : "grab",
          // resize: "both", // Allow resizing
  
          // minHeight: "50px",
  
          // padding: "10px",
          // background: "#ffffff",
          // border: "1px solid #ccc",
          borderRadius: "3px",
          // boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          // cursor: isEditing ? "text" : "grab",
          // resize: "both", // Allow resizing
          // overflow: "auto", // Handle content overflow
          // minWidth: "100px", // Minimum size for expandability
          // minHeight: "50px",
      //     resize: 'both',
      // overflow: 'auto'
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
              border: "2px dotted black",
              outline: "none",
              // resize: "none",
              fontFamily: "inherit",
              fontSize: "inherit",
              backgroundColor: "transparent",
              display: "flex",
              // lineHeight: '100%', /* Match the height of the textarea */
  
              justifyContent: "center",
              textAlign: 'center',
              alignItems: 'center'
            }}
          />
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: 'transparent'
            }}
          >
            {text}
          </div>
        )}{" "}
  
      </div>
    );
  };


  export  {GameOver}