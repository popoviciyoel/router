"use client";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";
import { Input } from "@/components/ui/input";
import React from "react";

const pageData = {
  name: "Generate",
  title: "Generate",
  description: "Generate a game with AI",
};

export default function Page() {
  const [brandOverView, setBrandOverView] = React.useState<string>();
  const [targetAudience, setTargetAudience] = React.useState<string>();
  const [productSpecs, setProductSpecs] = React.useState<string>();

  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        <Header title={pageData?.title}>{pageData?.description}</Header>
        <div className="max-w-2xl">
          <Input
            placeholder="Brand Description"
            value={brandOverView ?? ""}
            onChange={(event) => setBrandOverView(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
          <Input
            placeholder="Target Audience"
            value={targetAudience ?? ""}
            onChange={(event) => setTargetAudience(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
          <Input
            placeholder="Product Specifications4"
            value={productSpecs ?? ""}
            onChange={(event) => setProductSpecs(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
      </PageWrapper>
    </>
  );
}
