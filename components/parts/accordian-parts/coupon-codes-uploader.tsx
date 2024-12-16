// Component Responsible for Letting Users upload coupon codes

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useCouponBuilder } from "@/app/coupon/CouponBuilderProvider";
import { UploadParser } from "@/components/parts/codes-uploader";
import { AccordionTrigger } from "@/components/parts/accordian";

const CouponCodesUploader = () => {
  const { state, dispatch } = useCouponBuilder();

  const setCouponCodeType = (value) => {
    dispatch({ type: "ADD_COUPON_CODE_TYPE", payload: value });
  };

  const setCouponCodes = (e) => {
    const value = e.target.value;
    dispatch({
      type: "ADD_SINGLE_COUPON_CODE",
      payload: { coupons: [value] },
    });
  };

  const setCouponCodesQuanitity = (e) => {
    const value = e.target.value;
    dispatch({
      type: "ADD_SINGLE_COUPON_QUANTITY",
      payload: { couponQuantity: Number(value) },
    });
  };

  return (
    <Accordion.Item className="AccordionItem" value="item-4">
      <AccordionTrigger>Upload Coupon Codes</AccordionTrigger>
      <Accordion.Content className="AccordionContent">
        <div
          style={{ display: "flex", alignItems: "center", margin: "2em 0px" }}
        >
          <label
            className="Label"
            htmlFor="airplane-mode"
            style={{ paddingRight: 15 }}
          >
            Award Players Coupon?
          </label>
          <Switch
            defaultChecked={state?.couponCodeType !== null}
            onClick={() => {
              const value = state?.couponCodeType === null ? "Unique" : null;
              setCouponCodeType(value);
            }}
          />
        </div>
        {state?.couponCodeType !== null && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "2em 0px",
              }}
            >
              <label
                className="Label"
                htmlFor="airplane-mode"
                style={{ paddingRight: 15 }}
              >
                {state?.couponCodeType === "Single"
                  ? "Single Code"
                  : "Unique Codes"}
              </label>
              <Switch
                defaultChecked={state?.couponCodeType === "Single"}
                onClick={() => {
                  const value =
                    state?.couponCodeType === "Single" ? "Unique" : "Single";
                  setCouponCodeType(value);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "2em 0px",
                paddingLeft: "15px",
                maxWidth: "19em",
              }}
            >
              <Card>
                {state?.couponCodeType === "Single" ? (
                  <>
                    <CardHeader> Enter Code</CardHeader>
                    <CardContent>
                      <Input
                        placeholder="Add Coupon Code"
                        onChange={setCouponCodes}
                      />
                    </CardContent>
                    <CardHeader> Enter Quantity</CardHeader>
                    <CardContent>
                      <Input
                        placeholder="E.g. 500"
                        onChange={setCouponCodesQuanitity}
                      />
                    </CardContent>
                  </>
                ) : (
                  <UploadParser />
                )}
              </Card>
            </div>
          </>
        )}
      </Accordion.Content>
    </Accordion.Item>
  );
};

export { CouponCodesUploader };
