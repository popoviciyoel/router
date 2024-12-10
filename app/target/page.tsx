"use client";
import React, { useState, useEffect } from "react";
import { AccordionDemo2 } from "@/components/parts/accordian";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";
import { Button } from "@/components/ui/button";
import Snowfall from "react-snowfall";
import { Fireworks } from "@fireworks-js/react";
import Confetti from "react-confetti";
import ClickTheTarget from "../games/ClickTheTarget";
import {
  GameBuilderProvider,
  useGameBuilder,
} from "./GameBuilderProvider";

const pageData = {
  name: "Logs",
  title: "Logs",
  description: "Logs of all your events",
};

const GameBuilder = () => {
  const { state } = useGameBuilder();
  console.log("state", state);

  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        <Header title={pageData?.title}>
          {pageData?.description}
          <Button>Save</Button>
        </Header>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <AccordionDemo2 />

          <div
            style={{
              padding: "20px",
              backgroundImage: `url(${state.background})`,
              position: "relative",
              backgroundSize: 'cover', // Ensures the image covers the entire container
              backgroundPosition: 'center', // Centers the image
              backgroundRepeat: 'no-repeat', // Prevents tiling
            }}
          >
            <ClickTheTarget />
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

const GameBuilderPage = () => {
  return (
    <GameBuilderProvider>
      <GameBuilder />
    </GameBuilderProvider>
  );
};

export default GameBuilderPage;

// Another feature is you can subtract score every time you miss the target
