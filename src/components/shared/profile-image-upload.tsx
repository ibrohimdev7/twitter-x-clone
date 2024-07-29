"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoMdDownload } from "react-icons/io";
import { MdEdit } from "react-icons/md";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ProfileImageUpload = ({ onChange, value }: Props) => {
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
          "text-white text-center border-none rounded-md",
      })}
    >
      <input {...getInputProps()} />

      {image ? (
        <div className="relative -top-20 left-6 rounded-full transition cursor-pointer w-32 h-32 border-4 border-black">
          <Image
            src={image}
            alt="cover-image"
            fill
            className="object-cover rounded-full"
          />
          <div className="absolute inset-0 rounded-full flex justify-center items-center">
            <MdEdit size={24} className="text-white" />
          </div>
        </div>
      ) : (
        <div className="relative -top-20 left-6">
          <div className="rounded-full transition cursor-pointer relative w-32 h-32 border-4 border-black">
            <Image src={"/images/placeholder.png"} alt="avatar" fill className="object-cover rounded-full" />
          </div>
          <div className="absolute inset-0 bg-black/40 rounded-full flex justify-center items-center">
            <IoMdDownload size={40} className="text-black" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageUpload;
