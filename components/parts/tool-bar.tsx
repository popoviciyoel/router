import React, { useEffect, useState } from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
  TrashIcon,
  UnderlineIcon,
  FontSizeIcon,
  FontStyleIcon
} from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import Quill from "quill";
import "./styles.css";


const ToolbarDemo = ({ editorRef, setText }) => {
  const [quill, setQuill] = useState(null);

  useEffect(() => {
    if (editorRef.current) {
      const quillInstance = new Quill(editorRef.current, {
        theme: "snow", // You can remove this if you don't want default styling
        modules: {
          toolbar: false, // Disable default toolbar
                // Add align module
        align: {},
        },
      });

      // Set available sizes and fonts
      const Size = Quill.import("attributors/style/size");
      Size.whitelist = ["small", "medium", "large", "larger"];
      Quill.register(Size, true);

      const Align = Quill.import("attributors/style/align");
      Align.whitelist = ["left", "center", "right"];
      Quill.register(Align, true);
    
    
      const Font = Quill.import("attributors/style/font");
      Font.whitelist = [
        "serif",
        "monospace",
        "arial",
        "times-new-roman",
        "helvetica",
        "verdana",
        "georgia",
        "roboto",
        "open-sans",
        "montserrat",
      ];
      
      Quill.register(Font, true);

      setQuill(quillInstance);
      return () => {
        // setText(quillInstance.getSemanticHTML())
        console.log("closeing tab");

        // Detach all event listeners
        quillInstance.off("text-change");
        quillInstance.off("selection-change");
      };
    }
  }, []);

  const applyFormat = (format, value) => {
    if (!quill) return;

    const currentSelection = quill.getSelection(); // Get current selection
    if (currentSelection) {
      const currentFormat = quill.getFormat(currentSelection); // Get current formats
      console.log("format", format, "value", value);

      if (typeof value === "string") {
        // If a specific value is provided (e.g., size or font), apply it directly
        console.log("in format ");
        quill.focus(); // Ensure the editor is focused

        quill.format(format, value);
      } else {
        // For togglable formats like bold or italic
        console.log("in lese");
        const isCurrentlyApplied = currentFormat[format]; // Check if format is applied
        quill.format(format, !isCurrentlyApplied); // Toggle format
      }

      quill.setSelection(currentSelection); // Restore selection after formatting
    }
  };

  // Toolbar Button Handlers
  const handleBold = () => applyFormat("bold");
  const handleItalic = () => applyFormat("italic");
  const handleUnderline = () => applyFormat("underline");
  const handleStrike = () => applyFormat("strike");
  const handleSizeSmall = () => applyFormat("size", "small");
  const handleSizeMedium = () => applyFormat("size", "medium");
  const handleSizeLarge = () => applyFormat("size", "large");
  const handleSizeHuge = () => applyFormat("size", "larger");
  const handleAlignmentRight = () => applyFormat("align", "right");
  const handleFontMonospace = () => applyFormat("font", "monospace");
  const handleFontArial = () => applyFormat("font", "arial");
  const handleFontSerif = () => applyFormat("font", "serif");
  const handleFontTimeNewRoman = () => applyFormat("font", "times-new-roman");
  const handleFontHelvetica = () => applyFormat("font", "helvetica");
  const handleFontVerdana = () => applyFormat("font", "verdana");
  const handleFontGeorgia = () => applyFormat("font", "georgia");
  const handleFontRoboto = () => applyFormat("font", "roboto");
  const handleFontOpenSans = () => applyFormat("font", "open-sans");
  const handleFontMontserrat = () => applyFormat("font", "montserrat");




  return (
    <Toolbar.Root
      style={{
        transform: "translate(-25%, -110%)",
        position: "absolute",
        zIndex: "10000",
      }}
      className="flex w-full min-w-max rounded-md bg-white p-2.5 shadow-[0_2px_10px] shadow-blackA4"
      aria-label="Formatting options"
    >
      <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="bold"
          aria-label="Bold"
          // onMouseDown={(e) => e.preventDefault()}
          onClick={handleBold}
        >
          <FontBoldIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="italic"
          aria-label="Italic"
          // onMouseDown={(e) => e.preventDefault()}
          onClick={handleItalic}
        >
          <FontItalicIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="strikethrough"
          aria-label="Strike through"
          // onMouseDown={(e) => e.preventDefault()}
          onClick={handleStrike}
        >
          <StrikethroughIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="underline"
          aria-label="underline"
          // onMouseDown={(e) => e.preventDefault()}
          onClick={handleUnderline}
        >
          <UnderlineIcon />
        </Toolbar.ToggleItem>

        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="size"
          aria-label="size"
          // onMouseDown={(e) => e.preventDefault()}
          // onClick={handleSize}
        >
          <DropdownMenu.Root>
            <Toolbar.Button >
              <DropdownMenu.Trigger>
                <FontSizeIcon />
              </DropdownMenu.Trigger>
            </Toolbar.Button>

            <DropdownMenu.Content  className="DropdownMenuContent" sideOffset={20}>
              {/* <DropdownMenu.Group> */}
                <DropdownMenu.Item className="DropdownMenuItem" onClick={handleSizeSmall}>Small</DropdownMenu.Item>
                {/* <DropdownMenu.Separator /> */}

                <DropdownMenu.Item className="DropdownMenuItem" onClick={handleSizeMedium}>Normal</DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem" onClick={handleSizeLarge}>Large</DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem" onClick={handleSizeHuge}>Huge</DropdownMenu.Item>

              {/* </DropdownMenu.Group> */}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="fontStyle"
          aria-label="Font style"
          // onMouseDown={(e) => e.preventDefault()}
          // onClick={handleSize}
        >
          <DropdownMenu.Root>
            <Toolbar.Button >
              <DropdownMenu.Trigger>
                <FontStyleIcon />
              </DropdownMenu.Trigger>
            </Toolbar.Button>

            <DropdownMenu.Content  className="DropdownMenuContent" sideOffset={20} >
                <DropdownMenu.Item className="DropdownMenuItem" onClick={handleFontArial}>Arial</DropdownMenu.Item>

                <DropdownMenu.Item className="DropdownMenuItem" onClick={handleFontMonospace}>MonoSpace</DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem" onClick={handleFontSerif}>Serif</DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem" onClick={handleFontTimeNewRoman}>Time New Roman</DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem" onClick={handleFontHelvetica}>Helvetica</DropdownMenu.Item>

                <DropdownMenu.Item className="DropdownMenuItem" onClick={handleFontVerdana}>Verdana</DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem" onClick={handleFontGeorgia}>Georgia</DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem" onClick={handleFontRoboto}>Roboto</DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem" onClick={handleFontOpenSans}>Open Sans</DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem" onClick={handleFontMontserrat}>Montserrat</DropdownMenu.Item>

     
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className="mx-2.5 w-px bg-mauve6" />
      <Toolbar.ToggleGroup
        type="single"
        defaultValue="center"
        aria-label="Text alignment"
      >
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="left"
          aria-label="Left aligned"
        >
          <TextAlignLeftIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="center"
          aria-label="Center aligned"
        >
          <TextAlignCenterIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="right"
          aria-label="Right aligned"
          onClick={handleAlignmentRight}

        >
          <TextAlignRightIcon />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className="mx-2.5 w-px bg-mauve6" />
      <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-red3 hover:text-red11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-red7 data-[state=on]:bg-red5 data-[state=on]:text-red11"
          value="right"
          aria-label="Right aligned"
        >
          <TrashIcon />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
};

export default ToolbarDemo;
