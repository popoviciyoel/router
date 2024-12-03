import { useDrag } from "react-dnd";

const ItemType = {
  FORM_INPUT: "formInput",
};

const DraggableFormInput = () => {
  const [, drag] = useDrag(() => ({
    type: ItemType.FORM_INPUT,
    item: { type: "formInput", placeholder: "Enter text here" },
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
              maxWidth: '5em',
        minHeight: '5em'
      }}
    >
      Form Input
    </div>
  );
};

export default DraggableFormInput;
