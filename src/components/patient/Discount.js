import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Clock, CreditCard, CheckCircle, Eye, Image } from 'lucide-react';
import { useImages } from '../../contexts/ImageContext';
import OrderConfirmation from './OrderConfirmation';

const Discount = () => {
  const navigate = useNavigate();
  const { getCurrentImage } = useImages();
  const [selectedService, setSelectedService] = useState(null);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  // ユーザーのプラン情報（実際の実装ではAPIから取得）
  const userPlan = {
    name: 'ベーシック',
    type: 'basic',
    discountPercentage: 5
  };

  // プラン別割引設定（実際の実装ではAPIから取得）
  const planDiscounts = {
    basic: {
      enabled: true,
      type: 'percentage',
      value: 5,
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
  };

  // プラン別の最安値を計算する関数
  const calculatePlanPrice = (basePrice, planType) => {
    const plan = planDiscounts[planType];
    if (!plan || !plan.enabled) {
      return basePrice;
    }
    
    if (plan.type === 'percentage') {
      return basePrice * (1 - plan.value / 100);
    } else {
      return Math.max(0, basePrice - plan.value);
    }
  };

  // 時間帯割引とプラン割引の最安値を計算する関数
  const calculateBestPrice = (basePrice, timeDiscount, planType) => {
    const planPrice = calculatePlanPrice(basePrice, planType);
    const timePrice = timeDiscount.enabled ? timeDiscount.price : basePrice;
    
    // より安い価格（より大きな割引）を返す
    return Math.min(planPrice, timePrice);
  };

  // 割引価格表データ
  const discountServices = [
    {
      id: 1,
      name: '矯正',
      serviceKey: 'orthodontics',
      basePrice: 800000,
      weekdayDiscount: {
        enabled: true,
        percentage: 20,
        price: 640000,
        timeSlot: '10:00-15:00'
      },
      saturdayDiscount: {
        enabled: true,
        percentage: 15,
        price: 680000,
        timeSlot: '09:00-17:00'
      },
      sundayDiscount: {
        enabled: false,
        percentage: 0,
        price: 800000,
        timeSlot: '割引なし'
      },
      holidayDiscount: {
        enabled: false,
        percentage: 0,
        price: 800000,
        timeSlot: '割引なし'
      }
    },
    {
      id: 2,
      name: 'ホワイトニング',
      serviceKey: 'whitening',
      basePrice: 15000,
      weekdayDiscount: {
        enabled: true,
        percentage: 20,
        price: 12000,
        timeSlot: '10:00-15:00'
      },
      saturdayDiscount: {
        enabled: true,
        percentage: 15,
        price: 12750,
        timeSlot: '09:00-17:00'
      },
      sundayDiscount: {
        enabled: false,
        percentage: 0,
        price: 15000,
        timeSlot: '割引なし'
      },
      holidayDiscount: {
        enabled: false,
        percentage: 0,
        price: 15000,
        timeSlot: '割引なし'
      }
    },
    {
      id: 3,
      name: 'セラミック',
      serviceKey: 'ceramic',
      basePrice: 70000,
      weekdayDiscount: {
        enabled: true,
        percentage: 20,
        price: 56000,
        timeSlot: '10:00-15:00'
      },
      saturdayDiscount: {
        enabled: true,
        percentage: 15,
        price: 59500,
        timeSlot: '09:00-17:00'
      },
      sundayDiscount: {
        enabled: false,
        percentage: 0,
        price: 70000,
        timeSlot: '割引なし'
      },
      holidayDiscount: {
        enabled: false,
        percentage: 0,
        price: 70000,
        timeSlot: '割引なし'
      }
    },
    {
      id: 4,
      name: 'インプラント',
      serviceKey: 'implant',
      basePrice: 350000,
      weekdayDiscount: {
        enabled: false,
        percentage: 0,
        price: 350000,
        timeSlot: '割引なし'
      },
      saturdayDiscount: {
        enabled: false,
        percentage: 0,
        price: 350000,
        timeSlot: '割引なし'
      },
      sundayDiscount: {
        enabled: false,
        percentage: 0,
        price: 350000,
        timeSlot: '割引なし'
      },
      holidayDiscount: {
        enabled: false,
        percentage: 0,
        price: 350000,
        timeSlot: '割引なし'
      }
    }
  ];

  const handleServiceSelect = (service, discountType) => {
    const discount = service[discountType];
    setSelectedService({
      name: service.name,
      description: `${discount.timeSlot}割引適用`,
      price: discount.price,
      originalPrice: service.basePrice,
      discountType: discountType,
      discountPercentage: discount.percentage,
      serviceId: service.id
    });
    setShowOrderConfirmation(true);
  };



  const getDiscountBadge = (service, discountType, discount) => {
    if (!discount.enabled) {
      return null; // 割引がない場合は何も表示しない
    }
    return (
      <div className="text-center p-3">
        <span className="text-green-600 font-bold text-lg">¥{discount.price.toLocaleString()}</span>
        <div className="text-xs text-green-600">{discount.percentage}%OFF</div>
        <button
          onClick={() => handleServiceSelect(service, discountType)}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
        >
          <CreditCard className="w-3 h-3 mr-1" />
          この価格で申し込む
        </button>
      </div>
    );
  };

  // 購入完了時の処理
  const handleOrderComplete = (completedService) => {
    // LINEメッセージ送信のシミュレーション
    console.log('購入完了:', completedService);
    // 実際の実装では、LINE Messaging APIを使用してメッセージを送信
  };

  if (showOrderConfirmation) {
    return (
      <OrderConfirmation
        selectedItem={selectedService}
        onBack={() => setShowOrderConfirmation(false)}
        onComplete={handleOrderComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      {/* ヘッダー */}
      <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/patient/richmenu')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500 mr-2" />
              お得な割引
            </h1>
            <div className="mt-2">
              <span className="text-sm text-gray-600">あなたのプラン: </span>
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                {userPlan.name} {userPlan.discountPercentage}%OFF
              </span>
            </div>
            <div className="mt-3">
              <button
                onClick={() => navigate('/patient/plans')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition-all transform hover:scale-105 shadow-md"
              >
                プランをアップグレードしてお得に割引を得る
              </button>
            </div>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* 割引価格表 */}
      <div className="space-y-4">
        {discountServices.map((service) => (
          <div key={service.id} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                {/* サービス画像 */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    {getCurrentImage(service.serviceKey) ? (
                      <img
                        src={getCurrentImage(service.serviceKey)}
                        alt={service.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Image className="w-8 h-8" />
                    </div>
                  </div>
                </div>
                
                {/* サービス情報 */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{service.name}</h3>
                  <div className="text-sm text-gray-600">
                    通常価格: ¥{service.basePrice.toLocaleString()}
                  </div>
                  <div className="text-blue-600 text-sm font-medium">
                    {userPlan.name}価格: ¥{calculatePlanPrice(service.basePrice, userPlan.type).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              {service.weekdayDiscount.enabled && (
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium mb-1">平日({service.weekdayDiscount.timeSlot})割引</div>
                  <div className="text-center p-2">
                    <span className="text-green-600 font-bold text-lg">
                      ¥{calculateBestPrice(service.basePrice, service.weekdayDiscount, userPlan.type).toLocaleString()}
                    </span>
                    <div className="text-xs text-green-600">{service.weekdayDiscount.percentage}%OFF</div>
                    <button
                      onClick={() => handleServiceSelect(service, 'weekdayDiscount', service.weekdayDiscount)}
                      className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <CreditCard className="w-3 h-3 mr-1" />
                      この価格で申し込む
                    </button>
                  </div>
                </div>
              )}
              {service.saturdayDiscount.enabled && (
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600 font-medium mb-1">土曜日({service.saturdayDiscount.timeSlot})割引</div>
                  <div className="text-center p-2">
                    <span className="text-green-600 font-bold text-lg">
                      ¥{calculateBestPrice(service.basePrice, service.saturdayDiscount, userPlan.type).toLocaleString()}
                    </span>
                    <div className="text-xs text-green-600">{service.saturdayDiscount.percentage}%OFF</div>
                    <button
                      onClick={() => handleServiceSelect(service, 'saturdayDiscount', service.saturdayDiscount)}
                      className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <CreditCard className="w-3 h-3 mr-1" />
                      この価格で申し込む
                    </button>
                  </div>
                </div>
              )}
              {service.sundayDiscount.enabled && (
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600 font-medium mb-1">日曜日({service.sundayDiscount.timeSlot})割引</div>
                  <div className="text-center p-2">
                    <span className="text-green-600 font-bold text-lg">
                      ¥{calculateBestPrice(service.basePrice, service.sundayDiscount, userPlan.type).toLocaleString()}
                    </span>
                    <div className="text-xs text-green-600">{service.sundayDiscount.percentage}%OFF</div>
                    <button
                      onClick={() => handleServiceSelect(service, 'sundayDiscount', service.sundayDiscount)}
                      className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <CreditCard className="w-3 h-3 mr-1" />
                      この価格で申し込む
                    </button>
                  </div>
                </div>
              )}
              {service.holidayDiscount.enabled && (
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-sm text-red-600 font-medium mb-1">祝日({service.holidayDiscount.timeSlot})割引</div>
                  <div className="text-center p-2">
                    <span className="text-green-600 font-bold text-lg">
                      ¥{calculateBestPrice(service.basePrice, service.holidayDiscount, userPlan.type).toLocaleString()}
                    </span>
                    <div className="text-xs text-green-600">{service.holidayDiscount.percentage}%OFF</div>
                    <button
                      onClick={() => handleServiceSelect(service, 'holidayDiscount', service.holidayDiscount)}
                      className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <CreditCard className="w-3 h-3 mr-1" />
                      この価格で申し込む
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 通常価格での申し込みボタン */}
            <div className="text-center p-3 bg-gray-50 rounded-lg mb-4">
              <div className="text-sm text-gray-600 font-medium mb-1">通常価格</div>
              <div className="text-center p-2">
                <span className="text-blue-600 font-bold text-lg">
                  ベーシック価格: ¥{calculatePlanPrice(service.basePrice, userPlan.type).toLocaleString()}
                </span>
                <div className="text-xs text-blue-600 mt-1">
                  {userPlan.discountPercentage}%OFF
                </div>
                <button
                  onClick={() => handleServiceSelect(service, { 
                    price: calculateBestPrice(service.basePrice, { enabled: false }, userPlan.type), 
                    percentage: 0, 
                    timeSlot: '通常価格' 
                  })}
                  className="mt-2 w-full bg-gray-600 hover:bg-gray-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  <CreditCard className="w-3 h-3 mr-1" />
                  この価格で申し込む
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discount;
