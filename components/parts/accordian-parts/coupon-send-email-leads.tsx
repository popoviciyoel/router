import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AccordionContent,
  AccordionTrigger,
} from "@/components/parts/accordian";
import { useCouponBuilder } from "@/app/coupon/CouponBuilderProvider";

const CouponNotifications = () => {
  const { state, dispatch } = useCouponBuilder();

  const setEmailLeadsNotification = (value) => {
    dispatch({
      type: "ADD_EMAIL_LEAD_NOTIFICATION",
      payload: { emailLeadNotification: value },
    });
  };
  return (
    <Accordion.Item className="AccordionItem" value="item-2">
      <AccordionTrigger>Send leads to email</AccordionTrigger>
      <AccordionContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            className="Label"
            htmlFor="airplane-mode"
            style={{ paddingRight: 15, margin: "2em 0px" }}
          >
            Send leads to email
          </label>
          <Switch
            defaultValue={state?.emailLeadNotification}
            onCheckedChange={(value) => setEmailLeadsNotification(value)}
          />
        </div>
        <Card>
          <CardHeader> Recipient</CardHeader>
          <CardContent>
            <Input placeholder="Add Recipient Email" />
          </CardContent>
        </Card>
      </AccordionContent>
    </Accordion.Item>
  );
};

export { CouponNotifications };
