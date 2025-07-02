import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    id: 'basic',
    name: 'ベーシック',
    price: 980,
    color: 'border-gray-200',
    features: [
      '月1回の定期検診',
      'AIチャット相談',
      '基本的な予防ケア',
      '治療計画の確認',
      'オンライン予約'
    ],
    button: '加入中',
    highlight: false,
    badge: null,
    disabled: true
  },
  {
    id: 'silver',
    name: 'シルバー',
    price: 1980,
    color: 'border-blue-400',
    features: [
      'ベーシックプランの全機能',
      'ファストパス予約',
      '専門スタッフ指名（割引あり）',
      'プロクリーニング年1回',
      '歯科グッズ10%割引'
    ],
    button: '今すぐ加入',
    highlight: true,
    badge: '人気No.1',
    disabled: false
  },
  {
    id: 'gold',
    name: 'ゴールド',
    price: 2980,
    color: 'border-yellow-400',
    features: [
      'シルバープランの全機能',
      '専門スタッフ指名無料',
      'VIP優先予約',
      'ホワイトニング年2回',
      '歯科グッズ20%割引',
      '口腔ケア用品プレゼント',
      '特別特典: 24時間緊急対応, 歯科衛生士アサイン, 特別診療室利用可'
    ],
    button: '今すぐ加入',
    highlight: false,
    badge: 'プレミアム',
    disabled: false
  }
];

const Plans = () => {
  const [selected, setSelected] = useState('basic');
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();

  const getPrice = (price) => isYearly ? price * 12 * 0.9 : price;
  const getPriceLabel = () => isYearly ? '年額（10%OFF）' : '月額';

  const handleJoin = (planId) => {
    setSelected(planId);
    setTimeout(() => {
      navigate('/patient/richmenu');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-2">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">8クラブ メンバーシップ</h1>
        <p className="text-gray-600 mb-4">あなたの口腔健康を定期的にサポートする、プレミアムな歯科ケアサービスです。<br />月額制で安心の継続ケアを受けられます。</p>
        <div className="flex flex-col items-center mb-4">
          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-2">
            現在: ベーシックプラン加入中
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 text-sm">月額払い</span>
            <label className="inline-flex relative items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
              <span className="ml-2 text-gray-700 text-sm">年額払い</span>
            </label>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div
            key={plan.id}
            className={`relative bg-white border-2 ${plan.color} rounded-2xl shadow-md flex flex-col items-center p-8 transition-all ${plan.highlight ? 'ring-2 ring-blue-400 scale-105 z-10' : ''}`}
          >
            {plan.badge && (
              <span className={`absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold ${plan.id === 'gold' ? 'bg-yellow-400 text-white' : 'bg-blue-500 text-white'}`}>
                {plan.badge}
              </span>
            )}
            <h2 className="text-xl font-bold mb-2 flex items-center">
              {plan.id === 'basic' && <span className="mr-2">🛡️</span>}
              {plan.id === 'silver' && <span className="mr-2">⭐</span>}
              {plan.id === 'gold' && <span className="mr-2">👑</span>}
              {plan.name}
            </h2>
            <div className="text-3xl font-extrabold mb-2 text-gray-900">
              ¥{getPrice(plan.price).toLocaleString()}
              <span className="text-base font-medium text-gray-500">/{isYearly ? '年' : '月'}</span>
            </div>
            <ul className="text-left mb-6 space-y-2">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✔</span>{f}
                </li>
              ))}
            </ul>
            <div className="flex w-full gap-2 mt-2">
              <button
                className={`flex-1 py-2 rounded-lg font-bold text-white ${plan.disabled ? 'bg-gray-300 cursor-not-allowed' : plan.id === 'gold' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600' : plan.id === 'silver' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'} mb-0`}
                disabled={plan.disabled}
                onClick={() => !plan.disabled && handleJoin(plan.id)}
              >
                {plan.button}
              </button>
              <button className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm bg-gray-50 mb-0" disabled>
                現地決済で加入
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans; 