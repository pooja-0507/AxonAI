import React, { useState } from 'react';
import "./App.css";
import { IoCodeSlash, IoSend } from 'react-icons/io5';
import { BiPlanet } from 'react-icons/bi';
import { FaPython } from 'react-icons/fa';
import { TbMessageChatbot } from 'react-icons/tb';
import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  let allMessages = [];

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert("You must write something...!");
    }
  };

  const API_KEY = import.meta.env.VITE_API_KEY;

  const generateResponse = async (msg) => {
    if (!msg) return;

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);

    const newMessages = [
      ...messages,
      { type: "userMsg", text: msg },
      { type: "responseMsg", text: result.response.text() },
    ];

    setMessages(newMessages);
    setisResponseScreen(true);
    setMessage("");
    console.log(result.response.text());
  };

  const newChat = () => {
    setisResponseScreen(false);
    setMessages([]);
  };

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
      {isResponseScreen ? (
        <div className="h-[80vh]">
          <div className="header pt-6 flex items-center justify-between w-full px-6 md:px-16 lg:px-32">
            <h2 className="text-2xl">AxonAI</h2>
            <button
              id="newChatBtn"
              className="bg-[#181818] py-2 px-4 rounded-full cursor-pointer text-sm"
              onClick={newChat}
            >
              New Chat
            </button>
          </div>

          <div className="messages px-4 md:px-16 lg:px-32 mt-4 space-y-4">
            {messages?.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-md ${
                  msg.type === "userMsg"
                    ? "bg-blue-500 text-left"
                    : "bg-gray-700 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="middle h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-4xl m-6">AxonAI</h1>
          <div className="boxes mt-8 flex flex-wrap justify-center gap-4">
            {[
              { text: "What is coding? How we can learn it.", icon: IoCodeSlash },
              { text: "Which is the smallest planet of our solar system?", icon: BiPlanet },
              { text: "In which year Python was invented?", icon: FaPython },
              { text: "How we can use the AI effectively?", icon: TbMessageChatbot },
            ].map((card, index) => (
              <div
                key={index}
                className="card w-72 p-6 bg-[#181818] rounded-lg transition-all hover:bg-[#201f1f] cursor-pointer relative"
              >
                <p className="text-lg">{card.text}</p>
                <i className="absolute bottom-3 right-3 text-2xl">{React.createElement(card.icon)}</i>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bottom w-full flex flex-col items-center px-4 md:px-16 lg:px-32 py-4">
        <div className="inputBox w-full md:w-3/5 text-sm py-2 flex items-center bg-[#181818] rounded-full">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="p-3 pl-4 bg-transparent flex-1 outline-none border-none"
            placeholder="Write your message here..."
            id="messageBox"
          />
          {message && (
            <i
              className="text-green-500 text-2xl mr-5 cursor-pointer"
              onClick={hitRequest}
            >
              <IoSend />
            </i>
          )}
        </div>
        <p className="text-gray-400 text-sm mt-2">
          AxonAI is developed by Pooja Lalwani. This AI uses the Gemini API for
          giving the responses.
        </p>
        <p className="text-gray-400">Copyright © 2025 Pooja Lalwani.</p>
      </div>
    </div>
  );
};

export default App;
