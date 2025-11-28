"use client";

import { useFilePond } from "@/hooks/useFilePond";

export default function FilePondWrapper({
  initialFiles = [],
  onChange,
}: {
  initialFiles?: string[];
  onChange: (state: any) => void;
}) {
  const { elementRef } = useFilePond({
    initialFiles,
    maxFiles: 5,
    acceptedFileTypes: ["image/*"],
    onFileChange: onChange,
  });

  return <input type="file" ref={elementRef} accept="image/*" multiple />;
}
