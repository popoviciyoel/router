import { useDrag } from "react-dnd";

const ItemType = {
  IMAGE_INPUT: "image",
};

const DraggableImageInput = () => {
  const [, drag] = useDrag(() => ({
    type: ItemType.IMAGE_INPUT,
    item: { type: "image", alt: "alt image here" },
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: "10px",
        margin: "5px 0",
        background: "#eef",
        border: "1px solid #ccc",
        borderRadius: "5px",
        cursor: "grab",
      }}
    >
      Image Input
    </div>
  );
};

export default DraggableImageInput;
