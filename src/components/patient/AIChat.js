import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, User } from 'lucide-react';

const AIChat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user',
      content: 'AI歯科医に相談したいです。',
      timestamp: '14:30'
    },
    {
      id: 2,
      type: 'bot',
      content: 'こんにちは、AI歯科医のマリアです。はち歯科医院 大野城店に通院中の上村さま、本日は何かお困りごとはございますか？\n\n（私は歯科医を補助するツールです。正確な診察や治療は歯科医院にて行います。また、本サービスでお伺いした内容は歯科医院に共有されますので、どうぞご安心ください。）\n※1日10回まで相談できます。',
      timestamp: '14:31'
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // AI応答をシミュレート
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: 'ご質問ありがとうございます。詳しく確認させていただき、適切なアドバイスをお返しします。緊急性がある場合は、すぐに歯科医院にお電話ください。',
        timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="liff-container flex flex-col h-screen">
      {/* ヘッダー */}
      <div className="bg-purple-600 text-white p-4 flex items-center">
        <button 
          onClick={() => navigate('/patient/richmenu')}
          className="mr-3"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center">
          <User className="w-6 h-6 mr-2" />
          <div>
            <h1 className="text-lg font-semibold">AI歯科医</h1>
            <p className="text-purple-200 text-sm">オンライン</p>
          </div>
        </div>
      </div>

      {/* チャットメッセージ */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`rounded-lg p-3 ${
                msg.type === 'user' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white border border-gray-200'
              }`}>
                <div className="flex items-start mb-1">
                  {msg.type === 'bot' && (
                    <User className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  )}
                  {msg.type === 'user' && (
                    <User className="w-4 h-4 text-white mr-2 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm whitespace-pre-line ${msg.type === 'user' ? 'text-white' : 'text-gray-800'}`}>
                      {msg.content}
                    </p>
                  </div>
                </div>
                <p className={`text-xs ${msg.type === 'user' ? 'text-primary-200' : 'text-gray-500'} text-right`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* メッセージ入力 */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="メッセージを入力..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          緊急時は直接歯科医院にお電話ください
        </p>
      </div>
    </div>
  );
};

export default AIChat; 