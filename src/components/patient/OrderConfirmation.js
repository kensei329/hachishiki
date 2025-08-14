import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, CreditCard, FileText, Shield, CreditCard as CreditCardIcon } from 'lucide-react';

const OrderConfirmation = ({ selectedItem, onBack, onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('confirmation'); // confirmation, terms, payment, complete
  const [termsScrolledToBottom, setTermsScrolledToBottom] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { id: 'confirmation', name: '商品確認', icon: CheckCircle },
    { id: 'terms', name: '利用規約', icon: FileText },
    { id: 'payment', name: '決済情報', icon: CreditCard },
    { id: 'complete', name: '完了', icon: CheckCircle }
  ];

  const handleTermsScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // スクロールが最下部に達したかチェック（少し余裕を持たせる）
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setTermsScrolledToBottom(true);
    }
  };

  const handleTermsAgree = () => {
    setCurrentStep('payment');
  };

  // 契約終了日の計算（購入日から1年後）
  const getContractEndDate = () => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setFullYear(today.getFullYear() + 1);
    
    return `${endDate.getFullYear()}年${endDate.getMonth() + 1}月${endDate.getDate()}日`;
  };

  // 契約更新日の計算
  const getContractRenewalDate = () => {
    const today = new Date();
    return `${today.getDate()}日`;
  };

  const handlePaymentChange = (field, value) => {
    setPaymentInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    // 決済処理のシミュレーション
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('complete');
      // LINEメッセージ送信のシミュレーション
      if (onComplete) {
        onComplete(selectedItem);
      }
    }, 2000);
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 'confirmation':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">商品確認</h2>
              <p className="text-gray-600">以下の商品をご購入いただきます</p>
            </div>

            {/* 商品詳細 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🦷</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{selectedItem.name}</h3>
                  <p className="text-gray-600">{selectedItem.description}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-700">価格</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ¥{selectedItem.price.toLocaleString()}
                    {selectedItem.oneTimePurchase ? '' : (selectedItem.isYearly ? '/年' : '/月')}
                  </span>
                </div>
                {selectedItem.originalPrice && (
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">通常価格</span>
                    <span className="text-sm text-gray-500 line-through">
                      ¥{selectedItem.originalPrice.toLocaleString()}
                      {selectedItem.oneTimePurchase ? '' : (selectedItem.isYearly ? '/年' : '/月')}
                    </span>
                  </div>
                )}
              </div>

              {/* 注意事項 */}
              {!selectedItem.oneTimePurchase && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-3">注意事項</h4>
                  {selectedItem.isYearly ? (
                    <div className="text-sm text-yellow-700 space-y-2">
                      <p>本契約は、購入日から1年間（{getContractEndDate()}まで）有効です。</p>
                      <p>利用料金は、毎年{getContractRenewalDate()}に{selectedItem.price.toLocaleString()}円（税込）が自動的に決済されます。</p>
                      <p>翌年度の自動更新設定は、設定画面よりいつでも変更できます。</p>
                    </div>
                  ) : (
                    <div className="text-sm text-yellow-700 space-y-2">
                      <p>本契約は、購入日から1年間（{getContractEndDate()}まで）有効です。</p>
                      <p>利用料金は、毎月{getContractRenewalDate()}に{selectedItem.price.toLocaleString()}円（税込）が自動的に決済されます。</p>
                      <p>翌年度の自動更新設定は、設定画面よりいつでも変更できます。</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={onBack}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                戻る
              </button>
              <button
                onClick={() => setCurrentStep('terms')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                次へ進む
              </button>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">利用規約</h2>
              <p className="text-gray-600">利用規約をお読みください</p>
            </div>

            {/* 利用規約 */}
            <div 
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 max-h-96 overflow-y-auto"
              onScroll={handleTermsScroll}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">歯知クラブ 利用規約</h3>
              
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">第1条（適用）</h4>
                  <p>本規約は、歯知クラブ（以下「本サービス」）の利用に関する条件を定めるものです。</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">第2条（利用登録）</h4>
                  <p>本サービスの利用を希望する者は、本規約に同意の上、当社の定める方法によって利用登録を申請するものとします。</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">第3条（利用料金）</h4>
                  <p>本サービスの利用料金は、当社が定める料金体系に従い、利用者が負担するものとします。</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">第4条（禁止事項）</h4>
                  <p>利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
                  <ul className="list-disc list-inside mt-2 ml-4">
                    <li>法令または公序良俗に違反する行為</li>
                    <li>犯罪行為に関連する行為</li>
                    <li>当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">第5条（本サービスの提供の停止等）</h4>
                  <p>当社は、以下のいずれかの事由があると判断した場合、利用者に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">第6条（利用制限および登録抹消）</h4>
                  <p>当社は、利用者が以下のいずれかに該当する場合には、事前の通知なく、利用者に対して、本サービスの全部もしくは一部の利用を制限し、または利用者としての登録を抹消することができるものとします。</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">第7条（退会）</h4>
                  <p>利用者は、当社の定める退会手続により、本サービスから退会できるものとします。</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">第8条（保証の否認及び免責）</h4>
                  <p>当社は、本サービスに起因して利用者に生じたあらゆる損害について、当社の故意または重過失による場合を除き、一切の責任を負いません。</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">第9条（サービス内容の変更等）</h4>
                  <p>当社は、利用者に通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによって利用者に生じた損害について一切の責任を負いません。</p>
                </div>
                
                                 <div>
                   <h4 className="font-semibold mb-2">第10条（利用規約の変更）</h4>
                   <p>当社は、必要と判断した場合には、利用者に通知することなくいつでも本規約を変更することができるものとします。</p>
                 </div>
                 
                 {/* スクロール完了インジケーター */}
                 <div className="text-center mt-6 pt-4 border-t border-gray-200">
                   {termsScrolledToBottom ? (
                     <div className="text-green-600 text-sm font-medium">
                       ✓ 利用規約を最後まで読みました
                     </div>
                   ) : (
                     <div className="text-gray-500 text-sm">
                       利用規約を最後までスクロールしてください
                     </div>
                   )}
                 </div>
               </div>
             </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentStep('confirmation')}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                戻る
              </button>
              <button
                onClick={handleTermsAgree}
                disabled={!termsScrolledToBottom}
                className={`flex-1 font-medium py-3 px-6 rounded-lg transition-colors ${
                  termsScrolledToBottom
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                利用規約に同意する
              </button>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">決済情報入力</h2>
              <p className="text-gray-600">クレジットカード情報を入力してください</p>
            </div>

            {/* 決済情報フォーム */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カード番号
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength="19"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      有効期限
                    </label>
                    <input
                      type="text"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={paymentInfo.cvv}
                      onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength="4"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カード名義人
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.cardholderName}
                    onChange={(e) => handlePaymentChange('cardholderName', e.target.value)}
                    placeholder="TARO YAMADA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentStep('terms')}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                戻る
              </button>
              <button
                onClick={handlePaymentSubmit}
                disabled={isProcessing || !paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv || !paymentInfo.cardholderName}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    処理中...
                  </div>
                ) : (
                  '決済する'
                )}
              </button>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">購入完了</h2>
              <p className="text-gray-600">お支払いが完了しました</p>
            </div>

            {/* 購入完了商品 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">購入商品</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🦷</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900">{selectedItem.name}</h4>
                  <p className="text-gray-600">{selectedItem.description}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-700">支払金額</span>
                  <span className="text-2xl font-bold text-green-600">
                    ¥{selectedItem.price.toLocaleString()}
                    {selectedItem.oneTimePurchase ? '' : (selectedItem.isYearly ? '/年' : '/月')}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/patient/richmenu')}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
              >
                LINEに戻る
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4">
      {/* ヘッダー */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">購入手続き</h1>
            <div className="w-10"></div>
          </div>

          {/* ステップインジケーター */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
              const IconComponent = step.icon;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive 
                      ? 'border-blue-600 bg-blue-600 text-white' 
                      : isCompleted 
                        ? 'border-green-600 bg-green-600 text-white'
                        : 'border-gray-300 bg-gray-100 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* ステップコンテンツ */}
          {getStepContent()}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
