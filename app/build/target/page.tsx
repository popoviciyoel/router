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
import { GameBuilderProvider, useGameBuilder } from "../GameBuilderProvider";
import { Button } from "@/components/ui/button";
import { AccordionDemo2 } from "@/components/parts/accordian";
import ClickTheTarget from "@/app/games/ClickTheTarget";

const pageData = {
  name: "Target",
  title: "Click The Target",
  description: "Click The Target",
};

function TargetBuilder() {
  const { state } = useGameBuilder();

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
        <Header title={pageData?.title}>
          {pageData?.description}
          <Button size={"sm"}>Save</Button>
        </Header>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <AccordionDemo2 />

          <div
            style={{
              padding: "20px",
              backgroundImage: `url(${state.background})`,
              position: "relative",
              backgroundSize: "cover", // Ensures the image covers the entire container
              backgroundPosition: "center", // Centers the image
              backgroundRepeat: "no-repeat", // Prevents tiling
            }}
          >
            <ClickTheTarget />
          </div>
        </div>
      </PageWrapper>
    </>
  );
}

export default function GameBuilderPage() {
  return (
    <GameBuilderProvider>
      <TargetBuilder />
    </GameBuilderProvider>
  );
}
