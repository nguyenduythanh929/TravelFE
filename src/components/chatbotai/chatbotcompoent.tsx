"use client";
import "./chabot.css";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAIResponse } from "@/api/chatbotApi";

export default function ChatBotWidget() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  async function handleSend() {
    if (input.trim() === "") return;
    setLoading(true);

    setMessages((prev) => [...prev, { from: "user", text: input }]);
    const userText = input;
    setInput("");

    try {
      const response = await getAIResponse(userText);
      const answer = response.answer || "Bot không trả lời được.";

      setMessages((prev) => [...prev, { from: "bot", text: answer }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Xin lỗi, tôi gặp sự cố. Vui lòng thử lại." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white w-120 h-150 shadow-xl rounded-2xl flex flex-col p-4 border"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-gray-700">Chat Bot</h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setMessages([]);
                }}
                className="text-gray-500"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 p-2 border rounded-md mb-2">
              {messages.map((msg, i) => (
                <div key={i}>
                  {msg.from === "user" ? (
                    <div className="flex justify-end">
                      <div className="p-2 rounded-lg max-w-[75%] inline-block bg-blue-500 text-white">
                        {msg.text}
                      </div>
                    </div>
                  ) : (
                    <p
                      style={{ whiteSpace: "pre-line" }}
                      className="bg-gray-200 text-gray-800 p-2 rounded-lg max-w-[75%]"
                    >
                      {msg.text}
                    </p>
                  )}
                </div>
              ))}

              <div ref={messagesEndRef} />

              {loading && (
                <div className="typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                disabled={loading}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <MessageCircle size={28} />
        </motion.button>
      )}
    </div>
  );
}
