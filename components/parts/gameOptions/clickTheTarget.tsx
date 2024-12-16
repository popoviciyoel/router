import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import "./../accordian-styles.css";
import { Input } from "../../ui/input";
import { Separator } from "../../ui/separator";
import RadioGroupDemo from "./../radio-group";
import { AccordionContent, AccordionTrigger } from "../accordian";
import SliderDemo from "./../slider";
import ImageUploader from "../image-uploader";
import { useGameBuilder } from "@/app/build/GameBuilderProvider";

const ClickTheTargetOptions = () => {
  const { state, dispatch } = useGameBuilder();

  const setShrinkMode = (value) => {
    dispatch({
      type: "ADD_GAME_OPTION",
      payload: { type: "Target", options: { shrinkMode: value } },
    });
  };

  const setMovementSpeed = (value) => {
    dispatch({
      type: "ADD_GAME_OPTION",
      payload: { type: "Target", options: { speed: Number(value[0]) } },
    });
  };

  const setGameType = (value) => {
    dispatch({
      type: "ADD_GAME_OPTION",
      payload: { type: "Target", options: { type: value } },
    });
  };


  const setGameTime = (e) => {
    dispatch({
      type: "ADD_GAME_OPTION",
      payload: { type: "Target", options: { time: Number(e.target.value) } },
    });
  };


  const setAsset = (imageURL) => {
    dispatch({
      type: "ADD_GAME_OPTION",
      payload: { type: "Target", options: { target: imageURL } },
    });
  };
  return (
    <Accordion.Item className="AccordionItem" value="item-1">
      <AccordionTrigger>Options</AccordionTrigger>
      <AccordionContent>
        <div
          style={{ display: "flex", alignItems: "center", margin: "1em 0em" }}
        >
          <ImageUploader direction="Upload Products" imageHandler={setAsset} />
        </div>
        <Separator />

        <div
          style={{ display: "flex", alignItems: "center", margin: "1em 0em" }}
        >
          <label
            className="Label"
            htmlFor="airplane-mode"
            style={{ paddingRight: 15 }}
          >
            Adjust Game Time
          </label>
          <Input type="text" onChange={setGameTime}/>
        </div>
        <Separator />
        <div
          style={{ display: "flex", alignItems: "center", margin: "1em 0em" }}
        >
          <label
            className="Label"
            htmlFor="airplane-mode"
            style={{ paddingRight: 15 }}
          >
            Game Type
          </label>
          <RadioGroupDemo
            defaultValue={"Discrete"}
            labels={["Discrete", "Continuos"]}
            onHandle={setGameType}
          />
        </div>
        <Separator />
        <div
          style={{ display: "flex", alignItems: "center", margin: "1em 0em" }}
        >
          <label
            className="Label"
            htmlFor="airplane-mode"
            style={{ paddingRight: 15 }}
          >
            Target Movement Speed
          </label>
          <SliderDemo onHandle={setMovementSpeed} />
        </div>
        <Separator />
        <div
          style={{ display: "flex", alignItems: "center", margin: "1em 0em" }}
        >
          <label
            className="Label"
            htmlFor="airplane-mode"
            style={{ paddingRight: 15 }}
          >
            Shrink Mode
          </label>
          <RadioGroupDemo
            defaultValue={"Off"}
            labels={["On", "Off"]}
            onHandle={setShrinkMode}
          />
        </div>
      </AccordionContent>
    </Accordion.Item>
  );
};

export default ClickTheTargetOptions;
