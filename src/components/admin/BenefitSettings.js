import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';
import { Plus, Edit, Save, X, Calendar, DollarSign, Trash2, Crown, Star, Users, Eye } from 'lucide-react';

const BenefitSettings = () => {
  const navigate = useNavigate();
  // プラン価格設定
  const [planPrices, setPlanPrices] = useState({
    basic: 980,
    pro: 1980,
    proMax: 2980,
  });

  // プラン別特典設定
  const [planBenefits, setPlanBenefits] = useState({
    basic: [
      { id: 1, name: 'AI歯科医相談', count: 1, description: 'AIによる歯科相談サービス' },
      { id: 2, name: '時間帯別割引', count: 1, description: '特定時間帯の治療割引' },
      { id: 3, name: 'お口の細菌バランス検査', count: 1, description: '口腔内の細菌バランスを検査（¥5,500相当）' },
      { id: 4, name: '唾液検査', count: 1, description: '唾液の成分を検査（¥5,500相当）' },
      { id: 5, name: '口臭検査', count: 1, description: '口臭の原因を検査（¥5,500相当）' },
      { id: 6, name: '血糖値検査', count: 1, description: '血糖値を検査（¥5,500相当）' },
    ],
    pro: [
      { id: 1, name: 'AI歯科医相談', count: 1, description: 'AIによる歯科相談サービス' },
      { id: 2, name: '時間帯別割引', count: 1, description: '特定時間帯の治療割引' },
      { id: 3, name: 'お口の細菌バランス検査', count: 1, description: '口腔内の細菌バランスを検査（¥5,500相当）' },
      { id: 4, name: '唾液検査', count: 1, description: '唾液の成分を検査（¥5,500相当）' },
      { id: 5, name: '口臭検査', count: 1, description: '口臭の原因を検査（¥5,500相当）' },
      { id: 6, name: '血糖値検査', count: 1, description: '血糖値を検査（¥5,500相当）' },
      { id: 7, name: 'セラミック1本10%OFF', count: 1, description: 'セラミック治療の10%割引' },
      { id: 8, name: 'パウダーメンテナンス', count: 1, description: 'パウダーメンテナンス（¥5,500相当）' },
      { id: 9, name: '口腔ケア商品プレゼント', count: 12, description: '口腔ケア商品を月1回プレゼント' },
    ],
    proMax: [
      { id: 1, name: 'AI歯科医相談', count: 1, description: 'AIによる歯科相談サービス' },
      { id: 2, name: '時間帯別割引', count: 1, description: '特定時間帯の治療割引' },
      { id: 3, name: 'お口の細菌バランス検査', count: 1, description: '口腔内の細菌バランスを検査（¥5,500相当）' },
      { id: 4, name: '唾液検査', count: 1, description: '唾液の成分を検査（¥5,500相当）' },
      { id: 5, name: '口臭検査', count: 1, description: '口臭の原因を検査（¥5,500相当）' },
      { id: 6, name: '血糖値検査', count: 1, description: '血糖値を検査（¥5,500相当）' },
      { id: 7, name: 'セラミック1本10%OFF', count: 1, description: 'セラミック治療の10%割引' },
      { id: 8, name: 'パウダーメンテナンス', count: 1, description: 'パウダーメンテナンス（¥5,500相当）' },
      { id: 9, name: '口腔ケア商品プレゼント', count: 12, description: '口腔ケア商品を月1回プレゼント' },
      { id: 10, name: 'ホームホワイトニング割引', count: 1, description: 'ホームホワイトニング¥10,000割引' },
      { id: 11, name: 'オーラルセラピー', count: 1, description: 'オーラルセラピー（¥3,300相当）' },
      { id: 12, name: 'リップクレンジング', count: 1, description: 'リップクレンジング（¥5,500相当）' },
    ],
  });

  const [editingPlan, setEditingPlan] = useState(null);
  const [editingBenefit, setEditingBenefit] = useState(null);
  const [newBenefit, setNewBenefit] = useState({
    name: '',
    count: 0,
    description: '',
  });

  const handlePriceChange = (plan, value) => {
    setPlanPrices({
      ...planPrices,
      [plan]: parseInt(value) || 0,
    });
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
  };

  const handleSavePlan = () => {
    setEditingPlan(null);
  };

  const handleEditBenefit = (plan, benefitId) => {
    setEditingBenefit({ plan, benefitId });
  };

  const handleSaveBenefit = () => {
    setEditingBenefit(null);
  };

  const handleBenefitChange = (plan, benefitId, field, value) => {
    setPlanBenefits({
      ...planBenefits,
      [plan]: planBenefits[plan].map(benefit =>
        benefit.id === benefitId ? { ...benefit, [field]: value } : benefit
      ),
    });
  };

  const handleDeleteBenefit = (plan, benefitId) => {
    setPlanBenefits({
      ...planBenefits,
      [plan]: planBenefits[plan].filter(benefit => benefit.id !== benefitId),
    });
  };

  const handleAddBenefit = (plan) => {
    if (newBenefit.name && newBenefit.description) {
      const newId = Math.max(...planBenefits[plan].map(b => b.id)) + 1;
      setPlanBenefits({
        ...planBenefits,
        [plan]: [...planBenefits[plan], { ...newBenefit, id: newId }],
      });
      setNewBenefit({ name: '', count: 0, description: '' });
    }
  };

  const getPlanIcon = (plan) => {
    switch (plan) {
      case 'basic': return <Users className="w-5 h-5" />;
      case 'pro': return <Star className="w-5 h-5" />;
      case 'proMax': return <Crown className="w-5 h-5" />;
      default: return <Users className="w-5 h-5" />;
    }
  };

  const getPlanName = (plan) => {
    switch (plan) {
      case 'basic': return 'ベーシック';
      case 'pro': return 'Pro';
      case 'proMax': return 'Pro Max';
      default: return plan;
    }
  };

  return (
    <AdminNav>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">特典設定</h1>
              <p className="mt-2 text-sm text-gray-700">
                サブスクリプションプランの価格と特典内容を管理します。
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                onClick={() => navigate('/admin/plans')}
                className="btn-primary"
              >
                <Eye className="w-4 h-4 mr-2" />
                患者表示を確認する
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            {/* プラン価格設定 */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">プラン価格設定</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(planPrices).map(([plan, price]) => (
                  <div key={plan} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      {getPlanIcon(plan)}
                      <h3 className="ml-2 text-lg font-medium text-gray-900">{getPlanName(plan)}</h3>
                    </div>
                    {editingPlan === plan ? (
                      <div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-2">月額</span>
                          <input
                            type="number"
                            value={price}
                            onChange={(e) => handlePriceChange(plan, e.target.value)}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                            min="0"
                          />
                          <span className="ml-1 text-sm text-gray-600">円</span>
                        </div>
                        <button
                          onClick={handleSavePlan}
                          className="mt-3 btn-primary text-sm"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          保存
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-2xl font-bold text-gray-900">¥{price.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">月額</div>
                        <button
                          onClick={() => handleEditPlan(plan)}
                          className="mt-2 btn-secondary text-sm"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          編集
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* プラン別特典設定 */}
            <div className="space-y-6">
              {Object.entries(planBenefits).map(([plan, benefits]) => (
                <div key={plan} className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      {getPlanIcon(plan)}
                      <h3 className="ml-2 text-lg font-medium text-gray-900">{getPlanName(plan)}特典</h3>
                    </div>
                    <button
                      onClick={() => setNewBenefit({ name: '', count: 0, description: '' })}
                      className="btn-primary text-sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      特典追加
                    </button>
                  </div>

                  {/* 新規特典追加フォーム */}
                  {newBenefit.name === '' && (
                    <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">新しい特典を追加</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="特典名"
                          value={newBenefit.name}
                          onChange={(e) => setNewBenefit({ ...newBenefit, name: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                        <input
                          type="number"
                          placeholder="回数"
                          value={newBenefit.count}
                          onChange={(e) => setNewBenefit({ ...newBenefit, count: parseInt(e.target.value) || 0 })}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                          min="0"
                        />
                        <input
                          type="text"
                          placeholder="説明"
                          value={newBenefit.description}
                          onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <button
                          onClick={() => handleAddBenefit(plan)}
                          className="btn-primary text-sm"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          追加
                        </button>
                        <button
                          onClick={() => setNewBenefit({ name: '', count: 0, description: '' })}
                          className="btn-secondary text-sm"
                        >
                          <X className="w-4 h-4 mr-1" />
                          キャンセル
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 特典一覧 */}
                  <div className="space-y-3">
                    {benefits.map((benefit) => (
                      <div key={benefit.id} className="border border-gray-200 rounded-lg p-4">
                        {editingBenefit?.plan === plan && editingBenefit?.benefitId === benefit.id ? (
                          <div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <input
                                type="text"
                                value={benefit.name}
                                onChange={(e) => handleBenefitChange(plan, benefit.id, 'name', e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                              />
                              <input
                                type="number"
                                value={benefit.count}
                                onChange={(e) => handleBenefitChange(plan, benefit.id, 'count', parseInt(e.target.value) || 0)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                                min="0"
                              />
                              <input
                                type="text"
                                value={benefit.description}
                                onChange={(e) => handleBenefitChange(plan, benefit.id, 'description', e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                              />
                            </div>
                            <div className="mt-3 flex space-x-2">
                              <button
                                onClick={handleSaveBenefit}
                                className="btn-primary text-sm"
                              >
                                <Save className="w-4 h-4 mr-1" />
                                保存
                              </button>
                              <button
                                onClick={() => setEditingBenefit(null)}
                                className="btn-secondary text-sm"
                              >
                                <X className="w-4 h-4 mr-1" />
                                キャンセル
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center">
                                <span className="font-medium text-gray-900">{benefit.name}</span>
                                <span className="ml-2 text-sm text-gray-600">({benefit.count}回)</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditBenefit(plan, benefit.id)}
                                className="btn-secondary text-sm"
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                編集
                              </button>
                              <button
                                onClick={() => handleDeleteBenefit(plan, benefit.id)}
                                className="btn-secondary text-sm text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                削除
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminNav>
  );
};

export default BenefitSettings; 