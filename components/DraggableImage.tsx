import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "../components/ui/button";
import ImageUploader from "./parts/image-uploader";
import { useCouponBuilder } from "@/app/coupon/CouponBuilderProvider";

const ItemType = {
  IMAGE_INPUT: "image",
};

const DraggableImageInput = () => {
  const [imageModal, setImageModal] = useState(false);

  const handleSave = () => {
    setImageModal(false);
  };

  const { dispatch } = useCouponBuilder();

  // Helper function to set background Image
  const addImageElement = (imageURL: string) => {
    dispatch({
      type: "ADD_ELEMENT",
      payload: {
        type: ItemType.IMAGE_INPUT,
        content: imageURL,
        id: Date.now().toString(),
      },
    });
  };

  return (
    <>
      <Dialog.Root onOpenChange={() => <></>} open={imageModal}>
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
            <Dialog.Title
              style={{
                marginBottom: "15px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Set Image
            </Dialog.Title>
            <ImageUploader
              direction="Add Image Element To Coupon"
              imageHandler={addImageElement}
            />

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Dialog.Close asChild>
                <Button
                  className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-red3 hover:text-red11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-red7 data-[state=on]:bg-red5 data-[state=on]:text-red11"
                  onClick={() => setImageModal(false)}
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
      <div
        // ref={drag}
        onClick={() => {
          console.log("setting image");
          setImageModal(true);
        }}
        style={{
          padding: "10px",
          margin: "5px 0",
          background: "#eee",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          maxWidth: "5em",
          minHeight: "5em",
        }}
      >
        Image
      </div>
    </>
  );
};

export default DraggableImageInput;
