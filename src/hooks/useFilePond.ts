import { useEffect, useRef, useCallback } from "react";

interface UseFilePondOptions {
  initialFiles?: string[];
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

  const {
    initialFiles = [],
    maxFiles = 5,
    acceptedFileTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"],
    allowMultiple = true,
    imagePreviewHeight = 170,
  } = options;

  // Store options in refs to avoid re-initialization
  const optionsRef = useRef(options);
  optionsRef.current = options;

  // Track old file state
  const oldFilesRef = useRef<string[]>(initialFiles);

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
          server: {
            process: (
              fieldName,
              file,
              metadata,
              load,
              error,
              progress,
              abort
            ) => {
              const formData = new FormData();
              formData.append(fieldName, file, file.name);

              const request = new XMLHttpRequest();
              request.open("POST", "http://localhost:8088/api/tours/upload");

              request.upload.onprogress = (e) =>
                progress(e.lengthComputable, e.loaded, e.total);

              request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                  load(request.responseText); // trả về unique id của server
                } else {
                  error("Upload failed");
                }
              };

              request.send(formData);

              return {
                abort: () => {
                  request.abort();
                  abort();
                },
              };
            },
            load: (source, load, error, progress, abort, headers) => {
              if (source.startsWith("http")) {
                fetch(source)
                  .then((res) => {
                    if (!res.ok) {
                      throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.blob();
                  })
                  .then(load)
                  .catch((err) => {
                    console.error("Error loading image:", err);
                    error(err.message);
                  });

                return {
                  abort: () => {
                    abort();
                  },
                };
              }
            },
          },
          // Load initial files if provided
          files: initialFiles.map((url) => {
            // Check if url is already full URL or just filename
            const fullUrl = url.startsWith("http")
              ? url
              : `http://localhost:8088/api/tours/images/${url}`;

            console.log("Loading FilePond file:", fullUrl);

            return {
              source: fullUrl,
              options: {
                type: "local", // Use limbo for remote files that won't be re-uploaded
              },
            };
          }),
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
