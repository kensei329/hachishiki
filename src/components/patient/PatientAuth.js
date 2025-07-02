import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PatientAuth = () => {
  const [patientId, setPatientId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    // モックアップのため、簡単な認証処理
    if (patientId && passcode) {
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
          <div>
            <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">
              患者番号
            </label>
            <input
              type="text"
              id="patientId"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="例: 12345"
              required
            />
          </div>
          
          <div>
            <label htmlFor="passcode" className="block text-sm font-medium text-gray-700 mb-1">
              パスコード
            </label>
            <input
              type="password"
              id="passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="医院から発行されたパスコード"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full btn-primary"
          >
            認証
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            パスコードを忘れた場合は、<br />
            歯科医院にお問い合わせください
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientAuth; 