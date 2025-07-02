import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Sparkles, Users, MessageCircle, CheckCircle, Clock } from 'lucide-react';

const PatientHome = () => {
  const navigate = useNavigate();
  const [benefits, setBenefits] = useState([
    {
      id: 1,
      name: '指名無料',
      icon: Users,
      remaining: 3,
      total: 5,
      description: '好きなスタッフを指名できます',
      expiry: '2024年12月まで'
    },
    {
      id: 2,
      name: 'エアフロー',
      icon: Sparkles,
      remaining: 2,
      total: 3,
      description: '歯面クリーニング',
      expiry: '2024年12月まで'
    },
    {
      id: 3,
      name: 'ホワイトニング',
      icon: Crown,
      remaining: 1,
      total: 2,
      description: '歯の漂白・美白',
      expiry: '2024年12月まで'
    }
  ]);
  const [showConfirm, setShowConfirm] = useState({ open: false, idx: null });

  const handleUseBenefit = (idx) => {
    setShowConfirm({ open: true, idx });
  };

  const handleConfirm = (yes) => {
    if (yes && showConfirm.idx !== null) {
      setBenefits(prev => prev.map((b, i) =>
        i === showConfirm.idx && b.remaining > 0
          ? { ...b, remaining: b.remaining - 1 }
          : b
      ));
    }
    setShowConfirm({ open: false, idx: null });
  };

  const usageHistory = [
    { date: '2024/10/15', service: '指名無料', staff: '田中先生', status: '使用済' },
    { date: '2024/09/20', service: 'エアフロー', staff: '佐藤衛生士', status: '使用済' },
    { date: '2024/08/10', service: '指名無料', staff: '山田先生', status: '使用済' },
  ];

  return (
    <div className="liff-container">
      {/* ヘッダー */}
      <div className="bg-primary-600 text-white p-4">
        <h1 className="text-xl font-bold">歯知式ホーム</h1>
        <p className="text-primary-100 text-sm">田中 太郎さん</p>
      </div>

      <div className="p-4 space-y-6">
        {/* サブスク加入状況 */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">サブスク加入状況</h2>
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">加入中</span>
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-green-700">
              <strong>8クラブ シルバー</strong><br />
              月額: ¥1,980<br />
              次回更新: 2024年11月15日
            </p>
          </div>
        </div>

        {/* 利用可能特典 */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">利用可能特典</h2>
          <p className="text-sm text-blue-700 mb-4">ご来院の際は、この画面をスタッフにお見せいただき、ご希望の特典をお伝えください。</p>
          <div className="space-y-3">
            {benefits.map((benefit, idx) => {
              const IconComponent = benefit.icon;
              return (
                <div key={benefit.id} className="border border-gray-200 rounded-lg p-3 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <IconComponent className="w-5 h-5 text-primary-600 mr-2" />
                      <span className="font-medium text-gray-800">{benefit.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary-600">
                        残り{benefit.remaining}回
                      </div>
                      <div className="text-xs text-gray-500">
                        /{benefit.total}回
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{benefit.description}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Clock className="w-3 h-3 mr-1" />
                    {benefit.expiry}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ width: `${(benefit.remaining / benefit.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex flex-col items-end">
                    <button
                      className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                      onClick={() => handleUseBenefit(idx)}
                      disabled={benefit.remaining === 0}
                    >
                      利用する
                    </button>
                    <span className="text-xs text-red-600 mt-1">利用するボタンはスタッフが操作してください</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 利用履歴 */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">利用履歴</h2>
          <div className="space-y-3">
            {usageHistory.map((history, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800">{history.service}</div>
                  <div className="text-sm text-gray-600">{history.staff}</div>
                  <div className="text-xs text-gray-500">{history.date}</div>
                </div>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">済</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AIチャットボタン */}
        <button 
          onClick={() => navigate('/patient/richmenu')}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-4 px-6 rounded-lg flex items-center justify-center transition-all mt-8"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          LINEの画面に戻る
        </button>
      </div>

      {/* 利用確認ポップアップ */}
      {showConfirm.open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full">
            <h3 className="text-lg font-bold mb-4">利用しますか？</h3>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={() => handleConfirm(false)}
              >
                いいえ
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => handleConfirm(true)}
              >
                はい
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientHome; 