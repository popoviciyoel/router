import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Input } from "@/components/ui/input";
import { CardContent, CardHeader, CardDescription} from "@/components/ui/card";
import { useCouponBuilder } from "@/app/coupon/CouponBuilderProvider";
import { Separator } from "@/components/ui/separator";

const UploadParser = () => {
  const [fileName, setFileName] = useState("");
  const { dispatch } = useCouponBuilder();

  const setUniqueCouponCodes = (payload) => {
    dispatch({ type: "ADD_COUPON_UNIQUE", payload: payload });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        let workbook;

        if (fileExtension === "csv") {
          workbook = XLSX.read(data, { type: "string" });
        } else {
          workbook = XLSX.read(data, { type: "binary" });
        }

        const sheetName = workbook.SheetNames[0]; // Assuming first sheet
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Extract 'codes' column and update state
        const extractedCodes = jsonData.map((row) => row.Codes).filter(Boolean); // Remove any null or undefined values

        setUniqueCouponCodes({
          coupons: extractedCodes,
          couponQuantity: extractedCodes.length,
        });
        setFileName(file.name);
      };

      reader.readAsBinaryString(file); // Read file as binary for Excel
    }
  };

  return (
    <>
      <CardHeader> Upload CSV/Excel File</CardHeader>
      <Separator />
      <CardDescription>
        Your excel file must have the word "Codes" as a column
      </CardDescription>
      <CardContent>
        <Input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
        />
        {fileName && <p>Uploaded File: {fileName}</p>}
      </CardContent>
    </>
  );
};

export { UploadParser };
