import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Clock, CreditCard, CheckCircle, Eye } from 'lucide-react';

const Discount = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');

  // 割引価格表データ
  const discountServices = [
    {
      id: 1,
      name: '矯正',
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
    setSelectedService({ ...service, selectedDiscount: discountType });
    setShowPayment(true);
  };

  const handlePayment = () => {
    // 決済処理のシミュレーション
    setTimeout(() => {
      setPaymentCompleted(true);
      // 管理者画面に新着情報を送信（実際の実装ではAPI呼び出し）
      console.log('決済完了:', selectedService);
    }, 2000);
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

  if (paymentCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">お申込み完了</h2>
          <p className="text-gray-600 mb-6">
            お申込みおよび決済が完了しました。<br />
            ご来院お待ちしております。
          </p>
          <button
            onClick={() => navigate('/patient/richmenu')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            リッチメニューに戻る
          </button>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
        {/* ヘッダー */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowPayment(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">決済</h1>
            <div className="w-10"></div>
          </div>
        </div>

        {/* 選択されたサービス情報 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">{selectedService.name}</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">通常価格</span>
              <span className="text-gray-800 font-bold">¥{selectedService.basePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">選択された価格</span>
              <span className="text-green-600 font-bold text-lg">
                ¥{selectedService.selectedDiscount.price.toLocaleString()}
              </span>
            </div>
            <div className="text-sm text-green-600 text-center">
              {selectedService.selectedDiscount.percentage}%OFF ({selectedService.selectedDiscount.timeSlot})
            </div>
          </div>
        </div>

        {/* 決済方法選択 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">決済方法</h3>
          <div className="space-y-3">
            <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="credit"
                checked={paymentMethod === 'credit'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div className="ml-3">
                <div className="text-gray-800 font-medium">クレジットカード</div>
                <div className="text-gray-600 text-sm">VISA, MasterCard, JCB対応</div>
              </div>
            </label>
          </div>
        </div>

        {/* 決済ボタン */}
        <button
          onClick={handlePayment}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-colors shadow-lg"
        >
          決済を完了する
        </button>
      </div>
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
          <h1 className="text-xl font-bold text-gray-800 flex items-center">
            <DollarSign className="w-6 h-6 text-green-500 mr-2" />
            お得な割引
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* 割引価格表 */}
      <div className="space-y-4">
        {discountServices.map((service) => (
          <div key={service.id} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
              <span className="text-gray-600 text-sm">通常価格: ¥{service.basePrice.toLocaleString()}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              {service.weekdayDiscount.enabled && (
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium mb-1">平日({service.weekdayDiscount.timeSlot})割引</div>
                  {getDiscountBadge(service, 'weekdayDiscount', service.weekdayDiscount)}
                </div>
              )}
              {service.saturdayDiscount.enabled && (
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600 font-medium mb-1">土曜日({service.saturdayDiscount.timeSlot})割引</div>
                  {getDiscountBadge(service, 'saturdayDiscount', service.saturdayDiscount)}
                </div>
              )}
              {service.sundayDiscount.enabled && (
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600 font-medium mb-1">日曜日({service.sundayDiscount.timeSlot})割引</div>
                  {getDiscountBadge(service, 'sundayDiscount', service.sundayDiscount)}
                </div>
              )}
              {service.holidayDiscount.enabled && (
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-sm text-red-600 font-medium mb-1">祝日({service.holidayDiscount.timeSlot})割引</div>
                  {getDiscountBadge(service, 'holidayDiscount', service.holidayDiscount)}
                </div>
              )}
            </div>

            {/* 通常価格での申し込みボタン */}
            <div className="text-center p-3 bg-gray-50 rounded-lg mb-4">
              <div className="text-sm text-gray-600 font-medium mb-1">通常価格</div>
              <div className="text-center p-2">
                <span className="text-gray-800 font-bold text-lg">¥{service.basePrice.toLocaleString()}</span>
                <div className="text-xs text-gray-500">割引なし</div>
                <button
                  onClick={() => handleServiceSelect(service, { 
                    price: service.basePrice, 
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
