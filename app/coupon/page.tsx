"use client";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Dragger from "@/components/Dragger";
import {

  TrashIcon,

} from "@radix-ui/react-icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import ToolbarDemo from "@/components/parts/tool-bar";
import AccordionDemo from "@/components/parts/accordian";
import {
  CouponBuilderProvider,
  useCouponBuilder,
} from "./CouponBuilderProvider";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { ViewOnlyCoupon } from "@/components/parts/view-only-coupon";
import Modal from "@/components/parts/modal";
import { Check } from "lucide-react";

const pageData = {
  name: "Coupon",
  title: "Coupon",
  description: "Create a Coupon",
};

export function Summary() {
  const { state } = useCouponBuilder();
  const coupons = [
    { code: "XYZ123", quantity: 5 },
    { code: "ABC456", quantity: 10 },
  ];

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Summary</h1>
      <ul className="space-y-2">
        <li className="flex items-start">
          <Check className="text-green-600 w-5 h-5 mr-2 mt-1" />
          <div>
            <span className="text-lg font-medium">Name</span>
            <ul className="mt-2 pl-6 space-y-1">
              <li className="flex justify-between items-center text-sm bg-gray-100 p-2 rounded-lg shadow-sm">
                <span className="font-mono text-gray-700">{state?.name}</span>
              </li>
            </ul>
          </div>
        </li>
        <li className="flex items-start">
          <Check className="text-green-600 w-5 h-5 mr-2 mt-1" />
          <div>
            <span className="text-lg font-medium">Coupons</span>
            <ul className="mt-2 pl-6 space-y-1">
              {coupons.map((coupon, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-sm bg-gray-100 p-2 rounded-lg shadow-sm"
                >
                  <span className="font-mono text-gray-700">{coupon.code}</span>
                  <span className="text-gray-600">
                    Quantity: {coupon.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

function CouponBuilder() {
  const [view, setView] = useState("blank");
  const [openSaveModal, setOpenSaveModal] = useState(false);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 equal columns
    gap: "20px", // space between grid items
    padding: "20px", // space around the grid
  };
  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />

      <PageWrapper>
        {/* <Header title={pageData?.title}>{pageData?.description}</Header> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tabs defaultValue="blank">
            <TabsList>
              <TabsTrigger value="blank" onClick={() => setView("blank")}>
                Create Coupon
              </TabsTrigger>
              <TabsTrigger value="template" onClick={() => setView("template")}>
                My Coupons
              </TabsTrigger>
              {/* <TabsTrigger value="library">Community Coupons</TabsTrigger> */}
            </TabsList>
          </Tabs>
          <Button size={"sm"} onClick={() => setOpenSaveModal(true)}>Save</Button>
          <Modal
            title={"Save Coupon"}
            open={openSaveModal}
            setOpen={setOpenSaveModal}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div style={{}}>
                  <ViewOnlyCoupon />
                </div>
              </div>
              <Summary />
            </div>
          </Modal>
        </div>

        <Separator className=" my-3 " />

        {view === "blank" && (
          <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div style={{}}>
                  <AccordionDemo />
                </div>
              </div>
              <div>
                <Dragger />
              </div>
            </div>
          </DndProvider>
        )}
        {view === "template" && (
          <div>
            <div style={gridStyle}>
              <div className=" flex flex-col items-center">
                <b>test name</b>
                <ViewOnlyCoupon width={300 * 0.6} height={500 * 0.6} />
                <div style={{maxWidth: 180, justifyContent: 'space-between', display: 'flex'}}>
                <Button size={"sm"} >Edit <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-pen-line"><path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"/><path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><path d="M8 18h1"/></svg></Button>
                <Button size={"sm"}>Delete <TrashIcon/> </Button>
                </div>
             
              </div>
              <ViewOnlyCoupon width={300 * 0.6} height={500 * 0.6} />
              <ViewOnlyCoupon width={300 * 0.6} height={500 * 0.6} />
              <ViewOnlyCoupon width={300 * 0.6} height={500 * 0.6} />
              <ViewOnlyCoupon width={300 * 0.6} height={500 * 0.6} />
              <ViewOnlyCoupon width={300 * 0.6} height={500 * 0.6} />
            </div>
          </div>
        )}
      </PageWrapper>
    </>
  );
}

const CouponBuilderPage = () => {
  return (
    <CouponBuilderProvider>
      <CouponBuilder />
    </CouponBuilderProvider>
  );
};

export default CouponBuilderPage;
