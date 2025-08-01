import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';
import { Settings } from 'lucide-react';

const initialPlans = [
  {
    id: 'basic',
    name: 'ベーシック',
    price: 980,
    features: [
      '月1回の定期検診',
      'AIチャット相談',
      '基本的な予防ケア',
      '治療計画の確認',
      'オンライン予約'
    ]
  },
  {
    id: 'silver',
    name: 'Pro',
    price: 1980,
    features: [
      'ベーシックプランの全機能',
      'ファストパス予約',
      '専門スタッフ指名（割引あり）',
      'プロクリーニング年1回',
      '歯科グッズ10%割引'
    ]
  },
  {
    id: 'gold',
    name: 'Pro Max',
    price: 2980,
    features: [
      'Proプランの全機能',
      '専門スタッフ指名無料',
      'VIP優先予約',
      'ホワイトニング年2回',
      '歯科グッズ20%割引',
      '口腔ケア用品プレゼント',
      '特別特典: 24時間緊急対応, 歯科衛生士アサイン, 特別診療室利用可'
    ]
  }
];

const PlanManagement = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState(initialPlans);

  return (
    <AdminNav>
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">サブスクプラン管理</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, idx) => (
              <div key={plan.id} className="bg-white rounded-xl shadow p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                <div className="text-2xl font-extrabold mb-2 text-gray-900">¥{plan.price.toLocaleString()}<span className="text-base font-medium text-gray-500">/月</span></div>
                <ul className="mb-4 space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="text-gray-700 flex items-center">
                      <span className="text-green-500 mr-2">✔</span>{f}
                    </li>
                  ))}
                </ul>
                <button 
                  className="btn-primary w-full mt-auto" 
                  onClick={() => navigate('/admin/benefits')}
                >
                  <Settings className="w-4 h-4 mr-1" />
                  特典設定
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminNav>
  );
};

export default PlanManagement; 