"use client";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Dragger from "./components/Dragger";
import DraggableItem from "./components/DraggableText";
import Sandbox from "./components/SandBox";
import DraggableFormInput from "./components/DraggableFormInput";
import DraggableButton from "./components/DraggableButton";
import DraggableImageInput from "./components/DraggableImage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import ToolbarDemo from "@/components/parts/tool-bar";
import HoverCardDemo from "@/components/parts/card";
import AccordionDemo from "@/components/parts/accordian";
const pageData = {
  name: "Coupon",
  title: "Coupon",
  description: "Create a Coupon",
};
const SubmitIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z"
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
  </svg>
);
const CloseIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
  </svg>
);
const RedirectIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z"
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
    <path
      d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z"
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
    <path
      d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z"
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
    <path
      d="M7.49996 3.95801C9.66928 3.95801 11.8753 4.35915 13.3706 5.19448 13.5394 5.28875 13.5998 5.50197 13.5055 5.67073 13.4113 5.83948 13.198 5.89987 13.0293 5.8056 11.6794 5.05155 9.60799 4.65801 7.49996 4.65801 5.39192 4.65801 3.32052 5.05155 1.97064 5.8056 1.80188 5.89987 1.58866 5.83948 1.49439 5.67073 1.40013 5.50197 1.46051 5.28875 1.62927 5.19448 3.12466 4.35915 5.33063 3.95801 7.49996 3.95801zM7.49996 10.85C9.66928 10.85 11.8753 10.4488 13.3706 9.6135 13.5394 9.51924 13.5998 9.30601 13.5055 9.13726 13.4113 8.9685 13.198 8.90812 13.0293 9.00238 11.6794 9.75643 9.60799 10.15 7.49996 10.15 5.39192 10.15 3.32052 9.75643 1.97064 9.00239 1.80188 8.90812 1.58866 8.9685 1.49439 9.13726 1.40013 9.30601 1.46051 9.51924 1.62927 9.6135 3.12466 10.4488 5.33063 10.85 7.49996 10.85z"
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
  </svg>
);
export default function Page() {
  const [view, setView] = useState("blank");
  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        {/* <Header title={pageData?.title}>{pageData?.description}</Header> */}

        <Tabs defaultValue="blank" onChange={(e) => console.log("e", e)}>
          <TabsList>
            <TabsTrigger value="blank" onClick={() => console.log("blank")}>
              Create Coupon
            </TabsTrigger>
            <TabsTrigger value="template">My Coupons</TabsTrigger>
            <TabsTrigger value="library">Community Coupons</TabsTrigger>
          </TabsList>
        </Tabs>

        <Separator className=" my-3 " />

        {view === "blank" && (
          <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2>Drag-and-Drop Coupon Builder</h2>
                <div style={{}}>
                  {/* Sidebar for Draggable Items */}
                  <DraggableItem text="Text" />
                  <DraggableFormInput />

                  {/* <DraggableButton /> */}
                  <DraggableImageInput />
                  <HoverCardDemo
                    content={[
                      <DraggableButton
                        key={0}
                        text={"Submit Button"}
                        action={"submit"}
                        icon={<SubmitIcon />}
                      />,
                      <DraggableButton
                        key={1}
                        text={"Close Button"}
                        action={"close"}
                        icon={<CloseIcon />}
                      />,
                      <DraggableButton
                        key={2}
                        text={"Redirect Button"}
                        action={"redirect"}
                        icon={<RedirectIcon />}
                      />,
                    ]}
                  />
                  <AccordionDemo />
                </div>
              </div>
              <div>
                <Dragger />
              </div>
            </div>
          </DndProvider>
        )}
      </PageWrapper>
    </>
  );
}
