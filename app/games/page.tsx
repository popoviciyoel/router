"use client";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";
import { Input } from "@/components/ui/input";
import React from "react";
import { GameOver } from "@/components/game/ending";

const pageData = {
  name: "Games",
  title: "Games",
  description: "Games",
};

export default function Page() {


  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        <Header title={pageData?.title}>{pageData?.description}</Header>
        <div className="max-w-2xl">
          <GameOver />
        </div>
      </PageWrapper>
    </>
  );
}
