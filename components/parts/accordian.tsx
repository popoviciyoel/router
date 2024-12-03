import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDownIcon, PlusIcon } from "@radix-ui/react-icons";
import "./stylesAccordian.css";
import { Switch } from "../ui/switch";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Header } from "./header";

const AccordionDemo = () => (
  <Accordion.Root
    className="AccordionRoot"
    type="single"
    defaultValue="item-0"
    collapsible
  >
    <Accordion.Item className="AccordionItem" value="item-0">
      <AccordionTrigger>Settings</AccordionTrigger>
      <AccordionContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            className="Label"
            htmlFor="airplane-mode"
            style={{ paddingRight: 15 }}
          >
            Coupon Name
          </label>
          <Input placeholder="Add  Coupon Name" />
        </div>
      </AccordionContent>
    </Accordion.Item>
    <Accordion.Item className="AccordionItem" value="item-1">
      <AccordionTrigger>Send leads to email</AccordionTrigger>
      <AccordionContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            className="Label"
            htmlFor="airplane-mode"
            style={{ paddingRight: 15 }}
          >
            Send leads to email
          </label>
          <Switch />
        </div>
        <Card>
          <CardHeader> Recipient</CardHeader>
          <CardContent>
            <Input placeholder="Add Recipient Email" />
          </CardContent>
        </Card>
      </AccordionContent>
    </Accordion.Item>
    <CRMIntegration />

    <Accordion.Item className="AccordionItem" value="item-3">
      <AccordionTrigger>Can it be animated?</AccordionTrigger>
      <Accordion.Content className="AccordionContent">
        <div className="AccordionContentText">
          Yes! You can animate the Accordion with CSS or JavaScript.
        </div>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);

export const AccordionDemo2 = () => (
  <Accordion.Root
    className="AccordionRoot"
    type="single"
    defaultValue="item-0"
    collapsible
  >
    <Accordion.Item className="AccordionItem" value="item-0">
      <AccordionTrigger>Background</AccordionTrigger>
      <AccordionContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            className="Label"
            htmlFor="airplane-mode"
            style={{ paddingRight: 15 }}
          >
            Upload Background
          </label>
          <Input type="file" />
        </div>
      </AccordionContent>
    </Accordion.Item>
    <Accordion.Item className="AccordionItem" value="item-1">
      <AccordionTrigger>Options</AccordionTrigger>
      <AccordionContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            className="Label"
            htmlFor="airplane-mode"
            style={{ paddingRight: 15 }}
          >
            Upload Products
          </label>
          <Input type="file" />
        </div>
        <Separator />
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            className="Label"
            htmlFor="airplane-mode"
            style={{ paddingRight: 15 }}
          >
            Number of Coupons / Prizes
          </label>
          <Input type="text" />
        </div>
      </AccordionContent>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-3">
      <AccordionTrigger>Rewards</AccordionTrigger>
      <Accordion.Content className="AccordionContent">
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            className="Label"
            htmlFor="airplane-mode"
            style={{ paddingRight: 15 }}
          >
            Add Losing
          </label>
          <Switch />
        </div>
        <Card>
          <CardHeader> Level 1</CardHeader>
          <CardContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", width: '10em', justifyContent: "space-between", }}>
                Score: <Input type="text" style={{ width: "3em" }} /> -
                <Input type="text" style={{ width: "3em" }} />
              </div>
              <Button>
                <PlusIcon />
              </Button>
            </div>
          </CardContent>
          <CardHeader> Level 2</CardHeader>
          <CardContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", width: '10em', justifyContent: "space-between", }}>
                Score: <Input type="text" style={{ width: "3em" }} /> -
                <Input type="text" style={{ width: "3em" }} />
              </div>
              <Button>
                <PlusIcon />
              </Button>
            </div>
          </CardContent>
        </Card>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-3">
      <AccordionTrigger>Settings</AccordionTrigger>
      <Accordion.Content className="AccordionContent">
        <div className="AccordionContentText">Background Effects</div>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className={classNames("AccordionTrigger", className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon className="AccordionChevron" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Content
      className={classNames("AccordionContent", className)}
      {...props}
      ref={forwardedRef}
    >
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  )
);

const CRMIntegration = () => {
  const [active, setActive] = useState("Hubspot");
  const handleCRM = (value: string) => setActive(value);
  return (
    <Accordion.Item className="AccordionItem" value="item-2">
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

AccordionContent.displayName = "AccordionContent";

export default AccordionDemo;
