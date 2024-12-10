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
  FontStyleIcon,
  ColorWheelIcon,
} from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ModalWithInputs from "./modal-input";
import Quill from "quill";
import "./styles.css";
import ScrollAreaDemo from "./scroll-area";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { HexColorPicker } from "react-colorful";
import { PaintBucket, Maximize2 } from "lucide-react";
import { useCouponBuilder } from "@/app/coupon/CouponBuilderProvider";
const Fonts = [
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
const FontSizes = [
  "8px",
  "9px",
  "10px",
  "12px",
  "14px",
  "16px",
  "20px",
  "22px",
  "24px",
  "26px",
  "28px",
  "30px",
  "32px",
  "34px",
  "36px",
  "38px",
  "40px",
  "42px",
  "44px",
  "46px",
  "48px",
  "50px",
  "52px",
  "54px",
  "56px",
  "58px",
  "60px",
];

export const ToolbarShape = ({
  editorRef,
  setWidth,
  setHeight,
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleSave = () => {
    console.log("Width:", width);
    console.log("Height:", height);
    setIsModalOpen(false);
  };

  return (
    <>
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
          >
            <Dialog.Root onOpenChange={() => setIsModalOpen(!isModalOpen)}>
              <Dialog.Trigger asChild>
                <Maximize2 />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay
                  style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                  }}
                />

                <Dialog.Content
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "20px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    minWidth: "300px",
                  }}
                >
                  <Dialog.Title
                    style={{
                      marginBottom: "15px",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Set Dimensions
                  </Dialog.Title>

                  <div style={{ marginBottom: "10px" }}>
                    <label
                      htmlFor="width"
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontSize: "14px",
                      }}
                    >
                      Width
                    </label>
                    <input
                      id="width"
                      type="text"
                      onChange={(e) => setWidth(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "15px" }}>
                    <label
                      htmlFor="height"
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontSize: "14px",
                      }}
                    >
                      Height
                    </label>
                    <input
                      id="height"
                      type="text"
                      onChange={(e) => setHeight(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Dialog.Close asChild>
                      <Button className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-red3 hover:text-red11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-red7 data-[state=on]:bg-red5 data-[state=on]:text-red11">
                        Cancel
                      </Button>
                    </Dialog.Close>

                    <Button
                      onClick={handleSave}
                      className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                    >
                      Save
                    </Button>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
            value="bold"
            aria-label="Bold"
          >
            <Dialog.Root onOpenChange={() => setIsModalOpen(!isModalOpen)}>
              <Dialog.Trigger asChild>
                <PaintBucket />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay
                  style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                  }}
                />

                <Dialog.Content
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "20px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    minWidth: "300px",
                  }}
                >
                  <Dialog.Title
                    style={{
                      marginBottom: "15px",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Set Color
                  </Dialog.Title>

                  <div style={{ marginBottom: "10px" }}>
                    <HexColorPicker />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Dialog.Close asChild>
                      <Button className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-red3 hover:text-red11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-red7 data-[state=on]:bg-red5 data-[state=on]:text-red11">
                        Cancel
                      </Button>
                    </Dialog.Close>

                    <Button
                      onClick={handleSave}
                      className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                    >
                      Save
                    </Button>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
      </Toolbar.Root>
    </>
  );
};

