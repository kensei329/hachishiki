import React, { useState } from 'react';
import AdminNav from './AdminNav';
import { Clock, DollarSign, Save, Calendar, ToggleLeft, ToggleRight, Plus, Edit, Trash2, X, Crown } from 'lucide-react';

const DynamicPricing = () => {
  const [pricingSettings, setPricingSettings] = useState({
    weekdayDiscount: {
      enabled: true,
      percentage: 20,
      startTime: '10:00',
      endTime: '15:00',
      validDays: ['月', '火', '水', '木', '金']
    },
    saturdayDiscount: {
      enabled: true,
      percentage: 15,
      startTime: '09:00',
      endTime: '17:00',
      validDays: ['土']
    },
    sundayDiscount: {
      enabled: true,
      percentage: 10,
      startTime: '09:00',
      endTime: '17:00',
      validDays: ['日']
    },
    holidayDiscount: {
      enabled: false,
      percentage: 10,
      startTime: '09:00',
      endTime: '17:00',
      validDays: ['祝日']
    }
  });

  // プラン別割引設定を追加
  const [planDiscounts, setPlanDiscounts] = useState({
    basic: {
      enabled: true,
      type: 'percentage', // 'percentage' または 'fixed'
      value: 5, // 5% または固定額
      description: 'ベーシック会員割引'
    },
    pro: {
      enabled: true,
      type: 'percentage',
      value: 10,
      description: 'Pro会員割引'
    },
    proMax: {
      enabled: true,
      type: 'percentage',
      value: 15,
      description: 'Pro Max会員割引'
    }
  });

  // 各サービスでのプラン割引の有効/無効状態を管理（一括設定の上書き用）
  const [servicePlanDiscounts, setServicePlanDiscounts] = useState({
    1: { // 矯正
      basic: true,
      pro: true,
      proMax: true
    },
    2: { // ホワイトニング
      basic: true,
      pro: true,
      proMax: true
    },
    3: { // セラミック
      basic: true,
      pro: true,
      proMax: true
    },
    4: { // インプラント
      basic: true,
      pro: true,
      proMax: true
    }
  });





  const [services, setServices] = useState([
    {
      id: 1,
      name: '矯正',
      basePrice: 800000,
      weekdayDiscountEnabled: true,
      saturdayDiscountEnabled: true,
      sundayDiscountEnabled: false,
      holidayDiscountEnabled: false,
    },
    {
      id: 2,
      name: 'ホワイトニング',
      basePrice: 15000,
      weekdayDiscountEnabled: true,
      saturdayDiscountEnabled: true,
      sundayDiscountEnabled: false,
      holidayDiscountEnabled: false,
    },
    {
      id: 3,
      name: 'セラミック',
      basePrice: 70000,
      weekdayDiscountEnabled: true,
      saturdayDiscountEnabled: true,
      sundayDiscountEnabled: false,
      holidayDiscountEnabled: false,
    },
    {
      id: 4,
      name: 'インプラント',
      basePrice: 350000,
      weekdayDiscountEnabled: false,
      saturdayDiscountEnabled: false,
      sundayDiscountEnabled: false,
      holidayDiscountEnabled: false,
    }
  ]);

  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    name: '',
    basePrice: 0,
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handlePricingToggle = (discountType) => {
    setPricingSettings(prev => ({
      ...prev,
      [discountType]: {
        ...prev[discountType],
        enabled: !prev[discountType].enabled
      }
    }));
  };

  const handlePricingChange = (discountType, field, value) => {
    setPricingSettings(prev => ({
      ...prev,
      [discountType]: {
        ...prev[discountType],
        [field]: value
      }
    }));
  };

  const handleServiceDiscountToggle = (serviceId, discountType) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, [`${discountType}DiscountEnabled`]: !service[`${discountType}DiscountEnabled`] }
        : service
    ));
  };

  const handleEditService = (serviceId) => {
    setEditingService(serviceId);
  };

  const handleSaveService = (serviceId) => {
    setEditingService(null);
  };

  const handleServiceChange = (serviceId, field, value) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, [field]: field === 'basePrice' ? parseInt(value) || 0 : value }
        : service
    ));
  };

  const handleDeleteService = (serviceId) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
  };

  const handleAddService = () => {
    if (newService.name && newService.basePrice > 0) {
      const newId = Math.max(...services.map(s => s.id)) + 1;
      setServices(prev => [...prev, {
        id: newId,
        name: newService.name,
        basePrice: newService.basePrice,
        weekdayDiscountEnabled: false,
        saturdayDiscountEnabled: false,
        sundayDiscountEnabled: false,
        holidayDiscountEnabled: false,
      }]);
      setNewService({ name: '', basePrice: 0 });
      setIsAddingNew(false);
    }
  };

  const calculateDiscountedPrice = (basePrice, discountPercentage) => {
    return basePrice * (1 - discountPercentage / 100);
  };

  // プラン別割引価格の計算
  const calculatePlanPrice = (basePrice, planType) => {
    if (!planDiscounts[planType].enabled) return basePrice;
    
    if (planDiscounts[planType].type === 'percentage') {
      return Math.max(0, basePrice * (1 - planDiscounts[planType].value / 100));
    } else {
      return Math.max(0, basePrice - planDiscounts[planType].value);
    }
  };

  // サービス別プラン割引価格の計算（個別設定と一括設定の両方を考慮）
  const calculateServicePlanPrice = (basePrice, serviceId, planType) => {
    const serviceDiscount = servicePlanDiscounts[serviceId]?.[planType];
    
    // 個別設定がある場合は個別設定を使用、ない場合は一括設定を使用
    if (serviceDiscount && serviceDiscount.enabled !== undefined) {
      if (!serviceDiscount.enabled) return basePrice;
      
      const discountType = serviceDiscount.type || planDiscounts[planType].type;
      const discountValue = serviceDiscount.value !== undefined ? serviceDiscount.value : planDiscounts[planType].value;
      
      if (discountType === 'percentage') {
        return Math.max(0, basePrice * (1 - discountValue / 100));
      } else {
        return Math.max(0, basePrice - discountValue);
      }
    } else {
      // 一括設定のみ使用
      if (!planDiscounts[planType].enabled) return basePrice;
      
      if (planDiscounts[planType].type === 'percentage') {
        return Math.max(0, basePrice * (1 - planDiscounts[planType].value / 100));
      } else {
        return Math.max(0, basePrice - planDiscounts[planType].value);
      }
    }
  };

  // 最安値の計算（時間帯割引とプラン割引の比較）
  const calculateBestPrice = (basePrice, timeDiscount, serviceId, planType) => {
    const timeDiscountPrice = timeDiscount.enabled && pricingSettings[timeDiscount.type].enabled
      ? calculateDiscountedPrice(basePrice, pricingSettings[timeDiscount.type].percentage)
      : basePrice;
    
    const planDiscountPrice = calculateServicePlanPrice(basePrice, serviceId, planType);
    
    return Math.min(timeDiscountPrice, planDiscountPrice);
  };

  // プラン別割引の処理
  const handlePlanDiscountChange = (planKey, field, value) => {
    setPlanDiscounts(prev => ({
      ...prev,
      [planKey]: {
        ...prev[planKey],
        [field]: field === 'value' ? parseInt(value) || 0 : value
      }
    }));
  };

  const handlePlanDiscountToggle = (planKey) => {
    setPlanDiscounts(prev => ({
      ...prev,
      [planKey]: {
        ...prev[planKey],
        enabled: !prev[planKey].enabled
      }
    }));
  };

  // 各サービスでのプラン割引の有効/無効を切り替える関数
  const handleServicePlanDiscountToggle = (serviceId, planKey) => {
    setServicePlanDiscounts(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [planKey]: {
          ...prev[serviceId][planKey],
          enabled: !prev[serviceId][planKey].enabled
        }
      }
    }));
  };

  const handleServicePlanDiscountChange = (serviceId, planKey, field, value) => {
    setServicePlanDiscounts(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [planKey]: {
          ...prev[serviceId][planKey],
          [field]: field === 'value' ? parseInt(value) || 0 : value
        }
      }
    }));
  };

  const handleApplyBatchSettings = (planKey) => {
    const newPlanDiscounts = { ...planDiscounts };
    newPlanDiscounts[planKey].enabled = true; // 一括設定を有効にする

    // サービス別のプラン割引状態を更新
    setServicePlanDiscounts(prev => {
      const newState = { ...prev };
      for (const serviceId in newState) {
        newState[serviceId] = {
          ...newState[serviceId],
          [planKey]: {
            ...newState[serviceId][planKey],
            enabled: true
          }
        };
      }
      return newState;
    });

    setPlanDiscounts(newPlanDiscounts);
  };

  const getDiscountTypeName = (type) => {
    switch (type) {
      case 'weekdayDiscount': return '平日割引';
      case 'saturdayDiscount': return '土曜日割引';
      case 'sundayDiscount': return '日曜日割引';
      case 'holidayDiscount': return '祝日割引';
      default: return type;
    }
  };

  const discountTypes = [
    { key: 'weekdayDiscount', name: '平日割引', color: 'text-blue-500' },
    { key: 'saturdayDiscount', name: '土曜日割引', color: 'text-green-500' },
    { key: 'sundayDiscount', name: '日曜日割引', color: 'text-purple-500' },
    { key: 'holidayDiscount', name: '祝日割引', color: 'text-red-500' },
  ];

  return (
    <AdminNav>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">ダイナミックプライシング</h1>
              <p className="mt-2 text-sm text-gray-700">
                時間帯や曜日に応じた価格割引設定を管理します。
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button className="btn-primary">
                <Save className="w-4 h-4 mr-2" />
                設定を保存
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            {/* 割引設定 */}
            {discountTypes.map(({ key, name, color }) => (
              <div key={key} className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <Clock className={`w-5 h-5 mr-2 ${color}`} />
                      {name}
                    </h3>
                    <p className="text-sm text-gray-600">{name}の割引設定</p>
                  </div>
                  <button
                    onClick={() => handlePricingToggle(key)}
                    className="flex items-center"
                  >
                    {pricingSettings[key].enabled ? (
                      <ToggleRight className="w-10 h-6 text-green-500" />
                    ) : (
                      <ToggleLeft className="w-10 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
                
                {pricingSettings[key].enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        割引率（%）
                      </label>
                      <input
                        type="number"
                        value={pricingSettings[key].percentage}
                        onChange={(e) => handlePricingChange(key, 'percentage', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        開始時間
                      </label>
                      <input
                        type="time"
                        value={pricingSettings[key].startTime}
                        onChange={(e) => handlePricingChange(key, 'startTime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        終了時間
                      </label>
                      <input
                        type="time"
                        value={pricingSettings[key].endTime}
                        onChange={(e) => handlePricingChange(key, 'endTime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* プラン別割引一括設定 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <Crown className="w-6 h-6 text-yellow-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">プラン別割引一括設定</h2>
              </div>
              <p className="text-gray-600 mb-6">
                時間帯割引と併用する場合、より大きな割引が適用されます (併用ではありません)。<br />
                この設定は全サービスに一括で適用され、個別のサービス設定を上書きします。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* ベーシック会員割引 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">ベーシック会員</h4>
                    <button
                      onClick={() => handlePlanDiscountToggle('basic')}
                      className="flex items-center"
                    >
                      {planDiscounts.basic.enabled ? (
                        <ToggleRight className="w-8 h-5 text-green-500" />
                      ) : (
                        <ToggleLeft className="w-8 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  {planDiscounts.basic.enabled && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          割引タイプ
                        </label>
                        <select
                          value={planDiscounts.basic.type}
                          onChange={(e) => handlePlanDiscountChange('basic', 'type', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="percentage">割引率（%）</option>
                          <option value="fixed">割引額（円）</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {planDiscounts.basic.type === 'percentage' ? '割引率（%）' : '割引額（円）'}
                        </label>
                        <input
                          type="number"
                          value={planDiscounts.basic.value}
                          onChange={(e) => handlePlanDiscountChange('basic', 'value', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          min="0"
                          max={planDiscounts.basic.type === 'percentage' ? "100" : undefined}
                        />
                      </div>
                      <button
                        onClick={() => handleApplyBatchSettings('basic')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
                      >
                        一括設定する
                      </button>
                    </div>
                  )}
                </div>

                {/* Pro会員割引 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Pro会員</h4>
                    <button
                      onClick={() => handlePlanDiscountToggle('pro')}
                      className="flex items-center"
                    >
                      {planDiscounts.pro.enabled ? (
                        <ToggleRight className="w-8 h-5 text-green-500" />
                      ) : (
                        <ToggleLeft className="w-8 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  {planDiscounts.pro.enabled && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          割引タイプ
                        </label>
                        <select
                          value={planDiscounts.pro.type}
                          onChange={(e) => handlePlanDiscountChange('pro', 'type', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="percentage">割引率（%）</option>
                          <option value="fixed">割引額（円）</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {planDiscounts.pro.type === 'percentage' ? '割引率（%）' : '割引額（円）'}
                        </label>
                        <input
                          type="number"
                          value={planDiscounts.pro.value}
                          onChange={(e) => handlePlanDiscountChange('pro', 'value', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          min="0"
                          max={planDiscounts.pro.type === 'percentage' ? "100" : undefined}
                        />
                      </div>
                      <button
                        onClick={() => handleApplyBatchSettings('pro')}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
                      >
                        一括設定する
                      </button>
                    </div>
                  )}
                </div>

                {/* Pro Max会員割引 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Pro Max会員</h4>
                    <button
                      onClick={() => handlePlanDiscountToggle('proMax')}
                      className="flex items-center"
                    >
                      {planDiscounts.proMax.enabled ? (
                        <ToggleRight className="w-8 h-5 text-green-500" />
                      ) : (
                        <ToggleLeft className="w-8 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  {planDiscounts.proMax.enabled && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          割引タイプ
                        </label>
                        <select
                          value={planDiscounts.proMax.type}
                          onChange={(e) => handlePlanDiscountChange('proMax', 'type', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="percentage">割引率（%）</option>
                          <option value="fixed">割引額（円）</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {planDiscounts.proMax.type === 'percentage' ? '割引率（%）' : '割引額（円）'}
                        </label>
                        <input
                          type="number"
                          value={planDiscounts.proMax.value}
                          onChange={(e) => handlePlanDiscountChange('proMax', 'value', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          min="0"
                          max={planDiscounts.proMax.type === 'percentage' ? "100" : undefined}
                        />
                      </div>
                      <button
                        onClick={() => handleApplyBatchSettings('proMax')}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
                      >
                        一括設定する
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 診療メニュー別割引適用設定 */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                  診療メニュー別割引適用設定
                </h3>
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="btn-primary text-sm"
                  disabled={isAddingNew}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  メニュー追加
                </button>
              </div>

              {/* 新規メニュー追加フォーム */}
              {isAddingNew && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">新しい診療メニューを追加</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="診療メニュー名"
                      value={newService.name}
                      onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <input
                      type="number"
                      placeholder="通常価格（円）"
                      value={newService.basePrice}
                      onChange={(e) => setNewService({ ...newService, basePrice: parseInt(e.target.value) || 0 })}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                      min="0"
                    />
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={handleAddService}
                      className="btn-primary text-sm"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      追加
                    </button>
                    <button
                      onClick={() => {
                        setIsAddingNew(false);
                        setNewService({ name: '', basePrice: 0 });
                      }}
                      className="btn-secondary text-sm"
                    >
                      <X className="w-4 h-4 mr-1" />
                      キャンセル
                    </button>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        診療メニュー
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        プラン
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        通常価格
                      </th>
                      {discountTypes.map(({ key }) => (
                        <th key={key} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {getDiscountTypeName(key)}
                        </th>
                      ))}
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {services.map((service) => (
                      <React.Fragment key={service.id}>
                        {/* フリープラン行 */}
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap" rowSpan={4}>
                            <div className="flex items-center justify-center h-full">
                              <div className="text-sm font-medium text-gray-900">{service.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">フリープラン</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">¥{service.basePrice.toLocaleString()}</div>
                          </td>
                          {discountTypes.map(({ key }) => (
                            <td key={key} className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="flex flex-col items-center space-y-1">
                                <button
                                  onClick={() => handleServiceDiscountToggle(service.id, key.replace('Discount', ''))}
                                  className="flex items-center"
                                >
                                  {service[`${key.replace('Discount', '')}DiscountEnabled`] ? (
                                    <ToggleRight className="w-8 h-5 text-green-500" />
                                  ) : (
                                    <ToggleLeft className="w-8 h-5 text-gray-400" />
                                  )}
                                </button>
                                {service[`${key.replace('Discount', '')}DiscountEnabled`] && pricingSettings[key].enabled ? (
                                  <div className="text-xs text-green-600">
                                    ¥{calculateDiscountedPrice(service.basePrice, pricingSettings[key].percentage).toLocaleString()}
                                  </div>
                                ) : (
                                  <div className="text-xs text-gray-500">
                                    ¥{service.basePrice.toLocaleString()}
                                  </div>
                                )}
                              </div>
                            </td>
                          ))}
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex space-x-2">
                              {editingService === service.id ? (
                                <>
                                  <button
                                    onClick={() => handleSaveService(service.id)}
                                    className="btn-primary text-xs"
                                  >
                                    <Save className="w-3 h-3 mr-1" />
                                    保存
                                  </button>
                                  <button
                                    onClick={() => setEditingService(null)}
                                    className="btn-secondary text-xs"
                                  >
                                    <X className="w-3 h-3 mr-1" />
                                    キャンセル
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleEditService(service.id)}
                                    className="btn-secondary text-xs"
                                  >
                                    <Edit className="w-3 h-3 mr-1" />
                                    編集
                                  </button>
                                  <button
                                    onClick={() => handleDeleteService(service.id)}
                                    className="btn-secondary text-xs text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="w-3 h-3 mr-1" />
                                    削除
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>

                        {/* Basic Plan Row */}
                        {planDiscounts.basic.enabled && (
                          <tr className="hover:bg-blue-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">ベーシック</span>
                                <button onClick={() => handleServicePlanDiscountToggle(service.id, 'basic')} className="flex items-center ml-2">
                                  {servicePlanDiscounts[service.id]?.basic ? (<ToggleRight className="w-6 h-4 text-green-500" />) : (<ToggleLeft className="w-6 h-4 text-gray-400" />)}
                                </button>
                              </div>
                              {/* サービス別プラン割引設定 */}
                              {servicePlanDiscounts[service.id]?.basic && (
                                <div className="mt-2 text-xs">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <select
                                      value={servicePlanDiscounts[service.id].basic.type || planDiscounts.basic.type}
                                      onChange={(e) => handleServicePlanDiscountChange(service.id, 'basic', 'type', e.target.value)}
                                      className="text-xs border border-gray-300 rounded px-1 py-0.5"
                                    >
                                      <option value="percentage">割引率(%)</option>
                                      <option value="fixed">割引額(円)</option>
                                    </select>
                                    <input
                                      type="number"
                                      value={servicePlanDiscounts[service.id].basic.value || planDiscounts.basic.value}
                                      onChange={(e) => handleServicePlanDiscountChange(service.id, 'basic', 'value', parseInt(e.target.value))}
                                      className="w-16 text-xs border border-gray-300 rounded px-1 py-0.5"
                                      min="0"
                                    />
                                    <span className="text-gray-500">
                                      {(servicePlanDiscounts[service.id].basic.type || planDiscounts.basic.type) === 'percentage' ? '%' : '円'}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-blue-600">
                                {servicePlanDiscounts[service.id]?.basic ? (
                                  `¥${calculateServicePlanPrice(service.basePrice, service.id, 'basic').toLocaleString()}`
                                ) : (
                                  `¥${service.basePrice.toLocaleString()}`
                                )}
                              </div>
                            </td>
                            {discountTypes.map(({ key }) => (
                              <td key={key} className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-xs">
                                  {service[`${key.replace('Discount', '')}DiscountEnabled`] && pricingSettings[key].enabled ? (
                                    <span className="text-green-600">
                                      ¥{Math.min(
                                        calculateDiscountedPrice(service.basePrice, pricingSettings[key].percentage),
                                        servicePlanDiscounts[service.id]?.basic ? calculateServicePlanPrice(service.basePrice, service.id, 'basic') : service.basePrice
                                      ).toLocaleString()}
                                    </span>
                                  ) : (
                                    <span className="text-blue-600">
                                      ¥{(servicePlanDiscounts[service.id]?.basic ? calculateServicePlanPrice(service.basePrice, service.id, 'basic') : service.basePrice).toLocaleString()}
                                    </span>
                                  )}
                                </div>
                              </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-center"><div className="text-xs text-gray-400">-</div></td>
                          </tr>
                        )}

                        {/* Pro Plan Row */}
                        {planDiscounts.pro.enabled && (
                          <tr className="hover:bg-orange-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Pro</span>
                                <button onClick={() => handleServicePlanDiscountToggle(service.id, 'pro')} className="flex items-center ml-2">
                                  {servicePlanDiscounts[service.id]?.pro ? (<ToggleRight className="w-6 h-4 text-green-500" />) : (<ToggleLeft className="w-6 h-4 text-gray-400" />)}
                                </button>
                              </div>
                              {/* サービス別プラン割引設定 */}
                              {servicePlanDiscounts[service.id]?.pro && (
                                <div className="mt-2 text-xs">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <select
                                      value={servicePlanDiscounts[service.id].pro.type || planDiscounts.pro.type}
                                      onChange={(e) => handleServicePlanDiscountChange(service.id, 'pro', 'type', e.target.value)}
                                      className="text-xs border border-gray-300 rounded px-1 py-0.5"
                                    >
                                      <option value="percentage">割引率(%)</option>
                                      <option value="fixed">割引額(円)</option>
                                    </select>
                                    <input
                                      type="number"
                                      value={servicePlanDiscounts[service.id].pro.value || planDiscounts.pro.value}
                                      onChange={(e) => handleServicePlanDiscountChange(service.id, 'pro', 'value', parseInt(e.target.value))}
                                      className="w-16 text-xs border border-gray-300 rounded px-1 py-0.5"
                                      min="0"
                                    />
                                    <span className="text-gray-500">
                                      {(servicePlanDiscounts[service.id].pro.type || planDiscounts.pro.type) === 'percentage' ? '%' : '円'}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-orange-600">
                                {servicePlanDiscounts[service.id]?.pro ? (
                                  `¥${calculateServicePlanPrice(service.basePrice, service.id, 'pro').toLocaleString()}`
                                ) : (
                                  `¥${service.basePrice.toLocaleString()}`
                                )}
                              </div>
                            </td>
                            {discountTypes.map(({ key }) => (
                              <td key={key} className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-xs">
                                  {service[`${key.replace('Discount', '')}DiscountEnabled`] && pricingSettings[key].enabled ? (
                                    <span className="text-green-600">
                                      ¥{Math.min(
                                        calculateDiscountedPrice(service.basePrice, pricingSettings[key].percentage),
                                        servicePlanDiscounts[service.id]?.pro ? calculateServicePlanPrice(service.basePrice, service.id, 'pro') : service.basePrice
                                      ).toLocaleString()}
                                    </span>
                                  ) : (
                                    <span className="text-orange-600">
                                      ¥{(servicePlanDiscounts[service.id]?.pro ? calculateServicePlanPrice(service.basePrice, service.id, 'pro') : service.basePrice).toLocaleString()}
                                    </span>
                                  )}
                                </div>
                              </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-center"><div className="text-xs text-gray-400">-</div></td>
                          </tr>
                        )}

                        {/* Pro Max Plan Row */}
                        {planDiscounts.proMax.enabled && (
                          <tr className="hover:bg-purple-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">Pro Max</span>
                                <button onClick={() => handleServicePlanDiscountToggle(service.id, 'proMax')} className="flex items-center ml-2">
                                  {servicePlanDiscounts[service.id]?.proMax ? (<ToggleRight className="w-6 h-4 text-green-500" />) : (<ToggleLeft className="w-6 h-4 text-gray-400" />)}
                                </button>
                              </div>
                              {/* サービス別プラン割引設定 */}
                              {servicePlanDiscounts[service.id]?.proMax && (
                                <div className="mt-2 text-xs">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <select
                                      value={servicePlanDiscounts[service.id].proMax.type || planDiscounts.proMax.type}
                                      onChange={(e) => handleServicePlanDiscountChange(service.id, 'proMax', 'type', e.target.value)}
                                      className="text-xs border border-gray-300 rounded px-1 py-0.5"
                                    >
                                      <option value="percentage">割引率(%)</option>
                                      <option value="fixed">割引額(円)</option>
                                    </select>
                                    <input
                                      type="number"
                                      value={servicePlanDiscounts[service.id].proMax.value || planDiscounts.proMax.value}
                                      onChange={(e) => handleServicePlanDiscountChange(service.id, 'proMax', 'value', parseInt(e.target.value))}
                                      className="w-16 text-xs border border-gray-300 rounded px-1 py-0.5"
                                      min="0"
                                    />
                                    <span className="text-gray-500">
                                      {(servicePlanDiscounts[service.id].proMax.type || planDiscounts.proMax.type) === 'percentage' ? '%' : '円'}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-purple-600">
                                {servicePlanDiscounts[service.id]?.proMax ? (
                                  `¥${calculateServicePlanPrice(service.basePrice, service.id, 'proMax').toLocaleString()}`
                                ) : (
                                  `¥${service.basePrice.toLocaleString()}`
                                )}
                              </div>
                            </td>
                            {discountTypes.map(({ key }) => (
                              <td key={key} className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-xs">
                                  {service[`${key.replace('Discount', '')}DiscountEnabled`] && pricingSettings[key].enabled ? (
                                    <span className="text-green-600">
                                      ¥{Math.min(
                                        calculateDiscountedPrice(service.basePrice, pricingSettings[key].percentage),
                                        servicePlanDiscounts[service.id]?.proMax ? calculateServicePlanPrice(service.basePrice, service.id, 'proMax') : service.basePrice
                                      ).toLocaleString()}
                                    </span>
                                  ) : (
                                    <span className="text-purple-600">
                                      ¥{(servicePlanDiscounts[service.id]?.proMax ? calculateServicePlanPrice(service.basePrice, service.id, 'proMax') : service.basePrice).toLocaleString()}
                                    </span>
                                  )}
                                </div>
                              </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-center"><div className="text-xs text-gray-400">-</div></td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminNav>
  );
};

export default DynamicPricing; 