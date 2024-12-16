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
import { RgbaColorPicker, RgbaColor } from "react-colorful";
import Modal from "./modal";
import { PaintBucket, Maximize2, Maximize } from "lucide-react";
import { useCouponBuilder } from "@/app/coupon/CouponBuilderProvider";
import { rgbaObjectToString, rgbaStringToObject } from "@/lib/utils/rgbaHelper";
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

export const ToolbarShape = ({ item, isModalOpen, setIsModalOpen }) => {
  const [width, setWidth] = useState<string>(item?.width);
  const [height, setHeight] = useState<string>(item?.height);
  const [colorModal, setColorModal] = useState<boolean>(false);

  const [color, setColor] = useState<RgbaColor>(item?.backgroundColor && rgbaStringToObject(item?.backgroundColor));

  const { dispatch } = useCouponBuilder();

  console.log("color", color);

 
  const updateDimension = () => {
    console.log({
      type: "UPDATE_ELEMENT",
      payload: { id: item?.id, width, height },
    });
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: { id: item?.id, width, height },
    });
  };


  const handleSaveDimension = () => {
    console.log("Width:", width);
    console.log("Height:", height);
    updateDimension();
    setIsModalOpen(false);
  };

  const updateColor = () => {
    dispatch({ type: "UPDATE_ELEMENT", payload: { id: item?.id, backgroundColor: rgbaObjectToString(color) } });
  };
  const handleSaveColor = () => {
    console.log("color:", color);
    updateColor();
    setColorModal(false);
  };

  const removeElement = () => {
    dispatch({ type: "REMOVE_ELEMENT", payload: { id: item?.id } });
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
            <Dialog.Root>
              <Dialog.Trigger onClick={() => setIsModalOpen(true)}>
                <Maximize2  size={15}/>
              </Dialog.Trigger>
            </Dialog.Root>
            <Modal
              title={"Set Dimensions"}
              open={isModalOpen}
              setOpen={setIsModalOpen}
              handleSave={handleSaveDimension}
              width={300}
            >
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
            </Modal>
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
            value="bold"
            aria-label="Bold"
          >
            <Dialog.Root>
              <Dialog.Trigger onClick={() => setColorModal(true)}>
                <PaintBucket size={15} />
              </Dialog.Trigger>
            </Dialog.Root>
            <Modal
              title={"Set Color"}
              handleSave={handleSaveColor}
              open={colorModal}
              setOpen={setColorModal}
              width={300}
            >
              <div style={{ marginBottom: "10px" }}>
                <RgbaColorPicker color={color} onChange={(v) => setColor(v)} />
              </div>
            </Modal>
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
        <Toolbar.Separator className="mx-2.5 w-px bg-mauve6" />
      <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
        <Toolbar.ToggleItem
          className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-red3 hover:text-red11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-red7 data-[state=on]:bg-red5 data-[state=on]:text-red11"
          value="right"
          aria-label="Right aligned"
          onClick={() => removeElement()}
        >
          <TrashIcon />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      </Toolbar.Root>
    </>
  );
};

const ToolbarDemo = ({ editorRef, item,  setText, isEditing, }) => {
  const [quill, setQuill] = useState(null);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [value, setValue] = useState([]);
  const { state, dispatch } = useCouponBuilder();
  const [color, setColor] = useState<RgbaColor>(item?.color && rgbaStringToObject(item?.color));

  const updateFormat = (format) => {
    dispatch({ type: "UPDATE_ELEMENT", payload: { id: item?.id, format: item?.format } });
  };
  const [width, setWidth] = useState<string>(item?.width);
  const [height, setHeight] = useState<string>(item?.height);
  const [colorModal, setColorModal] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const removeElement = () => {
    dispatch({ type: "REMOVE_ELEMENT", payload: { id: item?.id } });
  };

  const updateDimension = () => {
    console.log({
      type: "UPDATE_ELEMENT",
      payload: { id: item?.id, width, height },
    });
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: { id: item?.id, width, height },
    });
  };
  const updateColor = () => {
    dispatch({ type: "UPDATE_ELEMENT", payload: { id: item?.id, backgroundColor: rgbaObjectToString(color) } });
  };
  const handleSaveColor = () => {
    console.log("color:", color);
    updateColor();
    setColorModal(false);
  };



  const handleSaveDimension = () => {
    console.log("Width:", width);
    console.log("Height:", height);
    updateDimension();
    setIsModalOpen(false);
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
      quillInstance.root.innerHTML = item?.text;

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
  }, []);

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
        <Toolbar.ToggleItem
            className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
            value="bold"
            aria-label="Bold"
          >
            <Dialog.Root>
              <Dialog.Trigger onClick={() => setIsModalOpen(true)}>
                <Maximize2  size={15}/>
              </Dialog.Trigger>
            </Dialog.Root>
            <Modal
              title={"Set Dimensions"}
              open={isModalOpen}
              setOpen={setIsModalOpen}
              handleSave={handleSaveDimension}
              width={300}
            >
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
            </Modal>
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
            value="bold"
            aria-label="Bold"
          >
            <Dialog.Root>
              <Dialog.Trigger onClick={() => setColorModal(true)}>
                <PaintBucket size={15} />
              </Dialog.Trigger>
            </Dialog.Root>
            <Modal
              title={"Set Color"}
              handleSave={handleSaveColor}
              open={colorModal}
              setOpen={setColorModal}
              width={300}
            >
              <div style={{ marginBottom: "10px" }}>
                <RgbaColorPicker color={color} onChange={(v) => setColor(v)} />
              </div>
            </Modal>
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
          onClick={() => removeElement()}
        >
          <TrashIcon />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
};

export default ToolbarDemo;
