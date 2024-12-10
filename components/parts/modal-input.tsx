import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

const ModalWithInputs = () => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const handleSave = () => {
    console.log("Width:", width);
    console.log("Height:", height);
  };

  return (
    <Dialog.Root>
      {/* <Dialog.Trigger asChild>
        <button style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
          Open Modal
        </button>
      </Dialog.Trigger> */}

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
            minWidth: "300px",
          }}
        >
          <Dialog.Title style={{ marginBottom: "15px", fontSize: "18px", fontWeight: "bold" }}>
            Set Dimensions
          </Dialog.Title>

          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor="width"
              style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}
            >
              Width
            </label>
            <input
              id="width"
              type="text"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="height"
              style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}
            >
              Height
            </label>
            <input
              id="height"
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Dialog.Close asChild>
              <button
                style={{
                  padding: "10px 20px",
                  marginRight: "10px",
                  backgroundColor: "#f3f3f3",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </Dialog.Close>

            <button
              onClick={handleSave}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalWithInputs;
