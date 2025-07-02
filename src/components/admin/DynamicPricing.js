import React, { useState } from 'react';
import AdminNav from './AdminNav';
import { Clock, DollarSign, Save, Calendar, ToggleLeft, ToggleRight } from 'lucide-react';

const DynamicPricing = () => {
  const [pricingSettings, setPricingSettings] = useState({
    weekdayDiscount: {
      enabled: true,
      percentage: 20,
      startTime: '10:00',
      endTime: '15:00',
      validDays: ['月', '火', '水', '木', '金']
    },
    eveningDiscount: {
      enabled: false,
      percentage: 15,
      startTime: '18:00',
      endTime: '20:00',
      validDays: ['月', '火', '水', '木', '金']
    },
    weekendDiscount: {
      enabled: true,
      percentage: 10,
      startTime: '09:00',
      endTime: '17:00',
      validDays: ['土', '日']
    }
  });

  const [services, setServices] = useState([
    {
      id: 1,
      name: '一般歯科診療',
      basePrice: 3000,
      weekdayDiscountEnabled: true,
      eveningDiscountEnabled: false,
      weekendDiscountEnabled: true,
    },
    {
      id: 2,
      name: 'ホワイトニング',
      basePrice: 15000,
      weekdayDiscountEnabled: true,
      eveningDiscountEnabled: true,
      weekendDiscountEnabled: false,
    },
    {
      id: 3,
      name: 'インプラント',
      basePrice: 350000,
      weekdayDiscountEnabled: false,
      eveningDiscountEnabled: false,
      weekendDiscountEnabled: false,
    },
    {
      id: 4,
      name: 'エアフロー',
      basePrice: 8000,
      weekdayDiscountEnabled: true,
      eveningDiscountEnabled: true,
      weekendDiscountEnabled: true,
    }
  ]);

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

  const calculateDiscountedPrice = (basePrice, discountPercentage) => {
    return basePrice * (1 - discountPercentage / 100);
  };

  const dayOptions = ['月', '火', '水', '木', '金', '土', '日'];

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
            {/* 平日昼間割引設定 */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                    平日昼間割引
                  </h3>
                  <p className="text-sm text-gray-600">平日の昼間時間帯の割引設定</p>
                </div>
                <button
                  onClick={() => handlePricingToggle('weekdayDiscount')}
                  className="flex items-center"
                >
                  {pricingSettings.weekdayDiscount.enabled ? (
                    <ToggleRight className="w-10 h-6 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-10 h-6 text-gray-400" />
                  )}
                </button>
              </div>
              
              {pricingSettings.weekdayDiscount.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      割引率（%）
                    </label>
                    <input
                      type="number"
                      value={pricingSettings.weekdayDiscount.percentage}
                      onChange={(e) => handlePricingChange('weekdayDiscount', 'percentage', parseInt(e.target.value) || 0)}
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
                      value={pricingSettings.weekdayDiscount.startTime}
                      onChange={(e) => handlePricingChange('weekdayDiscount', 'startTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      終了時間
                    </label>
                    <input
                      type="time"
                      value={pricingSettings.weekdayDiscount.endTime}
                      onChange={(e) => handlePricingChange('weekdayDiscount', 'endTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 夕方割引設定 */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-orange-500" />
                    夕方割引
                  </h3>
                  <p className="text-sm text-gray-600">平日夕方時間帯の割引設定</p>
                </div>
                <button
                  onClick={() => handlePricingToggle('eveningDiscount')}
                  className="flex items-center"
                >
                  {pricingSettings.eveningDiscount.enabled ? (
                    <ToggleRight className="w-10 h-6 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-10 h-6 text-gray-400" />
                  )}
                </button>
              </div>
              
              {pricingSettings.eveningDiscount.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      割引率（%）
                    </label>
                    <input
                      type="number"
                      value={pricingSettings.eveningDiscount.percentage}
                      onChange={(e) => handlePricingChange('eveningDiscount', 'percentage', parseInt(e.target.value) || 0)}
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
                      value={pricingSettings.eveningDiscount.startTime}
                      onChange={(e) => handlePricingChange('eveningDiscount', 'startTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      終了時間
                    </label>
                    <input
                      type="time"
                      value={pricingSettings.eveningDiscount.endTime}
                      onChange={(e) => handlePricingChange('eveningDiscount', 'endTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 週末割引設定 */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                    週末割引
                  </h3>
                  <p className="text-sm text-gray-600">土日の割引設定</p>
                </div>
                <button
                  onClick={() => handlePricingToggle('weekendDiscount')}
                  className="flex items-center"
                >
                  {pricingSettings.weekendDiscount.enabled ? (
                    <ToggleRight className="w-10 h-6 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-10 h-6 text-gray-400" />
                  )}
                </button>
              </div>
              
              {pricingSettings.weekendDiscount.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      割引率（%）
                    </label>
                    <input
                      type="number"
                      value={pricingSettings.weekendDiscount.percentage}
                      onChange={(e) => handlePricingChange('weekendDiscount', 'percentage', parseInt(e.target.value) || 0)}
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
                      value={pricingSettings.weekendDiscount.startTime}
                      onChange={(e) => handlePricingChange('weekendDiscount', 'startTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      終了時間
                    </label>
                    <input
                      type="time"
                      value={pricingSettings.weekendDiscount.endTime}
                      onChange={(e) => handlePricingChange('weekendDiscount', 'endTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 診療メニュー別割引適用設定 */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                診療メニュー別割引適用設定
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        診療メニュー
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        通常価格
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        平日昼間割引
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        夕方割引
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        週末割引
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {services.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{service.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">¥{service.basePrice.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex flex-col items-center space-y-1">
                            <button
                              onClick={() => handleServiceDiscountToggle(service.id, 'weekday')}
                              className="flex items-center"
                            >
                              {service.weekdayDiscountEnabled ? (
                                <ToggleRight className="w-8 h-5 text-green-500" />
                              ) : (
                                <ToggleLeft className="w-8 h-5 text-gray-400" />
                              )}
                            </button>
                            {service.weekdayDiscountEnabled && pricingSettings.weekdayDiscount.enabled && (
                              <div className="text-xs text-green-600">
                                ¥{calculateDiscountedPrice(service.basePrice, pricingSettings.weekdayDiscount.percentage).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex flex-col items-center space-y-1">
                            <button
                              onClick={() => handleServiceDiscountToggle(service.id, 'evening')}
                              className="flex items-center"
                            >
                              {service.eveningDiscountEnabled ? (
                                <ToggleRight className="w-8 h-5 text-green-500" />
                              ) : (
                                <ToggleLeft className="w-8 h-5 text-gray-400" />
                              )}
                            </button>
                            {service.eveningDiscountEnabled && pricingSettings.eveningDiscount.enabled && (
                              <div className="text-xs text-green-600">
                                ¥{calculateDiscountedPrice(service.basePrice, pricingSettings.eveningDiscount.percentage).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex flex-col items-center space-y-1">
                            <button
                              onClick={() => handleServiceDiscountToggle(service.id, 'weekend')}
                              className="flex items-center"
                            >
                              {service.weekendDiscountEnabled ? (
                                <ToggleRight className="w-8 h-5 text-green-500" />
                              ) : (
                                <ToggleLeft className="w-8 h-5 text-gray-400" />
                              )}
                            </button>
                            {service.weekendDiscountEnabled && pricingSettings.weekendDiscount.enabled && (
                              <div className="text-xs text-green-600">
                                ¥{calculateDiscountedPrice(service.basePrice, pricingSettings.weekendDiscount.percentage).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
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