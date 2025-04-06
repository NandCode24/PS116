import { useState, useEffect, useRef } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";

const API_KEY = "AIzaSyDzziSF1amUXrO5aVF0TN7dAiwf_KeOoBI";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const StudentChatbot = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hey there ✋ <br>How can I help you today?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [fileData, setFileData] = useState(null);
  const chatBodyRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message to chat
    const newMessage = { type: "user", text: userInput };
    setMessages((prev) => [...prev, newMessage]);

    // Clear input field
    setUserInput("");

    // Add bot "thinking" animation
    const thinkingMessage = { type: "bot", text: "..." };
    setMessages((prev) => [...prev, thinkingMessage]);

    try {
      // Prepare request body
      const body = {
        contents: [
          {
            parts: [
              { text: userInput },
              ...(fileData ? [{ inline_data: fileData }] : [])
            ]
          }
        ]
      };

      // Fetch response from API
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);

      // Update bot message with real response
      const botReply = {
        type: "bot",
        text: data.candidates[0].content.parts[0].text.trim(),
      };

      setMessages((prev) => [...prev.slice(0, -1), botReply]); // Replace "thinking" with actual response

    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "bot", text: "Sorry, something went wrong. Please try again." }
      ]);
    } finally {
      setFileData(null);
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result.split(",")[1];
      setFileData({
        data: base64String,
        mime_type: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chatbot-popup">
      {/* Chat Header */}
      {/* <div className="chat-header">
        <div className="header-info">
          <svg className="chatbot-logo" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
            <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9z"></path>
          </svg>
          <h2 className="logo-text">Chatbot</h2>
        </div>
      </div> */}

      {/* Chat Body */}
      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`messege ${msg.type}-messege`}>
            {msg.type === "bot" && (
              <svg className="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9z"></path>
              </svg>
            )}
            <div className="messege-text" dangerouslySetInnerHTML={{ __html: msg.text }}></div>
          </div>
        ))}
      </div>

      {/* Chat Footer */}
      <div className="chat-footer">
        <form onSubmit={sendMessage} className="chat-form">
          <textarea
            type="text"
            placeholder="Say anything..."
            className="messege-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(e)}
          ></textarea>
          <div className="chat-control">
            <input type="file" accept="image/*" id="file-input" hidden onChange={handleFileUpload} />
            <button type="button" id="file-uplod" className="material-symbols-rounded" onClick={() => document.getElementById("file-input").click()}>
            <AttachFileIcon />
            </button>
            <button type="submit" className="material-symbols-rounded" id="send">
            <SendIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentChatbot;
