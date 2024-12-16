import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import "./radio-group-styles.css";

const RadioGroupDemo = ({ defaultValue,  labels, onHandle }) => (
  <form>
    <RadioGroup.Root
      className="RadioGroupRoot"
      defaultValue={defaultValue}
      aria-label="View density"
      onValueChange={(value) => {
        onHandle(value)
      }}
    >
      {labels.map((label) => (
        <div key={label} style={{ display: "flex", alignItems: "center" }} >
          <RadioGroup.Item className="RadioGroupItem" value={label} id={`r${label}`}>
            <RadioGroup.Indicator className="RadioGroupIndicator" />
          </RadioGroup.Item>
          <label className="Label" htmlFor={`r${label}`}>
            {label}
          </label>
        </div>
      ))}
    </RadioGroup.Root>
  </form>
);

export default RadioGroupDemo;
