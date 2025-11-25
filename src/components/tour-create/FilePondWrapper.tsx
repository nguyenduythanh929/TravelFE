"use client";

import { useFilePond } from "@/hooks/useFilePond";

export default function FilePondWrapper({ onChange }: any) {
  const { elementRef } = useFilePond({
    maxFiles: 5,
    acceptedFileTypes: ["image/*"],
    onFileChange: onChange,
  });

  return <input type="file" ref={elementRef} accept="image/*" multiple />;
}
