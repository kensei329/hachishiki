import React, { useState } from 'react';
import AdminNav from './AdminNav';
import { Settings, Flag, Plus, Edit, Save, X, AlertTriangle } from 'lucide-react';

const ForceJoinSettings = () => {
  const [rules, setRules] = useState([
    {
      id: 1,
      treatmentName: 'インプラント',
      planType: '8クラブ シルバー',
      isActive: true,
      description: 'インプラント施術完了後に自動加入',
      createdDate: '2024/01/15'
    },
    {
      id: 2,
      treatmentName: 'ホワイトニング（10回以上）',
      planType: '8クラブ ベーシック',
      isActive: true,
      description: 'ホワイトニング10回実施後に自動加入',
      createdDate: '2024/02/01'
    },
    {
      id: 3,
      treatmentName: '矯正治療',
      planType: '8クラブ シルバー',
      isActive: false,
      description: '矯正治療開始時に自動加入（現在停止中）',
      createdDate: '2024/03/10'
    }
  ]);

  const [newRule, setNewRule] = useState({
    treatmentName: '',
    planType: '8クラブ ベーシック',
    description: '',
    isActive: true
  });

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const planOptions = ['8クラブ ライト', '8クラブ ベーシック', '8クラブ シルバー'];

  const handleAddRule = () => {
    if (newRule.treatmentName && newRule.description) {
      const newId = Math.max(...rules.map(r => r.id)) + 1;
      setRules([...rules, {
        ...newRule,
        id: newId,
        createdDate: new Date().toLocaleDateString('ja-JP')
      }]);
      setNewRule({
        treatmentName: '',
        planType: '8クラブ ベーシック',
        description: '',
        isActive: true
      });
      setIsAddingNew(false);
    }
  };

  const handleToggleActive = (id) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const handleDeleteRule = (id) => {
    if (window.confirm('このルールを削除してもよろしいですか？')) {
      setRules(rules.filter(rule => rule.id !== id));
    }
  };

  const handleEditRule = (id) => {
    setEditingId(id);
  };

  const handleSaveEdit = (id, updatedRule) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, ...updatedRule } : rule
    ));
    setEditingId(null);
  };

  const activeRulesCount = rules.filter(rule => rule.isActive).length;

  return (
    <AdminNav>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">強制加入フラグ設定</h1>
              <p className="mt-2 text-sm text-gray-700">
                特定の施術項目に対してサブスクリプション自動加入ルールを設定します。
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                onClick={() => setIsAddingNew(true)}
                className="btn-primary"
                disabled={isAddingNew}
              >
                <Plus className="w-4 h-4 mr-2" />
                新しいルールを追加
              </button>
            </div>
          </div>

          {/* 統計情報 */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Flag className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">総ルール数</dt>
                    <dd className="text-lg font-medium text-gray-900">{rules.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Settings className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">有効なルール</dt>
                    <dd className="text-lg font-medium text-gray-900">{activeRulesCount}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">停止中のルール</dt>
                    <dd className="text-lg font-medium text-gray-900">{rules.length - activeRulesCount}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* 新規ルール追加フォーム */}
          {isAddingNew && (
            <div className="mt-8 bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">新しいルールを追加</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    施術項目
                  </label>
                  <input
                    type="text"
                    value={newRule.treatmentName}
                    onChange={(e) => setNewRule({ ...newRule, treatmentName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="例: インプラント、矯正治療"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    自動加入プラン
                  </label>
                  <select
                    value={newRule.planType}
                    onChange={(e) => setNewRule({ ...newRule, planType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {planOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    説明
                  </label>
                  <textarea
                    value={newRule.description}
                    onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                    placeholder="このルールの詳細説明を入力してください"
                  />
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
                  onClick={handleAddRule}
                  className="btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  追加
                </button>
              </div>
            </div>
          )}

          {/* ルール一覧 */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">設定済みルール</h2>
            <div className="space-y-4">
              {rules.map((rule) => (
                <div key={rule.id} className="bg-white shadow rounded-lg p-6">
                  {editingId === rule.id ? (
                    <EditRuleForm 
                      rule={rule} 
                      planOptions={planOptions}
                      onSave={handleSaveEdit}
                      onCancel={() => setEditingId(null)}
                    />
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-medium text-gray-900 mr-4">
                            {rule.treatmentName}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            rule.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {rule.isActive ? '有効' : '停止'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{rule.description}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span>自動加入プラン: <strong>{rule.planType}</strong></span>
                          <span>作成日: {rule.createdDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 ml-4">
                        <button
                          onClick={() => handleToggleActive(rule.id)}
                          className={`px-3 py-1 text-sm font-medium rounded-md ${
                            rule.isActive 
                              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {rule.isActive ? '停止' : '有効化'}
                        </button>
                        <button
                          onClick={() => handleEditRule(rule.id)}
                          className="btn-secondary"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          編集
                        </button>
                        <button
                          onClick={() => handleDeleteRule(rule.id)}
                          className="text-red-600 hover:text-red-800 px-2 py-1"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 注意事項 */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">注意事項</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>強制加入フラグが設定された患者は、該当施術完了時に自動的にサブスクリプションに加入されます</li>
                    <li>既にサブスクリプションに加入している患者には適用されません</li>
                    <li>ルールの変更は即座に有効になりますのでご注意ください</li>
                    <li>料金の請求は通常のサブスクリプション規約に従います</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminNav>
  );
};

// 編集フォームコンポーネント
const EditRuleForm = ({ rule, planOptions, onSave, onCancel }) => {
  const [editData, setEditData] = useState({
    treatmentName: rule.treatmentName,
    planType: rule.planType,
    description: rule.description
  });

  const handleSave = () => {
    onSave(rule.id, editData);
  };

  return (
    <div>
      <h4 className="text-lg font-medium text-gray-900 mb-4">ルールを編集</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            施術項目
          </label>
          <input
            type="text"
            value={editData.treatmentName}
            onChange={(e) => setEditData({ ...editData, treatmentName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            自動加入プラン
          </label>
          <select
            value={editData.planType}
            onChange={(e) => setEditData({ ...editData, planType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {planOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            説明
          </label>
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={3}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <button onClick={onCancel} className="btn-secondary">
          <X className="w-4 h-4 mr-2" />
          キャンセル
        </button>
        <button onClick={handleSave} className="btn-primary">
          <Save className="w-4 h-4 mr-2" />
          保存
        </button>
      </div>
    </div>
  );
};

export default ForceJoinSettings; 