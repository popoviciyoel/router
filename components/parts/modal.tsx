import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { ViewOnlyCoupon } from "@/components/parts/view-only-coupon";
import { Maximize2 } from "lucide-react";

const Modal = ({ title, children, open, setOpen, width, handleSave }) => {
  return (
    <Dialog.Root open={open} >
 
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        />

        <Dialog.Content
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            minWidth: width || "45rem",
          }}
        >
          <Dialog.Title
            style={{
              marginBottom: "15px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {title}
          </Dialog.Title>
          {children}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Dialog.Close asChild>
              <Button
                className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-red3 hover:text-red11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-red7 data-[state=on]:bg-red5 data-[state=on]:text-red11"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Dialog.Close>

            <Button
              onClick={handleSave}
              className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
            >
              Save
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
