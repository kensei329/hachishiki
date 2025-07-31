import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, CreditCard, Settings as SettingsIcon, HelpCircle, ToggleLeft, ToggleRight, Crown, Building, Phone, Mail, MessageCircle } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const [autoRenewal, setAutoRenewal] = useState(true);

  // 加入者情報（サンプルデータ）
  const memberInfo = {
    patientNumber: 'P-2024-0123',
    name: '田中 太郎',
    plan: '歯知クラブ Pro',
    monthlyFee: '¥1,980',
    joinDate: '2024年1月15日',
    nextRenewal: '2025年11月15日',
    clinic: {
      name: 'はち歯科医院 大野城店',
      phone: '092-123-4567',
      address: '福岡県大野城市○○○1-2-3'
    }
  };

  const qaItems = [
    {
      question: '2年目以降の継続について',
      answer: '2年目以降の継続加入者は入会金が免除となります。毎年の更新時には月額料金のみで継続いただけます。'
    },
    {
      question: '解約方法について',
      answer: '解約をご希望の場合は、次回自動更新をOFFに設定してください。解約のお申し出をいただいた後も、次回年度更新日までは引き続きサービスをご利用いただけます。'
    },
    {
      question: '再加入について',
      answer: '一度解約された後に再加入される場合は、新規加入時と同様に入会費が発生いたします。継続してお得にご利用いただくため、解約前に十分ご検討ください。'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-white bg-opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/patient/richmenu')}
              className="mr-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <SettingsIcon className="w-8 h-8 text-yellow-300 mr-3" />
              <h1 className="text-2xl font-bold">設定</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* 現在のプラン */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Crown className="w-6 h-6 text-yellow-500 mr-2" />
            現在のプラン
          </h2>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-xl shadow-lg">
            <div className="text-white">
              <div className="text-2xl font-bold text-yellow-200 mb-2">{memberInfo.plan}</div>
              <div className="text-blue-100">月額料金: {memberInfo.monthlyFee}</div>
              <div className="text-blue-100">加入日: {memberInfo.joinDate}</div>
              <div className="text-blue-100">次回更新: {memberInfo.nextRenewal}</div>
            </div>
          </div>
        </div>

        {/* 加入者情報 */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <User className="w-6 h-6 text-yellow-500 mr-2" />
            加入者情報
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="text-gray-600 text-sm">患者番号</div>
              <div className="text-gray-800 font-bold text-lg">{memberInfo.patientNumber}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="text-gray-600 text-sm">お名前</div>
              <div className="text-gray-800 font-bold text-lg">{memberInfo.name}</div>
            </div>
          </div>
        </div>

        {/* 通院歯科医院情報 */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Building className="w-6 h-6 text-yellow-500 mr-2" />
            通院歯科医院
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="text-gray-800 font-bold text-lg mb-2">{memberInfo.clinic.name}</div>
              <div className="text-gray-600 text-sm flex items-center mb-1">
                <Phone className="w-4 h-4 mr-2" />
                {memberInfo.clinic.phone}
              </div>
              <div className="text-gray-600 text-sm flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {memberInfo.clinic.address}
              </div>
            </div>
          </div>
        </div>

        {/* 自動更新設定 */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <CreditCard className="w-6 h-6 text-yellow-500 mr-2" />
            自動更新設定
          </h2>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-800 font-medium">自動更新</div>
                <div className="text-gray-600 text-sm">年額プランの自動更新を設定</div>
              </div>
              <button
                onClick={() => setAutoRenewal(!autoRenewal)}
                className="flex items-center"
              >
                {autoRenewal ? (
                  <ToggleRight className="w-12 h-6 text-green-500" />
                ) : (
                  <ToggleLeft className="w-12 h-6 text-gray-400" />
                )}
              </button>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              {autoRenewal 
                ? '自動更新が有効です。次回更新日に自動的に継続されます。'
                : '自動更新が無効です。次回更新日でサービスが終了します。'
              }
            </div>
          </div>
        </div>

        {/* よくあるQ&A */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <HelpCircle className="w-6 h-6 text-yellow-500 mr-2" />
            よくあるQ&A
          </h2>
          <div className="space-y-4">
            {qaItems.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="text-blue-600 font-bold mb-2 flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-2">
                    Q
                  </span>
                  {item.question}
                </div>
                <div className="text-gray-700 text-sm leading-relaxed pl-8">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-sm font-bold mr-2">
                    A
                  </span>
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LINEの画面に戻るボタン */}
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

export default Settings; 