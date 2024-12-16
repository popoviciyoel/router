"use client";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";
import { Input } from "@/components/ui/input";
import React from "react";
import { GameOver } from "@/components/game/ending";
import Leaderboard from "@/components/parts/leaderboards";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GameBuilderProvider } from "./GameBuilderProvider";

const pageData = {
  name: "Games",
  title: "Games",
  description: "Games",
};

export default function GameBuilder() {
  const router = useRouter();

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
        <Header title={pageData?.title}>{pageData?.description}</Header>
        <div style={gridStyle}>
          <Image
            src={"/ClickTheTarget.webp"}
            width={200}
            height={150}
            alt="Click The Target Cover"
            className=" rounded-lg shadow-2xl cursor-pointer"
            onClick={() => router.push("/build/target")}
          />
          {/* <GameOver /> */}
          {/* <Leaderboard/> */}
        </div>
      </PageWrapper>
    </>
  );
}


