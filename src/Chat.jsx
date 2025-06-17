import React, { useState, useEffect, useRef } from 'react';
import '../css/Chat.css';
import closeIcon from "../images/love-bot.png"; 

const RandomGenerator = [
    { text: "Type Hi Roku for a surprise" },
    { text: "Did you know? You're amazing!" },
    { text: "Surprise! You've unlocked a secret message!" },
    { text: "Here's a fun fact: You're doing great!" },
    { text: "You’ve earned a surprise! It's Roku bucks... jk!" },
    { text: "What does Roku say to Goku? Don't destroy my planet... get it? nvm" }
];
const JokeGenerator = [
  {
    joke: "Why do programmers prefer dark mode?",
    punchline: "Because light attracts bugs!"
  },
  {
    joke: "How many programmers does it take to change a light bulb?",
    punchline: "None, that's a hardware problem!"
  },
  {
    joke: "Why do Java developers wear glasses?",
    punchline: "Because they don't C#!"
  },
  {
    joke: "Why did the programmer quit his job?",
    punchline: "Because he didn't get arrays!"
  },
  {
    joke: "Why do programmers hate nature?",
    punchline: "It has too many bugs."
  },
  {
    joke: "How do you comfort a JavaScript bug?",
    punchline: "You console it."
  }
];



