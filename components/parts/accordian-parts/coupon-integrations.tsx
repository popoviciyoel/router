import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Input } from "@/components/ui/input";
import { AccordionContent, AccordionTrigger } from "@/components/parts/accordian";
import { Separator } from "@/components/ui/separator";
import { Header } from "../header";


export const CRMIntegration = () => {
  const [active, setActive] = useState("Hubspot");
  const handleCRM = (value: string) => setActive(value);
  return (
    <Accordion.Item className="AccordionItem" value="item-3">
      <AccordionTrigger>Add integration</AccordionTrigger>
      <AccordionContent>
        <div onClick={() => handleCRM("Hubspot")}>Hubspot</div>
        <div onClick={() => handleCRM("Zoho CRM")}>Zoho CRM</div>
        <div onClick={() => handleCRM("Salesforce")}>Salesforce</div>
        <Separator />
        <div>
          <Header title={active} />
          <div style={{ display: "flex", alignItems: "center" }}>
            <label
              className="Label"
              htmlFor="airplane-mode"
              style={{ paddingRight: 15 }}
            >
              Add API KEY
            </label>
            <Input placeholder="API KEY" />
          </div>
        </div>
      </AccordionContent>
    </Accordion.Item>
  );
};
