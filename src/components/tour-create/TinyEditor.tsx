"use client";

import { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface TinyEditorProps {
  initialValue?: string;
  height?: number;
  onEditorChange?: (content: string) => void;
}

export default function TinyEditor({
  initialValue = "",
  height = 400,
  onEditorChange,
}: TinyEditorProps) {
  const editorRef = useRef<any>(null);
  const TINYMCE_BASE = "/tinymce";
  const [isReady, setIsReady] = useState(false);
  const [editorKey, setEditorKey] = useState(0);

  // ✅ Đợi component mount xong và data sẵn sàng
  useEffect(() => {
    let mounted = true;

    const initEditor = async () => {
      // ✅ Đợi 500ms để đảm bảo:
      // 1. DOM đã render xong
      // 2. Data đã được fetch xong
      // 3. TinyMCE scripts đã load
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (mounted) {
        setIsReady(true);
        console.log("✅ TinyEditor ready to initialize");
      }
    };

    initEditor();

    return () => {
      mounted = false;
    };
  }, []);

  // ✅ Force re-render khi initialValue thay đổi
  useEffect(() => {
    if (isReady && initialValue) {
      console.log("🔄 TinyEditor content updated, re-rendering...");
      setEditorKey((prev) => prev + 1);
    }
  }, [initialValue, isReady]);

  // ✅ Hiển thị loading state
  if (!isReady) {
    return (
      <div
        style={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ddd",
          borderRadius: "4px",
          backgroundColor: "#f9f9f9",
          color: "#666",
          fontSize: "14px",
        }}
      >
        Đang tải trình soạn thảo...
      </div>
    );
  }

  return (
    <Editor
      key={editorKey} // ✅ Force re-render với key mới
      apiKey="wcmxywpuerdtkgqp1ytzvprr27s9v62nxc14lbmsu1a1jkg9"
      tinymceScriptSrc={`${TINYMCE_BASE}/tinymce.min.js`}
      onInit={(_evt, editor) => {
        editorRef.current = editor;
        console.log(
          "✅ TinyEditor initialized with content length:",
          initialValue.length
        );
      }}
      initialValue={initialValue}
      init={{
        height,
        menubar: true,
        plugins: ["charmap", "image", "link", "media", "lists", "code"],
        toolbar:
          "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | charmap code emoticons image link numlist bullist media",
        branding: false,
        promotion: false,
        license_key: "gpl",
        base_url: TINYMCE_BASE,
        suffix: ".min",
        images_upload_url: "http://localhost:8088/api/tinymce/upload",
        file_picker_types: "image",

        file_picker_callback: (callback, value, meta) => {
          if (meta.filetype === "image") {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.onchange = function () {
              const file = (input as HTMLInputElement).files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                  const formData = new FormData();
                  formData.append("file", file);

                  fetch("http://localhost:8088/api/tinymce/upload", {
                    method: "POST",
                    body: formData,
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      callback(data.location, {
                        alt: file.name,
                        title: file.name,
                      });
                    })
                    .catch((error) => {
                      console.error("Error uploading image:", error);
                      alert("Failed to upload image");
                    });
                };
                reader.readAsDataURL(file);
              }
            };

            input.click();
          }
        },

        images_upload_handler: async (blobInfo, progress) => {
          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", blobInfo.blob(), blobInfo.filename());

            fetch("http://localhost:8088/api/tinymce/upload", {
              method: "POST",
              body: formData,
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Upload failed");
                }
                return response.json();
              })
              .then((data) => {
                resolve(data.location);
              })
              .catch((error) => {
                console.error("Error uploading image:", error);
                reject("Image upload failed: " + error.message);
              });
          });
        },
        automatic_uploads: true,
      }}
      onEditorChange={onEditorChange}
    />
  );
}
