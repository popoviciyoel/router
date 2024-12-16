import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import ImageUploader from "@/components/parts/image-uploader";
import DraggableItem from "@/components/DraggableText";
import DraggableFormInput from "@/components/DraggableFormInput";
import DraggableButton from "@/components/DraggableButton";
import DraggableImageInput from "@/components/DraggableImage";
import DraggableShape from "@/components/ui/DraggableShape";
import HoverCardDemo from "@/components/parts/card";
import { HexColorPicker } from "react-colorful";
import { useCouponBuilder } from "@/app/coupon/CouponBuilderProvider";
import { CloseIcon, RedirectIcon, SubmitIcon } from "@/components/ui/Icons";
import {
  AccordionContent,
  AccordionTrigger,
} from "@/components/parts/accordian";

const CouponDesignElements = () => {
  const [color, setColor] = useState("#aabbcc");
  const { state, dispatch } = useCouponBuilder();
  const [backGroundColor, setBackgroundColor] = useState(false);

  // Helper function to set background Image
  const setCouponBackgroundImage = (background: string) => {
    dispatch({ type: "SET_BACKGROUND_IMAGE", payload: background });
  };

  // Helper function to delete background Image
  const deleteCouponBackgroundImage = () => {
    dispatch({ type: "REMOVE_BACKGROUND_IMAGE" });
  };

  // Helper function to set background Color
  const setCouponBackgroundColor = (background: string) => {
    dispatch({ type: "SET_BACKGROUND_COLOR", payload: background });
  };

  return (
    <Accordion.Item className="AccordionItem" value="item-1">
      <AccordionTrigger>Design Coupon</AccordionTrigger>
      <AccordionContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            className="Label"
            htmlFor="airplane-mode"
            style={{ paddingRight: 15 }}
          >
            Coupon Elements
          </label>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
            gridGap: "10px", // Space between items
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          {/* Sidebar for Draggable Items */}
          <DraggableItem text="Text" />
          <DraggableFormInput />
          <DraggableImageInput />
          <DraggableButtons />
          <DraggableShapes />
        </div>

        <Separator />
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            className="Label"
            htmlFor="airplane-mode"
            style={{ paddingRight: 15, paddingTop: 15, padding: "10px" }}
          >
            Background {backGroundColor ? "Color" : "Image"}
          </label>
          <Switch onClick={() => setBackgroundColor(!backGroundColor)} />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {backGroundColor ? (
            <HexColorPicker
              color={state.backgroundColor}
              onChange={setCouponBackgroundColor}
            />
          ) : (
            <ImageUploader
              direction="Upload Background"
              imageHandler={setCouponBackgroundImage}
              imageDeleteHandler={deleteCouponBackgroundImage}
            />
          )}
        </div>
      </AccordionContent>
    </Accordion.Item>
  );
};

const DraggableShapes = () => {
  return (
    <HoverCardDemo
      header={"Shape"}
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shapes"><path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/></svg>
      }
      content={[
        <DraggableShape key={0} shape="circle" />,
        <DraggableShape key={1} shape="square" />,
        <DraggableShape key={2} shape="triangle" />,
      ]}
    />
  );
};

const DraggableButtons = () => {
  return (
    <HoverCardDemo
      header={"Button"}
      icon={
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 5H13C13.5523 5 14 5.44772 14 6V9C14 9.55228 13.5523 10 13 10H2C1.44772 10 1 9.55228 1 9V6C1 5.44772 1.44772 5 2 5ZM0 6C0 4.89543 0.895431 4 2 4H13C14.1046 4 15 4.89543 15 6V9C15 10.1046 14.1046 11 13 11H2C0.89543 11 0 10.1046 0 9V6ZM4.5 6.75C4.08579 6.75 3.75 7.08579 3.75 7.5C3.75 7.91421 4.08579 8.25 4.5 8.25C4.91421 8.25 5.25 7.91421 5.25 7.5C5.25 7.08579 4.91421 6.75 4.5 6.75ZM6.75 7.5C6.75 7.08579 7.08579 6.75 7.5 6.75C7.91421 6.75 8.25 7.08579 8.25 7.5C8.25 7.91421 7.91421 8.25 7.5 8.25C7.08579 8.25 6.75 7.91421 6.75 7.5ZM10.5 6.75C10.0858 6.75 9.75 7.08579 9.75 7.5C9.75 7.91421 10.0858 8.25 10.5 8.25C10.9142 8.25 11.25 7.91421 11.25 7.5C11.25 7.08579 10.9142 6.75 10.5 6.75Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      }
      content={[
        <DraggableButton
          key={0}
          text={"Submit Button"}
          action={"submit"}
          icon={<SubmitIcon />}
        />,
        <DraggableButton
          key={1}
          text={"Close Button"}
          action={"close"}
          icon={<CloseIcon />}
        />,
        <DraggableButton
          key={2}
          text={"Redirect Button"}
          action={"redirect"}
          icon={<RedirectIcon />}
        />,
      ]}
    />
  );
};

export { CouponDesignElements };