const ToolbarDemo = ({ editorRef, text, setText, isEditing, format, id }) => {
  const [quill, setQuill] = useState(null);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [value, setValue] = useState([]);
  const { state, dispatch } = useCouponBuilder();
  const updateFormat = (format) => {
    dispatch({ type: "UPDATE_ELEMENT", payload: { id, format } });
  };

  useEffect(() => {
    if (editorRef.current && isEditing) {
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
      Size.whitelist = FontSizes;
      Quill.register(Size, true);

      const Align = Quill.import("attributors/style/align");
      Align.whitelist = ["left", "center", "right"];
      Quill.register(Align, true);

      const Font = Quill.import("attributors/style/font");
      Font.whitelist = Fonts;

      Quill.register(Font, true);
      console.log("mounted");

      setQuill(quillInstance);
      // Load initial content
      quillInstance.root.innerHTML = text;

      // Listen for text changes
      quillInstance.on("text-change", () => {
        const htmlContent = quillInstance.root.innerHTML;
        console.log("Content updated:", htmlContent);
        const currentSelection = quillInstance.getSelection(); // Get current selection

        // setText(htmlContent); // Save changes to parent state
        quillInstance.setSelection(currentSelection); // Restore selection after formatting
      });

      return () => {
        setText(quillInstance.root.innerHTML);

        const delta = quillInstance.getContents(); // Get Delta object
        const appliedFormats = new Set<string>();

        // Iterate through the delta to get applied formats
        delta.ops?.forEach((op) => {
          if (op.attributes) {
            // Add each attribute key to the Set
            Object.keys(op.attributes).forEach((attribute) => {
              appliedFormats.add(attribute);
            });
          }
        });

        // updateFormat(appliedFormats);
      };
    }
  }, [text]);

  const applyFormat = (format, value) => {
    console.log("apply format", quill);

    if (!quill) return;
    quill.focus();
    const currentSelection = quill.getSelection(); // Get current selection

    console.log("currentSelection", currentSelection);
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
        currentFormat[format] = !isCurrentlyApplied;
        quill.format(format, !isCurrentlyApplied); // Toggle format
        console.log("currentFormat", currentFormat);
      }

      quill.setSelection(currentSelection); // Restore selection after formatting
    }
  };

  // Toolbar Button Handlers
  const handleBold = () => applyFormat("bold");
  const handleItalic = () => applyFormat("italic");
  const handleUnderline = () => applyFormat("underline");
  const handleStrike = () => applyFormat("strike");
  const handleFontSize = (fontSize: string) => applyFormat("size", fontSize);
  const handleFontStyle = (fontStyle: string) => applyFormat("font", fontStyle);

  const handleAlignmentRight = () => applyFormat("align", "right");
  const handleFontMonospace = () => applyFormat("font", "monospace");

  console.log("quill", quill);
  // console.log(format?.has("bold"));
  console.log("format", format);

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
      <Toolbar.ToggleGroup
        type="multiple"
        // value={value}
        aria-label="Text formatting"
        // onValueChange={(value) => {
        //   console.log("value", value);

        //   if (!quill) return;

        //   quill.focus();
        //   const currentSelection = quill.getSelection(); // Get current selection

        //   console.log("currentSelection", currentSelection);
        //   if (currentSelection) {
        //     // const currentFormat = quill.getFormat(currentSelection); // Get current formats
        //     updateFormat(value);

        //     quill.setSelection(currentSelection); // Restore selection after formatting
        //   }
        // }}
      >
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="bold"
          aria-label="Bold"
          onClick={handleBold}
          // data-state={format?.includes("bold") ? "on" : "off"}
        >
          <FontBoldIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="italic"
          aria-label="Italic"
          onClick={handleItalic}
        >
          <FontItalicIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="strikethrough"
          aria-label="Strike through"
          onClick={handleStrike}
        >
          <StrikethroughIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="underline"
          aria-label="underline"
          onClick={handleUnderline}
        >
          <UnderlineIcon />
        </Toolbar.ToggleItem>

        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="size"
          aria-label="size"
        >
          <DropdownMenu.Root
            onOpenChange={(open) => {
              console.log("open", open);
              setOpenDropDown(open);
            }}
          >
            <Toolbar.Button>
              <DropdownMenu.Trigger>
                <FontSizeIcon />
              </DropdownMenu.Trigger>
            </Toolbar.Button>

            {openDropDown && (
              <DropdownMenu.Content
                className="DropdownMenuContent"
                sideOffset={20}
                style={{ backgroundColor: "transparent", boxShadow: "none" }}
              >
                <ScrollAreaDemo
                  list={FontSizes}
                  header={"Font Size"}
                  handler={(fontSize: string) => {
                    handleFontSize(fontSize);
                    setOpenDropDown(false);
                  }}
                />
              </DropdownMenu.Content>
            )}
          </DropdownMenu.Root>
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
          value="fontStyle"
          aria-label="Font style"
          // onMouseDown={(e) => e.preventDefault()}
          // onClick={handleSize}
        >
          <DropdownMenu.Root onOpenChange={(open) => setOpenDropDown(open)}>
            <Toolbar.Button>
              <DropdownMenu.Trigger>
                <FontStyleIcon />
              </DropdownMenu.Trigger>
            </Toolbar.Button>

            {openDropDown && (
              <DropdownMenu.Content
                className="DropdownMenuContent"
                sideOffset={20}
              >
                <ScrollAreaDemo
                  list={Fonts}
                  header={"Font Style"}
                  handler={(fontSize: string) => {
                    handleFontStyle(fontSize);
                    setOpenDropDown(false);
                  }}
                />
              </DropdownMenu.Content>
            )}
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
