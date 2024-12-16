import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDownIcon, PlusIcon } from "@radix-ui/react-icons";
import "./accordian-styles.css";
import { Switch } from "../ui/switch";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Header } from "./header";
import RadioGroupDemo from "./radio-group";
import ClickTheTargetOptions from "@/components/parts/gameOptions/clickTheTarget";
import ImageUploader from "./image-uploader";
import { useGameBuilder } from "../../app/build/GameBuilderProvider";

import { CouponCodesUploader } from "./accordian-parts/coupon-codes-uploader";
import { CouponNotifications } from "./accordian-parts/coupon-send-email-leads";
import { CouponDesignElements } from "./accordian-parts/coupon-design-elements";
import { CouponSettings } from "./accordian-parts/coupon-settings";
import { CRMIntegration } from "./accordian-parts/coupon-integrations";


const AccordionDemo = () => {
  return (
    <Accordion.Root
      className="AccordionRoot"
      type="single"
      defaultValue="item-0"
      collapsible
    >
      <CouponSettings />
      <CouponDesignElements />
      <CouponNotifications />
      {/* <CRMIntegration /> */}
      <CouponCodesUploader />
    </Accordion.Root>
  );
};

export const AccordionDemo2 = () => {
  const { state, dispatch } = useGameBuilder();

  // Helper function to set background
  const setBackground = (background: string) => {
    dispatch({ type: "SET_BACKGROUND", payload: background });
  };

  return (
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
            <ImageUploader
              direction="Upload Background"
              imageHandler={setBackground}
            />
          </div>
        </AccordionContent>
      </Accordion.Item>

      <Accordion.Item className="AccordionItem" value="item-3">
        <AccordionTrigger>Rewards</AccordionTrigger>
        <Accordion.Content className="AccordionContent">
          <div
            style={{ display: "flex", alignItems: "center", margin: "2em 0px" }}
          >
            <label
              className="Label"
              htmlFor="airplane-mode"
              style={{ paddingRight: 15 }}
            >
              Add Losing
            </label>
            <Switch />
          </div>
          <div
            style={{ display: "flex", alignItems: "center", margin: "2em 0px" }}
          >
            <label
              className="Label"
              htmlFor="airplane-mode"
              style={{ paddingRight: 15 }}
            >
              Add Expiration Time
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "10em",
                    justifyContent: "space-between",
                  }}
                >
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "10em",
                    justifyContent: "space-between",
                  }}
                >
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
      <ClickTheTargetOptions />

      <Accordion.Item className="AccordionItem" value="item-3">
        <AccordionTrigger>Settings</AccordionTrigger>
        <Accordion.Content className="AccordionContent">
          <div className="AccordionContentText">Background Effects</div>
          <RadioGroupDemo
            labels={["Off", "Snow Ball", "Firework", "Confetti"]}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export const AccordionTrigger = React.forwardRef(
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

export const AccordionContent = React.forwardRef(
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

AccordionContent.displayName = "AccordionContent";

export default AccordionDemo;
