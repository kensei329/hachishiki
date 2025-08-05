import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, User, Calendar, Users, Building } from 'lucide-react';

const PatientAuth = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    birthDate: '',
    gender: '',
    clinicCode: ''
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
        formData.clinicCode) {
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
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">認証成功</h2>
          <p className="text-gray-600 mb-4">
            LINEアカウントと連携しました。<br />
            ホーム画面に移動します...
          </p>
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