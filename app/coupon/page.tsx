"use client";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";
import { Input } from "@/components/ui/input";
import React from "react";
import Dragger from "./components/Dragger";

const pageData = {
  name: "Coupon",
  title: "Coupon",
  description: "Create a Coupon",
};

export default function Page() {


  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        <Header title={pageData?.title}>{pageData?.description}</Header>
        <div className="max-w-2xl">
    <Dragger/>
        </div>
      </PageWrapper>
    </>
  );
}
