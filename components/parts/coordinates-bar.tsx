import React from "react";
import * as Toolbar from "@radix-ui/react-toolbar";


const CoordinatesBar = ({ x, y }: any) => (
  <Toolbar.Root
    // style={{ transform: "translate(-25%, -110%)", position: "absolute" }}
    className="flex w-full min-w-max rounded-md bg-white p-1 shadow-[0_2px_10px] shadow-blackA4"
    aria-label="Formatting options"
  >
    <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
      <Toolbar.ToggleItem
        className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
        value="bold"
        aria-label="Bold"
      >
        x: {x}px
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
        value="italic"
        aria-label="Italic"
      >
        y: {y}px
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
  </Toolbar.Root>
);

export default CoordinatesBar;
