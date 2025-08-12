import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, User, Calendar, Users, Building } from 'lucide-react';

const PatientAuth = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    birthDate: '',
    gender: '',
    clinicCode: '',
    patientCode: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleAuth = (e) => {
    e.preventDefault();
    // モックアップのため、簡単な認証処理
    if (formData.patientName && formData.birthDate && formData.gender && 
        formData.clinicCode && formData.patientCode) {
      setIsAuthenticated(true);
      // 2秒後にホーム画面に遷移
      setTimeout(() => {
        navigate('/patient/plans');
      }, 2000);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="liff-container flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">認証成功！</h2>
          <p className="text-gray-600 mb-4">
            LINEアカウントと連携しました。<br />
            歯知クラブの特典をご利用いただけます。
          </p>
          
          {/* プラン選択への誘導 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-bold text-blue-800 mb-2">🎉 歯知クラブへようこそ！</h3>
            <p className="text-sm text-blue-700 mb-3">
              あなたに最適なプランを選んで、<br />
              口腔健康をサポートしましょう
            </p>
            <div className="text-xs text-blue-600 space-y-1">
              <div>✨ AI歯科医相談で24時間サポート</div>
              <div>✨ 各種検査で口腔内の状態を把握</div>
              <div>✨ 治療費の割引でお得にケア</div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-3">
              プラン選択画面に移動します...
            </p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
          
          {/* 手動で移動するボタン */}
          <button
            onClick={() => navigate('/patient/plans')}
            className="mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            今すぐプランを確認する
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="liff-container flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary-700 mb-2">歯知式</h1>
          <p className="text-gray-600">患者認証</p>
        </div>
        
        <form onSubmit={handleAuth} className="space-y-4">
          {/* 患者氏名 */}
          <div>
            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <User className="w-4 h-4 mr-1" />
              患者氏名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="patientName"
              value={formData.patientName}
              onChange={(e) => handleInputChange('patientName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="例: 田中 花子"
              required
            />
          </div>

          {/* 生年月日 */}
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              生年月日 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="birthDate"
              value={formData.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          {/* 性別 */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              性別 <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">選択してください</option>
              <option value="male">男性</option>
              <option value="female">女性</option>
              <option value="other">その他</option>
            </select>
          </div>

          {/* 歯科医院コード */}
          <div>
            <label htmlFor="clinicCode" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Building className="w-4 h-4 mr-1" />
              歯科医院コード <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="clinicCode"
              value={formData.clinicCode}
              onChange={(e) => handleInputChange('clinicCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="例: HACHI001"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              歯科医院のポップなどに記載されているコードを入力してください
            </p>
          </div>

          {/* 患者コード */}
          <div>
            <label htmlFor="patientCode" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <User className="w-4 h-4 mr-1" />
              患者コード <span className="text-gray-500">（任意）</span>
            </label>
            <input
              type="text"
              id="patientCode"
              value={formData.patientCode}
              onChange={(e) => handleInputChange('patientCode', e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="例: ABC12345"
              maxLength="8"
              pattern="[A-Za-z0-9]*"
            />
            <p className="text-xs text-gray-500 mt-1">
              半角英数で最大8文字（任意入力）
            </p>
          </div>


          
          <button
            type="submit"
            className="w-full btn-primary"
          >
            認証
          </button>
        </form>
        

      </div>
    </div>
  );
};

export default PatientAuth; 