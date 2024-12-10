import React, { useState, FunctionComponent, useRef } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/lib/firebase/config";
import { Input } from "../../ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  direction: string;
  imageHandler: (imageUrl: string) => void;
  imageDeleteHandler?: () => void;
}

const ImageUploader: FunctionComponent<Props> = ({
  direction,
  imageHandler,
  imageDeleteHandler,
}) => {
  const [state, setState] = useState({
    file: null,
    uploadProgress: 0,
    uploadedUrl: null,
    error: null,
  });

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    // Validate file type and size
    if (!selectedFile?.type.startsWith("image/")) {
      setState({ ...state, error: "Please upload a valid image file." });
      return;
    } else if (selectedFile.size > MAX_FILE_SIZE) {
      setState({ ...state, error: "File size exceeds 5MB." });
      return;
    }

    setState({ ...state, error: null }); // Clear errors

    // Start uploading the file
    const storageRef = ref(
      storage,
      `images/${Date.now()}_${selectedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setState((prev) => ({ ...prev, uploadProgress: progress }));
      },
      (error) => {
        setState({ ...state, error: "Upload failed: " + error.message });
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        imageHandler(downloadUrl);
        setState({ uploadProgress: 0, uploadedUrl: downloadUrl, error: null });
      }
    );
    fileInputRef.current.value = null;
  };

  // Handle image deletion
  const handleDeleteImage = async () => {
    if (!uploadedUrl) return;

    try {
      const imageRef = ref(storage, uploadedUrl); // Reference the uploaded file
      await deleteObject(imageRef);
      imageDeleteHandler();

      setState({ ...state, uploadedUrl: null, error: null });

      console.log("Image deleted successfully.");
    } catch (err) {
      setState({
        ...state,
        uploadedUrl: null,
        error: "Failed to delete image:" + err.message,
      });

      console.error(err);
    }
  };

  const { uploadProgress, uploadedUrl, error } = state;

  return (
    <div className=" text-center  my-5">
      <label
        className="Label"
        htmlFor="airplane-mode"
        style={{ paddingRight: 15 }}
      >
        {direction}
      </label>
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ cursor: "pointer" }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}

      {uploadProgress > 0 && (
        <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>
      )}
      {uploadedUrl && (
        <div>
          <p>Upload successful!</p>
          <Button
            className="ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-red3 hover:text-red11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-red7 data-[state=on]:bg-red5 data-[state=on]:text-red11"
            onClick={handleDeleteImage}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
