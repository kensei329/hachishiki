import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Sparkles, Calculator } from 'lucide-react';

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
    name: 'Pro',
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
    name: 'Pro Max',
    price: 2980,
    color: 'border-yellow-400',
    features: [
      'Proプランの全機能',
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
      {/* 最上部: 現在のプラン状況と料金切り替え */}
      <div className="max-w-4xl mx-auto mb-8 px-4">
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">歯知クラブ メンバーシップ</h1>
            <p className="text-gray-600 mb-4">
              あなたの口腔健康を定期的にサポートする、プレミアムな歯科ケアサービスです。<br />
              月額制で安心の継続ケアを受けられます。
            </p>
          </div>
          
          {/* 現在のプラン状況 */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 rounded-full px-6 py-3 mb-4">
              <span className="text-green-700 font-bold text-lg">
                🛡️ 現在: ベーシックプラン加入中
              </span>
            </div>
            
            {/* 料金切り替えスイッチ */}
            <div className="flex items-center space-x-4 bg-gray-50 rounded-full px-6 py-3">
              <span className={`text-sm font-medium ${!isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
                月額払い
              </span>
              <label className="inline-flex relative items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isYearly} 
                  onChange={() => setIsYearly(!isYearly)} 
                />
                <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-6"></div>
              </label>
              <span className={`text-sm font-medium ${isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
                年額払い（10%OFF）
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ベーシック、Pro、Pro Max プラン比較 */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

      {/* セラミック治療お得度PR */}
      <div className="max-w-4xl mx-auto mb-12 px-4">
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-orange-500 mr-3" />
              <h2 className="text-2xl font-bold text-orange-800">セラミック治療をお考えの方へ</h2>
            </div>
            <p className="text-orange-700 text-lg font-medium">
              歯知クラブなら、セラミック治療がこんなにお得！
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* 通常料金 */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">💸 通常料金</h3>
                <div className="text-gray-600 text-sm mb-3">（歯知クラブ未加入の場合）</div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-700">セラミック 1本</span>
                  <span className="font-bold text-gray-800">¥70,000</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-700">セラミック 2本</span>
                  <span className="font-bold text-gray-800">¥140,000</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-gray-800">合計</span>
                  <span className="text-2xl font-bold text-red-600">¥140,000</span>
                </div>
              </div>
            </div>

            {/* 歯知クラブ料金 */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 border-2 border-blue-400 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400 rounded-full -mr-10 -mt-10 opacity-20"></div>
              <div className="relative z-10">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">✨ 歯知クラブ Pro以上</h3>
                  <div className="text-blue-100 text-sm mb-3">（10%OFF特典適用）</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-blue-300 pb-2">
                    <span className="text-blue-100">セラミック 2本（10%OFF）</span>
                    <span className="font-bold text-white">¥126,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-blue-300 pb-2">
                    <span className="text-blue-100">歯知クラブ Pro 年会費</span>
                    <span className="font-bold text-white">¥10,000</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-white">合計</span>
                    <span className="text-2xl font-bold text-yellow-300">¥136,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 節約額表示 */}
          <div className="mt-8 text-center">
            <div className="bg-green-100 border-2 border-green-300 rounded-2xl p-6 inline-block">
              <div className="flex items-center justify-center mb-2">
                <Calculator className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-green-800 font-bold text-lg">節約効果</span>
              </div>
              <div className="text-3xl font-bold text-green-700 mb-2">
                ¥4,000 お得！
              </div>
              <div className="text-green-600 text-sm">
                セラミック2本の治療なら、歯知クラブ加入がお得です
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-orange-700 text-sm">
              ※ セラミック治療以外にも様々な特典をご利用いただけます
            </p>
          </div>
        </div>
      </div>
      
      {/* 注意書き */}
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            ご契約・お支払いに関するご案内
          </h3>
          <p className="text-gray-700 mb-6 text-center">
            お客様に安心してサービスをご利用いただくために、以下の内容をご確認ください。
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">1. ご契約期間について</h4>
              <p className="text-gray-700">
                すべてのプランは <span className="font-bold">年間契約</span> となっております。途中解約は承っておりませんので、あらかじめご了承ください。
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">2. 特典の有効期限について</h4>
              <p className="text-gray-700">
                ご契約後に付与される各種特典は、ご加入日から <span className="font-bold">1年間</span> ご利用いただけます。期限を過ぎますとご利用いただけなくなりますので、ぜひお早めのご活用をおすすめいたします。
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">3. お支払い方法について</h4>
              <p className="text-gray-700">
                お支払いはクレジットカード決済のみ対応しております。お客様のご都合に合わせて、「<span className="font-bold">月別払い</span>」または「<span className="font-bold">年間一括払い</span>」をご選択いただけます。
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">4. プランのアップグレードについて</h4>
              <p className="text-gray-700">
                すでに「ベーシックプラン」にご加入いただいているお客様は、いつでも「<span className="font-bold">Proプラン</span>」「<span className="font-bold">Pro Maxプラン</span>」へのアップグレードが可能です。<br />
                アップグレード後は、決済完了時点から上位プランの特典内容が反映されます。
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">5. プランのダウングレードについて</h4>
              <p className="text-gray-700">
                「Pro」または「Pro Max」から「ベーシック」など下位プランへ変更されたい場合は、マイページより翌年の自動更新プランを変更いただけます。<br />
                たとえば、「Proプラン」の契約が終了した翌日から「ベーシックプラン（月払いまたは年払い）」として自動更新されるよう設定可能です。
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">6. 自動更新設定について</h4>
              <p className="text-gray-700">
                マイページにて、翌年の自動更新の有無を自由に切り替えることができます。継続をご希望でない場合は、更新日の前日までに自動更新をオフにしてください。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LINEの画面に戻るボタン */}
      <div className="max-w-3xl mx-auto mt-8 px-4">
        <button 
          onClick={() => navigate('/patient/richmenu')}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <MessageCircle className="w-6 h-6 mr-2" />
          LINEの画面に戻る
        </button>
      </div>
    </div>
  );
};

export default Plans; 