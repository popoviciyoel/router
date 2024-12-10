import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import "./../accordian-styles.css";
import { Input } from "../../ui/input";
import { Separator } from "../../ui/separator";
import RadioGroupDemo from "./../radio-group";
import { AccordionContent, AccordionTrigger } from "../accordian";
import SliderDemo from "./../slider";
import ImageUploader from "../image-uploader";



const ClickTheTargetOptions = () => {
    return <Accordion.Item className="AccordionItem" value="item-1">
    <AccordionTrigger>Options</AccordionTrigger>
    <AccordionContent>
      <div style={{ display: "flex", alignItems: "center", margin: '1em 0em' }}>
    
        <ImageUploader direction="Upload Products"/>
      </div>
      <Separator />
 
      <div style={{ display: "flex", alignItems: "center", margin: '1em 0em'  }}>
        <label
          className="Label"
          htmlFor="airplane-mode"
          style={{ paddingRight: 15 }}
        >
         Adjust Game Time
        </label>
        <Input type="text" />
      </div>
      <Separator />
      <div style={{ display: "flex", alignItems: "center" , margin: '1em 0em' }}>
        <label
          className="Label"
          htmlFor="airplane-mode"
          style={{ paddingRight: 15 }}
        >
         Game Type 
        </label>        
        <RadioGroupDemo labels={["Discrete", "Continuos"]}/>

      </div>
      <Separator />
      <div style={{ display: "flex", alignItems: "center", margin: '1em 0em'  }}>
        <label
          className="Label"
          htmlFor="airplane-mode"
          style={{ paddingRight: 15 }}
        >
         Target Movement Speed
        </label>        
        <SliderDemo/>

      </div>
      <Separator />
      <div style={{ display: "flex", alignItems: "center", margin: '1em 0em'  }}>
        <label
          className="Label"
          htmlFor="airplane-mode"
          style={{ paddingRight: 15 }}
        >
         Shrink Mode
        </label>        
        <RadioGroupDemo labels={["On", "Off"]}/>


      </div>

    </AccordionContent>
  </Accordion.Item>
}

export default ClickTheTargetOptions