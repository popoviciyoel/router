import React from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


const RedirectLinkBar = ({}: any) => (
  <Toolbar.Root
    style={{ position: "absolute", zIndex: '100000' }}
    className="flex w-full min-w-max rounded-md bg-white p-1 shadow-[0_2px_10px] shadow-blackA4 mt-2"
    aria-label="Formatting options"
  >
    <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
      <Toolbar.ToggleItem
        className="ml-0.5 inline-flex h-[25px] py-5 flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 focus:relative focus:shadow-[0_0_0_2px]"
        value="bold"
        aria-label="Bold"
      >
       <Label className=" flex items-center">
         Redirect Link
        <Input className=" max-h-7"></Input>
       </Label>
      </Toolbar.ToggleItem>

    </Toolbar.ToggleGroup>
  </Toolbar.Root>
);

export default RedirectLinkBar;
