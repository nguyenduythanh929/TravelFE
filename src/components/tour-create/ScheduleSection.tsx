"use client";

import { ScheduleItemType } from "@/schemaValidations/tour.schema";
import { useState, useEffect, useRef } from "react";
import { FaUpDownLeftRight, FaTrashCan, FaAngleDown } from "react-icons/fa6";

interface ScheduleSectionProps {
  schedules: ScheduleItemType[];
  onSchedulesChange: (schedules: ScheduleItemType[]) => void;
}

export default function ScheduleSection({
  schedules,
  onSchedulesChange,
}: ScheduleSectionProps) {
  // ✅ States
  const [localSchedules, setLocalSchedules] =
    useState<ScheduleItemType[]>(schedules);
  const [componentKey, setComponentKey] = useState(0); // Key để force re-render
  const [isReady, setIsReady] = useState(false); // Loading state

  // ✅ Refs
  const isInternalChange = useRef(false);
  const tinymceRef = useRef<any>(null);
  const sortableRef = useRef<any>(null);
  const prevScheduleIdsRef = useRef<string>(""); // Track IDs để tránh re-render không cần thiết

  // ✅ Effect 1: Initial delay trước khi init
  useEffect(() => {
    let mounted = true;

    const initDelay = async () => {
      // Đợi 800ms để DOM và data sẵn sàng
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (mounted) {
        setIsReady(true);
        console.log("✅ ScheduleSection ready to initialize");
      }
    };

    initDelay();

    return () => {
      mounted = false;
    };
  }, []);

  // ✅ Effect 2: Sync schedules from props - CHỈ FORCE RE-RENDER KHI STRUCTURE THAY ĐỔI
  useEffect(() => {
    if (schedules.length === 0 || !isReady) return;

    // So sánh IDs (KHÔNG sort để phát hiện cả reorder)
    const currentIds = schedules.map((s) => s.id).join(",");
    const prevIds = prevScheduleIdsRef.current;

    if (currentIds !== prevIds) {
      // Structure thay đổi (thêm/xóa/reorder) → Force re-render
      console.log(
        "🔄 Schedule structure changed (IDs changed), forcing re-render..."
      );
      prevScheduleIdsRef.current = currentIds;
      setLocalSchedules(schedules);
      setComponentKey((prev) => prev + 1);
    } else {
      // Structure giống nhau, chỉ content thay đổi → KHÔNG force re-render
      console.log("📝 Only content changed, updating without re-render");
      setLocalSchedules(schedules);
    }
  }, [schedules, isReady]);

  // ✅ Effect 3: Sync changes to parent
  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      onSchedulesChange(localSchedules);
    }
  }, [localSchedules, onSchedulesChange]);

  // ✅ Effect 4: Init TinyMCE - chạy mỗi khi componentKey thay đổi
  useEffect(() => {
    if (!isReady) return;

    let mounted = true;

    const initTinyMCE = async () => {
      if (typeof window === "undefined" || !mounted) return;

      try {
        // Import TinyMCE
        const tinymce = (await import("tinymce/tinymce")).default;
        tinymceRef.current = tinymce;

        // Import dependencies
        // @ts-expect-error
        await import("tinymce/icons/default");
        // @ts-expect-error
        await import("tinymce/themes/silver");
        // @ts-expect-error
        await import("tinymce/models/dom");

        // Import plugins
        const plugins = ["charmap", "image", "link", "media", "lists", "code"];
        for (const plugin of plugins) {
          try {
            await import(`tinymce/plugins/${plugin}`);
          } catch (err) {
            console.warn(`Plugin ${plugin} not found`);
          }
        }

        // Đợi thêm 300ms để đảm bảo DOM đã render
        await new Promise((resolve) => setTimeout(resolve, 300));

        if (!mounted) return;

        console.log(
          "🚀 Initializing TinyMCE for",
          localSchedules.length,
          "schedules"
        );

        // Init TinyMCE cho tất cả schedules
        for (const schedule of localSchedules) {
          if (!mounted) break;

          const selector = `#schedule-content-${schedule.id}`;
          const element = document.querySelector(selector);

          if (!element) {
            console.warn(`❌ Element not found: ${selector}`);
            continue;
          }

          // Remove existing editor if any
          const existingEditor = tinymce.get(`schedule-content-${schedule.id}`);
          if (existingEditor) {
            existingEditor.remove();
          }

          // Init new editor
          await tinymce.init({
            selector,
            plugins: "charmap image link media lists code",
            toolbar:
              "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | charmap code emoticons image link numlist bullist media",

            menubar: false,
            branding: false,
            height: 300,
            license_key: "gpl",
            skin: false,
            content_css: false,
            promotion: false,

            images_upload_url: "http://localhost:8088/api/tinymce/upload",
            file_picker_types: "image",

            // ⭐⭐⭐ Cho phép browse ảnh từ máy lên
            file_picker_callback: (callback, value, meta) => {
              if (meta.filetype === "image") {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");

                input.onchange = function () {
                  const file = (input as HTMLInputElement).files?.[0];

                  if (file) {
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
                  }
                };

                input.click();
              }
            },

            // ⭐⭐⭐ Cho phép drag & drop hoặc paste ảnh
            images_upload_handler: async (blobInfo, progress) => {
              return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append("file", blobInfo.blob(), blobInfo.filename());

                fetch("http://localhost:8088/api/tinymce/upload", {
                  method: "POST",
                  body: formData,
                })
                  .then((response) => response.json())
                  .then((data) => resolve(data.location))
                  .catch((error) => {
                    console.error("Error uploading image:", error);
                    reject("Image upload failed: " + error.message);
                  });
              });
            },

            automatic_uploads: true,

            content_style: `
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
      font-size: 14px;
      padding: 10px;
      line-height: 1.5;
    }
    p { margin: 0 0 10px 0; }
  `,

            setup: (editor) => {
              editor.on("change keyup", () => {
                isInternalChange.current = true;
                setLocalSchedules((prev) =>
                  prev.map((s) =>
                    s.id === schedule.id
                      ? { ...s, content: editor.getContent() }
                      : s
                  )
                );
              });
            },
          });

          console.log(`✅ TinyMCE initialized for ${schedule.id}`);
        }

        console.log("✅ All TinyMCE editors initialized");

        // Init Sortable
        const scheduleList = document.querySelector(".inner-schedule-list");
        if (scheduleList && mounted) {
          const Sortable = (await import("sortablejs")).default;

          if (sortableRef.current) {
            sortableRef.current.destroy();
          }

          sortableRef.current = new Sortable(scheduleList as HTMLElement, {
            handle: ".inner-move",
            animation: 150,
            onStart: (evt) => {
              const itemId = evt.item.getAttribute("data-schedule-id");
              if (itemId && tinymceRef.current) {
                try {
                  const editor = tinymceRef.current.get(
                    `schedule-content-${itemId}`
                  );
                  if (editor) {
                    const content = editor.getContent();
                    isInternalChange.current = true;
                    setLocalSchedules((prev) =>
                      prev.map((s) => (s.id === itemId ? { ...s, content } : s))
                    );
                    editor.remove();
                  }
                } catch (err) {
                  console.warn("Failed to remove editor on drag start:", err);
                }
              }
            },
            onEnd: async () => {
              // Get new order from DOM
              const scheduleList = document.querySelector(
                ".inner-schedule-list"
              );
              if (!scheduleList) return;

              const newOrder = Array.from(scheduleList.children).map((child) =>
                child.getAttribute("data-schedule-id")
              );

              // Reorder schedules
              isInternalChange.current = true;
              setLocalSchedules((prev) => {
                const scheduleMap = new Map(prev.map((s) => [s.id, s]));
                return newOrder
                  .map((id) => scheduleMap.get(id!))
                  .filter((s): s is ScheduleItemType => s !== undefined);
              });

              // Force re-init
              setComponentKey((prev) => prev + 1);
            },
          });

          console.log("✅ Sortable initialized");
        }
      } catch (error) {
        console.error("❌ Error initializing:", error);
      }
    };

    initTinyMCE();

    // Cleanup
    return () => {
      mounted = false;

      // Cleanup TinyMCE
      if (tinymceRef.current) {
        localSchedules.forEach((schedule) => {
          try {
            const editor = tinymceRef.current.get(
              `schedule-content-${schedule.id}`
            );
            if (editor) {
              editor.remove();
            }
          } catch (err) {
            // Editor already removed, ignore
          }
        });
      }

      // Cleanup Sortable - Check if element still exists
      if (sortableRef.current) {
        try {
          const sortableEl = sortableRef.current.el;
          if (sortableEl && document.contains(sortableEl)) {
            sortableRef.current.destroy();
          }
        } catch (err) {
          // Sortable already destroyed or element removed, ignore
        }
        sortableRef.current = null;
      }
    };
  }, [componentKey, isReady]);

  // ✅ Event Handlers
  const handleTitleChange = (id: string, title: string) => {
    isInternalChange.current = true;
    setLocalSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === id ? { ...schedule, title } : schedule
      )
    );
  };

  const handleAddSchedule = async () => {
    const newSchedule: ScheduleItemType = {
      id: `schedule-${Date.now()}`,
      title: "",
      content: "",
    };

    isInternalChange.current = true;
    setLocalSchedules((prev) => [...prev, newSchedule]);

    // Force re-render ngay lập tức
    setComponentKey((prev) => prev + 1);
  };

  const handleRemoveSchedule = (id: string) => {
    if (localSchedules.length <= 1) {
      alert("Phải có ít nhất 1 lịch trình!");
      return;
    }

    // Remove editor trước
    if (tinymceRef.current) {
      try {
        const editor = tinymceRef.current.get(`schedule-content-${id}`);
        if (editor) {
          editor.remove();
        }
      } catch (err) {
        // Editor already removed, ignore
      }
    }

    // Update state
    isInternalChange.current = true;
    setLocalSchedules((prev) => prev.filter((schedule) => schedule.id !== id));

    // Force re-render ngay lập tức
    setComponentKey((prev) => prev + 1);
  };

  const handleToggleSchedule = (event: React.MouseEvent<HTMLDivElement>) => {
    const clicked = event.target as HTMLElement;
    if (!clicked.closest(".inner-more")) return;

    const item = clicked.closest(".inner-schedule-item");
    const body = item?.querySelector(".inner-schedule-body");
    const icon = item?.querySelector(".icon-toggle");

    if (!body) return;

    body.classList.toggle("hidden");
    icon?.classList.toggle("rotated");
  };

  // ✅ Loading UI
  if (!isReady) {
    return (
      <div
        style={{
          padding: "40px 20px",
          textAlign: "center",
          border: "1px solid #ddd",
          borderRadius: "4px",
          backgroundColor: "#f9f9f9",
          color: "#666",
          fontSize: "14px",
        }}
      >
        Đang tải lịch trình tour...
      </div>
    );
  }

  // ✅ Main Render
  return (
    <div className="inner-schedule" key={componentKey}>
      <div className="inner-schedule-list" onClick={handleToggleSchedule}>
        {localSchedules.map((schedule) => (
          <div
            key={schedule.id}
            className="inner-schedule-item"
            data-schedule-id={schedule.id}
          >
            <div className="inner-schedule-head">
              <div className="inner-schedule-button inner-move">
                <FaUpDownLeftRight />
              </div>
              <input
                type="text"
                value={schedule.title}
                onChange={(e) => handleTitleChange(schedule.id, e.target.value)}
                placeholder="Tiêu đề lịch trình..."
              />
              <div
                className="inner-schedule-button inner-remove"
                onClick={() => handleRemoveSchedule(schedule.id)}
              >
                <FaTrashCan />
              </div>
              <div className="inner-schedule-button inner-more">
                <FaAngleDown className="icon-toggle" />
              </div>
            </div>
            <div className="inner-schedule-body">
              <textarea
                id={`schedule-content-${schedule.id}`}
                defaultValue={schedule.content}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="inner-schedule-create" onClick={handleAddSchedule}>
        + Thêm lịch trình
      </div>
    </div>
  );
}
