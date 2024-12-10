"use client";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Dragger from "@/components/Dragger";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import ToolbarDemo from "@/components/parts/tool-bar";
import AccordionDemo from "@/components/parts/accordian";
import { CouponBuilderProvider } from "./CouponBuilderProvider";
import { Button } from "@/components/ui/button";
const pageData = {
  name: "Coupon",
  title: "Coupon",
  description: "Create a Coupon",
};
function CouponBuilder() {
  const [view, setView] = useState("blank");
  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
  

      <PageWrapper>
        {/* <Header title={pageData?.title}>{pageData?.description}</Header> */}
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Tabs defaultValue="blank" onChange={(e) => console.log("e", e)}>
          <TabsList>
            <TabsTrigger value="blank" onClick={() => console.log("blank")}>
              Create Coupon
            </TabsTrigger>
            <TabsTrigger value="template">My Coupons</TabsTrigger>
            <TabsTrigger value="library">Community Coupons</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button>Save</Button>
        </div>

        <Separator className=" my-3 " />

        {view === "blank" && (
          <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2>Drag-and-Drop Coupon Builder</h2>
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
