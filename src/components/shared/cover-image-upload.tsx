"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { IoIosCloudDownload } from "react-icons/io";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const CoverImageUpload = ({ onChange, value }: Props) => {
  const [image, setImage] = React.useState<string>(value);

  const handleChange = useCallback(
    (coverImage: string) => {
      onChange(coverImage);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      //   if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImage(result);
        handleChange(result);
      };
      reader.readAsDataURL(file);
      //   }
    },
    [handleChange]
  );

  const { getInputProps, getRootProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          "text-white text-center border-none rounded-md w-full h-[200px] bg-neutral-700 cursor-pointer",
      })}
    >
      <input {...getInputProps()} />

      {image ? (
        <div className="w-full h-[200px] relative left-0 right-0">
          <Image src={image} alt="cover-image" fill className="object-cover" />
          <div className="absolute inset-0 flex justify-center items-center">
            <MdEdit size={24} className="text-white" />
          </div>
        </div>
      ) : (
        <div className="h-full flex justify-center cursor-pointer flex-col items-center gap-2">
            <IoIosCloudDownload size={50} />
            <p>Upload Cover Image</p>
        </div>
      )}
    </div>
  );
};

export default CoverImageUpload;
