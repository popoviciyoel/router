import { useDrag } from "react-dnd";
const ItemType = {
  TEXT_ELEMENT: "text",
};

const DraggableText = ({ text }: { text: string }) => {
  const [, drag] = useDrag(() => ({
    type: ItemType.TEXT_ELEMENT,
    item: { type: 'text', text },
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: "10px",
        margin: "5px 0",
        background: "#eee",
        border: "1px solid #ccc",
        borderRadius: "5px",
        cursor: "grab",
      }}
    >
      {text}
    </div>
  );
};

export default DraggableText;
