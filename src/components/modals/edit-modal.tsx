"use client";

import { useEditModalStore } from "@/hooks/use-edit-modal";
import { IUser } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CoverImageUpload from "../shared/cover-image-upload";
import ProfileImageUpload from "../shared/profile-image-upload";
import Modal from "../ui/modal";
import axios from "axios";
import { Loader2 } from "lucide-react";
import EditForm from "../shared/edit-form";

interface Props {
  user: IUser;
}

const EditModal = ({ user }: Props) => {
  const [coverImage, setCoverImage] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const editModal = useEditModalStore();
  const router = useRouter();

  useEffect(() => {
    setCoverImage(user?.coverImage);
    setProfileImage(user?.profileImage);
  }, [user]);

  const handleImageUpload = async (image: string, isProfileImage: boolean) => {
    try {
      setIsLoading(true);

      await axios.put(`/api/users/${user?._id}?type=updateImage`, {
        [isProfileImage ? "profileImage" : "coverImage"]: image,
      });
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const body = (
    <>
      {isLoading && (
        <div className="absolute z-10 h-[300px] bg-black opacity-50 left-0 top-12 right-0 flex justify-center items-center">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      )}
      <CoverImageUpload
        value={coverImage}
        onChange={(image) => handleImageUpload(image, false)}
      />
      <ProfileImageUpload
        value={profileImage}
        onChange={(image) => handleImageUpload(image, true)}
      />
      <EditForm user={user} />
    </>
  );

  return (
    <Modal
      body={body}
      isOpen={editModal.isOpen}
      onClose={isLoading ? () => {} : editModal.onClose}
      isEditing
    />
  );
};

export default EditModal;
