import React, { useState } from 'react';
import AdminNav from './AdminNav';
import { Plus, Edit, Save, X, Calendar, DollarSign } from 'lucide-react';

const BenefitSettings = () => {
  const [benefits, setBenefits] = useState([
    {
      id: 1,
      name: '指名無料',
      description: '好きなスタッフを指名できます',
      basicCount: 3,
      premiumCount: 5,
      price: 1000,
      validityPeriod: '12ヶ月',
      isEditing: false,
    },
    {
      id: 2,
      name: 'エアフロー',
      description: '歯面クリーニング',
      basicCount: 1,
      premiumCount: 3,
      price: 3000,
      validityPeriod: '12ヶ月',
      isEditing: false,
    },
    {
      id: 3,
      name: 'ホワイトニング',
      description: '歯の漂白・美白',
      basicCount: 0,
      premiumCount: 2,
      price: 8000,
      validityPeriod: '12ヶ月',
      isEditing: false,
    },
  ]);

  const [newBenefit, setNewBenefit] = useState({
    name: '',
    description: '',
    basicCount: 0,
    premiumCount: 0,
    price: 0,
    validityPeriod: '12ヶ月',
  });

  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleEditBenefit = (id) => {
    setBenefits(benefits.map(benefit => 
      benefit.id === id ? { ...benefit, isEditing: true } : benefit
    ));
  };

  const handleSaveBenefit = (id) => {
    setBenefits(benefits.map(benefit => 
      benefit.id === id ? { ...benefit, isEditing: false } : benefit
    ));
  };

  const handleCancelEdit = (id) => {
    setBenefits(benefits.map(benefit => 
      benefit.id === id ? { ...benefit, isEditing: false } : benefit
    ));
  };

  const handleBenefitChange = (id, field, value) => {
    setBenefits(benefits.map(benefit => 
      benefit.id === id ? { ...benefit, [field]: value } : benefit
    ));
  };

  const handleAddNewBenefit = () => {
    if (newBenefit.name && newBenefit.description) {
      const newId = Math.max(...benefits.map(b => b.id)) + 1;
      setBenefits([...benefits, { ...newBenefit, id: newId, isEditing: false }]);
      setNewBenefit({
        name: '',
        description: '',
        basicCount: 0,
        premiumCount: 0,
        price: 0,
        validityPeriod: '12ヶ月',
      });
      setIsAddingNew(false);
    }
  };

  const validityOptions = ['6ヶ月', '12ヶ月', '18ヶ月', '24ヶ月'];

  return (
    <AdminNav>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">特典設定</h1>
              <p className="mt-2 text-sm text-gray-700">
                サブスクリプションプランの特典内容と価格を管理します。
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                onClick={() => setIsAddingNew(true)}
                className="btn-primary"
                disabled={isAddingNew}
              >
                <Plus className="w-4 h-4 mr-2" />
                新しい特典を追加
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {/* 新規特典追加フォーム */}
            {isAddingNew && (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">新しい特典を追加</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      特典名
                    </label>
                    <input
                      type="text"
                      value={newBenefit.name}
                      onChange={(e) => setNewBenefit({ ...newBenefit, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="例: フッ素塗布"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      説明
                    </label>
                    <input
                      type="text"
                      value={newBenefit.description}
                      onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="特典の詳細説明"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ベーシック回数
                    </label>
                    <input
                      type="number"
                      value={newBenefit.basicCount}
                      onChange={(e) => setNewBenefit({ ...newBenefit, basicCount: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      プレミアム回数
                    </label>
                    <input
                      type="number"
                      value={newBenefit.premiumCount}
                      onChange={(e) => setNewBenefit({ ...newBenefit, premiumCount: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      通常価格（円）
                    </label>
                    <input
                      type="number"
                      value={newBenefit.price}
                      onChange={(e) => setNewBenefit({ ...newBenefit, price: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      有効期間
                    </label>
                    <select
                      value={newBenefit.validityPeriod}
                      onChange={(e) => setNewBenefit({ ...newBenefit, validityPeriod: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {validityOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsAddingNew(false)}
                    className="btn-secondary"
                  >
                    <X className="w-4 h-4 mr-2" />
                    キャンセル
                  </button>
                  <button
                    onClick={handleAddNewBenefit}
                    className="btn-primary"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    追加
                  </button>
                </div>
              </div>
            )}

            {/* 既存特典一覧 */}
            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="bg-white shadow rounded-lg p-6">
                  {benefit.isEditing ? (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            特典名
                          </label>
                          <input
                            type="text"
                            value={benefit.name}
                            onChange={(e) => handleBenefitChange(benefit.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            説明
                          </label>
                          <input
                            type="text"
                            value={benefit.description}
                            onChange={(e) => handleBenefitChange(benefit.id, 'description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ベーシック回数
                          </label>
                          <input
                            type="number"
                            value={benefit.basicCount}
                            onChange={(e) => handleBenefitChange(benefit.id, 'basicCount', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            プレミアム回数
                          </label>
                          <input
                            type="number"
                            value={benefit.premiumCount}
                            onChange={(e) => handleBenefitChange(benefit.id, 'premiumCount', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            通常価格（円）
                          </label>
                          <input
                            type="number"
                            value={benefit.price}
                            onChange={(e) => handleBenefitChange(benefit.id, 'price', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            有効期間
                          </label>
                          <select
                            value={benefit.validityPeriod}
                            onChange={(e) => handleBenefitChange(benefit.id, 'validityPeriod', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            {validityOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          onClick={() => handleCancelEdit(benefit.id)}
                          className="btn-secondary"
                        >
                          <X className="w-4 h-4 mr-2" />
                          キャンセル
                        </button>
                        <button
                          onClick={() => handleSaveBenefit(benefit.id)}
                          className="btn-primary"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          保存
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{benefit.name}</h3>
                          <p className="text-sm text-gray-600">{benefit.description}</p>
                        </div>
                        <button
                          onClick={() => handleEditBenefit(benefit.id)}
                          className="btn-secondary"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          編集
                        </button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">ベーシック</div>
                          <div className="text-lg font-semibold text-gray-900">{benefit.basicCount}回</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">プレミアム</div>
                          <div className="text-lg font-semibold text-gray-900">{benefit.premiumCount}回</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600 flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            通常価格
                          </div>
                          <div className="text-lg font-semibold text-gray-900">¥{benefit.price.toLocaleString()}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            有効期間
                          </div>
                          <div className="text-lg font-semibold text-gray-900">{benefit.validityPeriod}</div>
                        </div>
                      </div>
                    </div>
                  )}
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