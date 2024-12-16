import InputElement from "../ui/DroppedElements/InputElement";
import ButtonElement from "../ui/DroppedElements/ButtonElement";
import ImageElement from "../ui/DroppedElements/ImageElement";
import TextElement from "../ui/DroppedElements/TextElement";
import ShapeElement from "../ui/DroppedElements/ShapeElement";
import { useCouponBuilder } from "@/app/coupon/CouponBuilderProvider";

const ViewOnlyCoupon = ({width, height}) => {
  const { state } = useCouponBuilder();

  return (
    <div
      style={{
        width: "100%",
        maxWidth: width || "300px", // Restrict the max width for a coupon-like feel
        height: height || "500px",
        // border: "2px dashed #ccc", // Dashed border for the "cut-out" look
        borderRadius: "15px", // Rounded corners for a coupon-like design
        backgroundColor: state?.backgroundColor || "white", // Light background color
        // position: "relative", // Allows absolute positioning of items
        backgroundImage: `url("${state.backgroundImage}")`,
        margin: 10,

        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
        padding: "20px", // Space inside the coupon for items
        textAlign: "center", // Centers text or content inside the coupon
        position: "relative",
      }}
    >
      {state?.elements.map((item: any) => {
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
              <InputElement item={item} />
            ) : item.type === "button" ? (
              <ButtonElement item={item} />
            ) : item.type === "image" ? (
              <ImageElement item={item} />
            ) : null}
            {item.type === "text" && (
              <>
                <TextElement item={item} />
              </>
            )}
            {item.type === "shape" ? <ShapeElement shape={item.shape} /> : null}
          </div>
        );
      })}
    </div>
  );
};

export { ViewOnlyCoupon };