const ChatBot = ({ OpenRoku, setOpenRoku  }) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [isChatVisible, setIsChatVisible] = useState(OpenRoku); 
    const [isLoading, setIsLoading] = useState(false); 
    const [randomMessage, setRandomMessage] = useState("");
    const [randomJokes, setRandomJokes] = useState("");


    

    const getRandomJoke = () => {
        const randomIndex = Math.floor(Math.random() * JokeGenerator.length);
        return JokeGenerator[randomIndex];
    };


    const dummy = useRef();

    const handleSend = () => {
        if (userInput.trim() === "") return;
        
        const newMessages = [...messages, { sender: "user", text: userInput }];
        setMessages(newMessages);
        dummy.current.scrollIntoView({ behavior: "smooth" });

        setIsLoading(true);
    
        const blacklistedCommands = ["!help", "!contact", "!socials", "wyd", "hi roku", "!fly", "!lol"];
    
        const isBlacklisted = blacklistedCommands.some(command => userInput.trim().toLowerCase() === command);
    
        if (isBlacklisted) {
            if (userInput.trim().toLowerCase() === "!help") {
                setTimeout(() => {
                    const botMessage = { sender: "bot", text: "Here's a list of some commands: !help, !contact, !fly !lol, hi roku", };
                    setMessages([...newMessages, botMessage]);
                    setIsLoading(false); 
                }, 1000);
            } else if (userInput.trim().toLowerCase() === "hi roku") {
                setTimeout(() => {
                    const botMessage = { sender: "bot", text: "Roku Rules", special: true };
                    setMessages([...newMessages, botMessage]);
                    setIsLoading(false); 
                }, 1000);
            } 
            else if (userInput.trim().toLowerCase() === "!contact") {
                setTimeout(() => {
                    const botMessage = { sender: "bot", text: "email me at: onuohaikenna13@gmail.com" };
                    setMessages([...newMessages, botMessage]);
                    setIsLoading(false); 
                }, 1000);
            }else if (userInput.trim().toLowerCase() === "!fly") {
                setTimeout(() => {
                    const botMessage1 = { sender: "bot", text: "Did you think I was going to fly..." };
                    setMessages([...newMessages, botMessage1]);
                    setIsLoading(false); 
                }, 3000); 
            
                setTimeout(() => {
                    const botMessage2 = { sender: "bot", text: "Just kidding, I can fly! 🚀" };
                    setMessages(prevMessages => [...prevMessages, botMessage2]); 
                }, 5000); 
            }
            else if (userInput.trim().toLowerCase() === "!lol") {
                const randomJoke = getRandomJoke(); 
                setTimeout(() => {
                    const botMessage = { sender: "bot", text: randomJoke.joke }; 
                    setMessages([...newMessages, botMessage]);
                    setIsLoading(false); 
                }, 1000);
    
                setTimeout(() => {
                    const botPunchline = { sender: "bot", text: randomJoke.punchline }; 
                    setMessages(prevMessages => [...prevMessages, botPunchline]);
                }, 3000); 
            }

            else if (userInput.trim().toLowerCase() === "wyd") {
                setTimeout(() => {
                    const botMessage = { sender: "bot", text: "You know the usual, just hanging in space" };
                    setMessages([...newMessages, botMessage]);
                    setIsLoading(false); 
                }, 1000);
            }
            
            else {
                setTimeout(() => {
                    const botMessage = { sender: "bot", text: "Sorry, not sure what you mean!" };
                    setMessages([...newMessages, botMessage]);
                    setIsLoading(false); 
                }, 1000);
            }

            setUserInput("");
 
            return; 
        }

    
        const greetingCommands = ["hi", "hello", "yo"];
        if (greetingCommands.includes(userInput.trim().toLowerCase())) {
            setTimeout(() => {
                const botMessage = { sender: "bot", text: "Greetings traveller my name is Roku, what's yours?" };
                setMessages([...newMessages, botMessage]);
                setIsLoading(false); 
            }, 1500); 
            setUserInput(""); 
            return; 
        }

    
    
        const nameMatch = userInput.trim().toLowerCase().match(/my name is (\w+)/);
        const nameMatch2 = userInput.trim().toLowerCase().match(/(\w+)/);
    
        if (nameMatch || nameMatch2) {
            const name = nameMatch ? nameMatch[1] : nameMatch2[1]; 
            setIsLoading(false);  
            newMessages.push({ sender: "bot", text: `Hello, ${name}! nice to meet you.` });
            setMessages([...newMessages]); 
            setUserInput(""); 
            return; 
        }
    
       else{ setTimeout(() => {
            const botMessage = { sender: "bot", text: "Sorry, not sure what you mean!" };
            setMessages([...newMessages, botMessage]);
            setIsLoading(false); 
        }, 1000);
       }
        setUserInput(""); 


    };

    

    const RemoveRoku = () => {
        setIsChatVisible(false); 
        setOpenRoku(false); 
    };

    
    
    

    useEffect(() => {
        setIsChatVisible(OpenRoku); 
        if (OpenRoku) {
            setRandomMessage(RandomGenerator[Math.floor(Math.random() * RandomGenerator.length)].text);
        } else {
            setRandomMessage(""); 
        }
    }, [OpenRoku]); 
    
    const handleCloseChat = () => {
        setIsChatVisible(prev => {
            const newVisibility = !prev;
            if (!newVisibility) {
                setRandomMessage(""); 
            } else {
                setRandomMessage(RandomGenerator[Math.floor(Math.random() * RandomGenerator.length)].text);
            }
            return newVisibility;
        });
    };




    
    

    return (
        <>
        <div className='chat-top'>
            <div className="chat-close-btn" onClick={handleCloseChat}>
                <img src={closeIcon} alt="close" />
            </div>
        </div>
        
        
    
        {isChatVisible && ( 
            <div className={`chat-container ${!isChatVisible ? "hidden" : ""}`}>
                
            
                <div className='top-header'>
                        <h2>Chat with Roku</h2>
                        <div className='close-chat'>
                            <button
                            onClick={RemoveRoku}
                            ><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
                        </div>
                        </div>
                        <div className='randomize'>
                        <p>{randomMessage}</p>
                        </div>
                        <div className='command-list'>
                        <p>Type !help for a list of commands</p>
                        </div>
                <div className="chat-box">
                {messages.map((message, index) => (
    <div key={index} className={`message ${message.sender} ${message.special ? 'special' : ''}`}>
        {message.sender === "bot" && (
            <div className="message-image">
                <img src={closeIcon} alt="icon" />
            </div>
        )}
        <div className="message-text">
           <p>{message.text}</p>
        </div>
    </div>
))}
                     {isLoading && (
                            <div className="loader">
                                <div className="spinner"></div>
                                <p>Bot is typing...</p>
                            </div>
                        )}
                                        <div ref={dummy}></div>

                </div>

                <div className="input-container">
                    <input
                        className="input"
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Send Roku a message..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSend(); 
                            }
                        }}
                    />
                    <button className="button" onClick={handleSend}>
                        Send
                    </button>
                </div>
            </div>
        )}
    </>
    );
};

export default ChatBot;
