import React from "react";
import Image from "next/image";

const ImageElement = ({ item }: any) => {
  return (
    <Image src={item.content} alt={item.content} width={300} height={250} />
  );
};


export default ImageElement