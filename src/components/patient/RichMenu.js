import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Gift, Phone, ArrowUpCircle, Bot, Settings } from 'lucide-react';

const DENTIST_PHONE = '092-123-4567'; // 仮の電話番号

const RichMenu = () => {
  const navigate = useNavigate();

  // チャット履歴サンプル
  const messages = [
    { type: 'bot', icon: <Bot className="w-6 h-6 text-blue-500" />, text: 'こんにちは！ご予約やご相談はお気軽にどうぞ。' },
    { type: 'user', text: 'AI歯科医相談を使いたいです。' },
    { type: 'bot', icon: <Bot className="w-6 h-6 text-blue-500" />, text: 'AI歯科医相談は下のボタンからどうぞ！' },
  ];

  // メニュー
  const menuItems = [
    {
      id: 'ai',
      icon: <MessageCircle className="w-7 h-7" />, 
      label: 'AI歯科医に相談する',
      color: 'bg-purple-600',
      action: () => navigate('/patient/chat')
    },
    {
      id: 'benefit',
      icon: <Gift className="w-7 h-7" />, 
      label: '歯知クラブ特典を使う',
      color: 'bg-orange-500',
      action: () => navigate('/patient/home')
    },
    {
      id: 'phone',
      icon: <Phone className="w-7 h-7" />, 
      label: '歯科医院に電話する',
      color: 'bg-green-600',
      action: () => window.location.href = `tel:${DENTIST_PHONE}`
    },
    {
      id: 'upgrade',
      icon: <ArrowUpCircle className="w-7 h-7" />, 
      label: 'アップグレードする',
      color: 'bg-yellow-500',
      action: () => navigate('/patient/plans')
    },
  ];

  return (
    <div className="liff-container flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* LINE風ヘッダー */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center">
        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-bold text-sm">歯</span>
        </div>
        <div>
          <h1 className="font-semibold text-gray-800">はち歯科医院</h1>
          <p className="text-sm text-green-600">オンライン</p>
        </div>
      </div>

      {/* チャット履歴 */}
      <div className="flex-1 p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          msg.type === 'user' ? (
            <div key={idx} className="flex justify-end">
              <div className="bg-green-400 text-white rounded-lg px-4 py-2 max-w-xs shadow">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={idx} className="flex items-start">
              <div className="mr-2 flex-shrink-0">{msg.icon}</div>
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 max-w-xs shadow text-gray-800">
                {msg.text}
              </div>
            </div>
          )
        ))}
      </div>

      {/* リッチメニュー */}
      <div className="bg-white border-t border-gray-200">
        <div className="grid grid-cols-2 gap-0">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className={`${item.color} text-white p-6 flex flex-col items-center justify-center hover:opacity-90 transition-opacity`}
            >
              {item.icon}
              <span className="text-sm font-medium mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* メッセージ入力風 + 設定ボタン */}
      <div className="bg-white border-t border-gray-200 p-3">
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
            <span className="text-gray-500 text-sm">メッセージを入力</span>
          </div>
          {/* 設定ボタン（最小限の枠） */}
          <button
            onClick={() => navigate('/patient/settings')}
            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full transition-colors flex items-center justify-center"
            title="設定"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RichMenu; 