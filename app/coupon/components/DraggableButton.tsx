import { useDrag } from "react-dnd";
import MenubarDemo from '@/components/parts/menu-bar'
const ItemType = {
  BUTTON: "button",
};

const DraggableButton = ({text, action, icon}) => {
  const [, drag] = useDrag(() => ({
    type: ItemType.BUTTON,
    item: { type: "button", label: "Click Me", text, action },
  }));

  return (
    <>
    {/* <MenubarDemo/> */}
    <div
      ref={drag}
      style={{
        padding: "10px",
        margin: "5px 0",
        background: "#ffe",
        border: "1px solid #ccc",
        borderRadius: "5px",
        cursor: "grab",
        display: 'flex',
        alignItems: 'center',
        maxWidth: '5em',
        minHeight: '5em'
      }}
    >
      <span className=" mr-2">{text}</span>
      {icon}
    </div>
    </>
  );
};

export default DraggableButton;
