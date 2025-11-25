import { useEffect, useRef, useCallback } from "react";

interface UseFilePondOptions {
  onFileChange?: (files: any[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  allowMultiple?: boolean;
  imagePreviewHeight?: number;
}

export const useFilePond = (options: UseFilePondOptions = {}) => {
  const pondRef = useRef<any>(null);
  const elementRef = useRef<HTMLInputElement>(null);
  const isInitializedRef = useRef(false);

  // Store options in refs to avoid re-initialization
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const {
    maxFiles = 5,
    acceptedFileTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"],
    allowMultiple = true,
    imagePreviewHeight = 170,
  } = options;

  useEffect(() => {
    // Prevent re-initialization if already initialized
    if (isInitializedRef.current || pondRef.current) {
      return;
    }

    const initFilePond = async () => {
      if (typeof window !== "undefined" && elementRef.current) {
        // Dynamically import FilePond to avoid SSR issues
        const FilePond = (await import("filepond")).default;
        const FilePondPluginImagePreview = (
          await import("filepond-plugin-image-preview")
        ).default;
        const FilePondPluginFileValidateType = (
          await import("filepond-plugin-file-validate-type")
        ).default;

        FilePond.registerPlugin(
          FilePondPluginImagePreview,
          FilePondPluginFileValidateType
        );

        // Double-check element still exists and not already initialized
        if (!elementRef.current || isInitializedRef.current) {
          return;
        }

        isInitializedRef.current = true;

        // Create FilePond instance
        pondRef.current = FilePond.create(elementRef.current, {
          labelIdle: "+",
          maxFiles,
          acceptedFileTypes,
          allowMultiple,
          allowImagePreview: true,
          imagePreviewHeight,
          stylePanelLayout: "compact",
          credits: false,
          onupdatefiles: (fileItems) => {
            const files = fileItems.map((fileItem) => fileItem.file);
            // Use ref to always get latest callback
            if (optionsRef.current.onFileChange) {
              optionsRef.current.onFileChange(files);
            }
          },
        });
      }
    };

    initFilePond();

    // Cleanup
    return () => {
      if (pondRef.current) {
        pondRef.current.destroy();
        pondRef.current = null;
        isInitializedRef.current = false;
      }
    };
  }, []); // Empty deps - only initialize once

  const getFiles = () => {
    return pondRef.current?.getFiles() || [];
  };

  const removeFile = (index: number) => {
    pondRef.current?.removeFile(index);
  };

  const addFile = (file: File) => {
    pondRef.current?.addFile(file);
  };

  return {
    pondRef,
    elementRef,
    getFiles,
    removeFile,
    addFile,
  };
};
