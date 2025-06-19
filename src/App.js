
// App.js
import React, { useState } from 'react';
import ChatBot from './components/ChatBot';

function App() {
  const [OpenChat, setOpenChat] = useState(true); // auto-opens chat

  return (
    <div className="App">
      <h1>Welcome to Open Chat</h1>
      <ChatBot OpenChat={OpenChat} setOpenChat={setOpenChat} />
    </div>
  );
}

export default App;
