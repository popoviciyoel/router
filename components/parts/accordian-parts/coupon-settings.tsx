import {
  AccordionContent,
  AccordionTrigger,
} from "@/components/parts/accordian";
import * as Accordion from "@radix-ui/react-accordion";
import { Input } from "@/components/ui/input";
import { useCouponBuilder } from "@/app/coupon/CouponBuilderProvider";
import RadioGroupDemo from "../radio-group";
import { Separator } from "@/components/ui/separator";

const CouponSettings = () => {
  const { state, dispatch } = useCouponBuilder();

  const setCouponName = (e) => {
    dispatch({ type: "SET_COUPON_NAME", payload: e.target.value });
  };

  const setCouponEffects = (value) => {
    console.log('value', value)
    dispatch({ type: "SET_COUPON_EFFECT", payload: {effect: value} });
  };

  return (
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
          <Input
            placeholder="Add Coupon Name"
            value={state?.name}
            onChange={setCouponName}
          />
        </div>
        <Separator className=" my-2" />
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            className="Label"
            htmlFor="airplane-mode"
            style={{ paddingRight: 15 }}
          >
            Background Effects
          </label>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <RadioGroupDemo
            defaultValue={state?.effect}
            onHandle={setCouponEffects}
            labels={["Off", "Snow Ball", "Firework", "Confetti"]}
          />
        </div>
      </AccordionContent>
    </Accordion.Item>
  );
};

export { CouponSettings };
