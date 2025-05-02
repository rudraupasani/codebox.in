import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { motion } from 'framer-motion';

const Chatbox = () => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                sender: 'ai',
                content: 'How Can CODEBOX Help You Today?',
            }
        ]);
    }, []);

    const handleSend = async () => {
        if (!text.trim()) return;

        const userMessage = {
            sender: 'user',
            content: text.trim(),
        };

        setMessages(prev => [...prev, userMessage]);
        setText('');

        try {
            const response = await axios.post('http://localhost:3000/geminichat', {
                model: 'gemini-2.0-flash',
                messages: [
                    { role: 'user', content: text.trim() },
                ],
                temperature: 0.7,
                maxTokens: 100,
                topP: 1,
                topK: 40,
                stopSequences: ['\n'],
                prompt: text.trim(),
            });

            const aiReply = {
                sender: 'ai',
                content: response.data.response,
            };

            setMessages(prev => [...prev, aiReply]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            const errorMessage = {
                sender: 'ai',
                content: 'Sorry, I am unable to process your request at the moment.',
            };
            setMessages(prev => [...prev, errorMessage]);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen w-screen bg-gradient-to-br from-black to-gray-900 p-4 gap-8">
            <Navbar />
            <motion.h1
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4, delay: 1 }}
            
            className="text-xl lg:text-4xl font-bold text-white mb-4 mt-14">Chat with AI</motion.h1>

            <div className="flex flex-col w-full h-140 rounded-lg p-6 shadow-lg overflow-x-auto">
                <div className="flex flex-col gap-4 overflow-y-auto h-screen lg:max-h-[400px] mb-4 scrollbar-none">
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 1 }}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`p-4 ${message.sender === 'user' ? 'bg-blue-900' : 'bg-gray-700'} text-white rounded-lg max-w-md lgmax-w-xs overflow-hidden whitespace-pre-wrap break-words`}>
                                {message.sender === 'user' ? `You : ${message.content}` : `AI : ${message.content}`}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="flex fixed bottom-5 left-0 w-full p-4 rounded-lg shadow-lg">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 p-4 rounded-lg bg-gray-900 rounded-r-none text-white outline-none"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />
                    <button
                        onClick={handleSend}
                        className="bg-blue-900 rounded-l-none cursor-pointer hover:bg-blue-900 text-white p-4 rounded-lg"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
