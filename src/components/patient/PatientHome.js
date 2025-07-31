import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Sparkles, Users, MessageCircle, CheckCircle, Clock, Star, Gift, Trophy, Zap, ArrowUp } from 'lucide-react';

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
      expiry: '2025年10月31日まで'
    },
    {
      id: 2,
      name: 'エアフロー',
      icon: Sparkles,
      remaining: 2,
      total: 3,
      description: '歯面クリーニング',
      expiry: '2025年10月31日まで'
    },
    {
      id: 3,
      name: 'ホワイトニング',
      icon: Crown,
      remaining: 1,
      total: 2,
      description: '歯の漂白・美白',
      expiry: '2025年10月31日まで'
    }
  ]);
  const [showConfirm, setShowConfirm] = useState({ open: false, idx: null });
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationText, setCelebrationText] = useState('');

  const handleUseBenefit = (idx) => {
    setShowConfirm({ open: true, idx });
  };

  const handleConfirm = (yes) => {
    if (yes && showConfirm.idx !== null) {
      const benefit = benefits[showConfirm.idx];
      setBenefits(prev => prev.map((b, i) =>
        i === showConfirm.idx && b.remaining > 0
          ? { ...b, remaining: b.remaining - 1 }
          : b
      ));
      
      // 祝いのアニメーションを開始
      setCelebrationText(`${benefit.name}をご利用いただきありがとうございます！`);
      setShowCelebration(true);
      
      // 3秒後にアニメーションを隠す
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
    setShowConfirm({ open: false, idx: null });
  };

  const usageHistory = [
    { date: '2024/10/15', service: '指名無料', status: '使用済', icon: Users },
    { date: '2024/09/20', service: 'エアフロー', status: '使用済', icon: Sparkles },
    { date: '2024/08/10', service: '指名無料', status: '使用済', icon: Users },
    { date: '2024/07/25', service: 'ホワイトニング', status: '使用済', icon: Crown },
    { date: '2024/06/15', service: 'エアフロー', status: '使用済', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* 祝いのアニメーション */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="celebration-animation">
            <div className="fireworks">
              <div className="firework-1"></div>
              <div className="firework-2"></div>
              <div className="firework-3"></div>
            </div>
            <div className="celebration-text">
              <Trophy className="w-16 h-16 text-yellow-400 mb-4 mx-auto animate-bounce" />
              <p className="text-white text-2xl font-bold text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                特典Get
              </p>
              <p className="text-white text-lg text-center mt-2">{celebrationText}</p>
              <div className="flex justify-center mt-4 space-x-2">
                <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                <Star className="w-6 h-6 text-yellow-400 animate-pulse" style={{animationDelay: '0.2s'}} />
                <Star className="w-6 h-6 text-yellow-400 animate-pulse" style={{animationDelay: '0.4s'}} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-white bg-opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Crown className="w-8 h-8 text-yellow-300 mr-3" />
                歯知クラブ特典ラウンジ
              </h1>
              <p className="text-blue-200 text-sm mt-1">田中 太郎さん - Pro会員</p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-yellow-300">
                <Star className="w-5 h-5 mr-1" />
                <Star className="w-5 h-5 mr-1" />
                <Star className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* サブスク加入状況 */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Gift className="w-6 h-6 text-yellow-500 mr-2" />
              サブスク加入状況
            </h2>
            <div className="flex items-center text-green-500">
              <CheckCircle className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">加入中</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-xl mb-4 shadow-lg">
            <p className="text-white">
              <strong className="text-yellow-200 text-lg">歯知クラブ Pro</strong><br />
              <span className="text-blue-100">月額: ¥1,980</span><br />
              <span className="text-blue-100">次回更新: 2025年11月15日</span>
            </p>
          </div>
          <button
            onClick={() => navigate('/patient/plans')}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <ArrowUp className="w-5 h-5 mr-2" />
            プランをアップグレードする
          </button>
        </div>

        {/* 利用可能特典 */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
            <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
            利用可能特典
          </h2>
          <p className="text-sm text-blue-600 mb-6">ご来院の際は、この画面をスタッフにお見せいただき、ご希望の特典をお伝えください。</p>
          <div className="space-y-4">
            {benefits.map((benefit, idx) => {
              const IconComponent = benefit.icon;
              return (
                <div key={benefit.id} className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-4 relative overflow-hidden shadow-md">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full -mr-16 -mt-16"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-lg mr-3 shadow-md">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-gray-800 text-lg">{benefit.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                          残り{benefit.remaining}回
                        </div>
                        <div className="text-sm text-gray-500">
                          /{benefit.total}回
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{benefit.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Clock className="w-4 h-4 mr-1" />
                      {benefit.expiry}
                    </div>
                    {/* スロット表示 */}
                    <div className="flex items-center space-x-2 mb-4">
                      {[...Array(benefit.total)].map((_, index) => {
                        const isUsed = index < (benefit.total - benefit.remaining);
                        return (
                          <div
                            key={index}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              !isUsed
                                ? 'border-gray-400 bg-transparent' // ○ 未使用（空白の丸）
                                : 'border-yellow-400 bg-yellow-400' // ● 使用済み（金色の丸）
                            }`}
                          >
                            {isUsed && (
                              <div className="w-2 h-2 bg-yellow-800 rounded-full"></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-col items-end">
                      <button
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
                        onClick={() => handleUseBenefit(idx)}
                        disabled={benefit.remaining === 0}
                      >
                        利用する
                      </button>
                      <span className="text-xs text-red-500 mt-2">利用するボタンはスタッフが操作してください</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 利用履歴 - スタンプラリー風 */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
            利用履歴
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {usageHistory.map((history, index) => {
              const IconComponent = history.icon;
              return (
                <div key={index} className="relative">
                  <div className="flex items-center">
                    {/* スタンプ */}
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white relative">
                        <IconComponent className="w-8 h-8 text-white" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-800" />
                        </div>
                      </div>
                    </div>
                    
                    {/* 内容 */}
                    <div className="flex-1 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200 shadow-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-gray-800 text-lg">{history.service}</div>
                          <div className="text-sm text-gray-500">{history.date}</div>
                        </div>
                        <div className="flex items-center text-green-500">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            完了
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 接続線 */}
                  {index < usageHistory.length - 1 && (
                    <div className="ml-8 w-0.5 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 my-2"></div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* スタンプラリー進捗 */}
          <div className="mt-6 text-center">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 shadow-lg">
              <p className="text-white font-bold mb-2">特典利用進捗</p>
              <div className="flex justify-center space-x-2">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className={`w-4 h-4 rounded-full ${i < usageHistory.length ? 'bg-yellow-300' : 'bg-blue-300'}`}></div>
                ))}
              </div>
              <p className="text-blue-100 text-sm mt-2">
                {usageHistory.length}/10 利用済み
              </p>
            </div>
          </div>
        </div>

        {/* LINEボタン */}
        <button 
          onClick={() => navigate('/patient/richmenu')}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <MessageCircle className="w-6 h-6 mr-2" />
          LINEの画面に戻る
        </button>
      </div>

      {/* 利用確認ポップアップ */}
      {showConfirm.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xs w-full border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">利用しますか？</h3>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300"
                onClick={() => handleConfirm(false)}
              >
                いいえ
              </button>
              <button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                onClick={() => handleConfirm(true)}
              >
                はい
              </button>
            </div>
          </div>
        </div>
      )}

      {/* カスタムCSS */}
      <style jsx>{`
        .celebration-animation {
          animation: celebrationFadeIn 0.5s ease-out;
        }
        
        @keyframes celebrationFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .fireworks {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .firework-1, .firework-2, .firework-3 {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          animation: firework 2s ease-out;
        }
        
        .firework-1 {
          background: #ff6b6b;
          top: 20%;
          left: 20%;
          animation-delay: 0s;
        }
        
        .firework-2 {
          background: #4ecdc4;
          top: 30%;
          right: 20%;
          animation-delay: 0.3s;
        }
        
        .firework-3 {
          background: #ffe66d;
          bottom: 20%;
          left: 50%;
          animation-delay: 0.6s;
        }
        
        @keyframes firework {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 currentColor;
          }
          50% {
            transform: scale(1.5);
            box-shadow: 
              0 0 0 10px transparent,
              0 0 0 20px transparent,
              0 0 0 30px transparent;
          }
          100% {
            transform: scale(1);
            box-shadow: 
              0 0 0 10px transparent,
              0 0 0 20px transparent,
              0 0 0 30px transparent;
          }
        }
        
        .celebration-text {
          position: relative;
          z-index: 10;
          background: rgba(0, 0, 0, 0.8);
          padding: 2rem;
          border-radius: 1rem;
          border: 2px solid #fbbf24;
        }
      `}</style>
    </div>
  );
};

export default PatientHome; 