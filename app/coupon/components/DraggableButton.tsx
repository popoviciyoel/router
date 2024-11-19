import { useDrag } from "react-dnd";

const ItemType = {
  BUTTON: "button",
};

const DraggableButton = () => {
  const [, drag] = useDrag(() => ({
    type: ItemType.BUTTON,
    item: { type: "button", label: "Click Me" },
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: "10px",
        margin: "5px 0",
        background: "#ffe",
        border: "1px solid #ccc",
        borderRadius: "5px",
        cursor: "grab",
      }}
    >
      Button
    </div>
  );
};

export default DraggableButton;
