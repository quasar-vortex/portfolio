import React, { ChangeEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import { FiFile, FiX } from "react-icons/fi";
import Image from "next/image";
import { toast } from "sonner";

const FileUploader = ({
  onFileUpload,
}: {
  onFileUpload: (f: File | null) => void;
}) => {
  const [content, setContent] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const initFileUpload = () => {
    fileRef.current?.click();
  };
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      if (!files[0].type.includes("image")) {
        toast.error("Only Images Allowed!", { position: "top-right" });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target!.result as string);
        onFileUpload(files[0]);
      };
      reader.readAsDataURL(files[0]);
    }
  };
  return (
    <div className="w-full flex flex-col items-center border-dashed border-2 p-4 mb-6 duration-200 hover:border-gray-500 border-gray-300">
      <input
        onChange={handleFileUpload}
        type="file"
        ref={fileRef}
        className="hidden"
      />
      {content && (
        <div className="mb-3">
          <Image
            className="rounded-full h-32 w-32"
            height={200}
            width={200}
            alt="Upload"
            src={content}
          />
        </div>
      )}
      {content ? (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            className="cursor-pointer"
            onClick={initFileUpload}
          >
            <FiFile />
            <span>Click to Replace</span>
          </Button>
          <Button
            onClick={() => {
              onFileUpload(null);
              setContent(null);
            }}
            type="button"
            className="cursor-pointer bg-red-500 duration-200 hover:bg-red-600"
          >
            <FiX /> Delete
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          className="cursor-pointer"
          onClick={initFileUpload}
        >
          <FiFile />
          <span>Click to Upload</span>
        </Button>
      )}
    </div>
  );
};

export default FileUploader;
