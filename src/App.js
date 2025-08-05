import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 患者向けコンポーネント
import PatientAuth from './components/patient/PatientAuth';
import PatientHome from './components/patient/PatientHome';
import AIChat from './components/patient/AIChat';
import RichMenu from './components/patient/RichMenu';
import Plans from './components/patient/Plans';
import Settings from './components/patient/Settings';

// 歯科医院向けコンポーネント
import AdminDashboard from './components/admin/AdminDashboard';
import BenefitSettings from './components/admin/BenefitSettings';
import DynamicPricing from './components/admin/DynamicPricing';
import PopPrintSettings from './components/admin/PopPrintSettings';
import PlanManagement from './components/admin/PlanManagement';
import AdminSettings from './components/admin/Settings';

// トップページコンポーネント
const TopPage = () => {
  const patientUrls = [
    { path: '/patient/auth', name: '初回認証画面', description: '患者番号・パスコード入力' },
    { path: '/patient/home', name: 'ホーム画面', description: 'サブスク加入状況・特典一覧' },
    { path: '/patient/chat', name: 'AIチャット画面', description: 'AI歯科医との相談機能' },
    { path: '/patient/richmenu', name: 'LINEリッチメニュー', description: 'LINE公式アカウント風UI' },
    { path: '/patient/plans', name: 'メンバーシップ画面', description: 'プラン比較・加入申込' },
    { path: '/patient/settings', name: '設定画面', description: 'プラン情報・自動更新設定' },
  ];

  const adminUrls = [
    { path: '/admin', name: 'ダッシュボード', description: '加入者一覧・統計情報' },
    { path: '/admin/benefits', name: '特典設定', description: 'プラン別特典内容の設定' },
    { path: '/admin/pricing', name: 'ダイナミックプライシング', description: '時間帯別割引設定' },
    { path: '/admin/pop', name: 'ポップ印刷設定', description: '促進POP自動生成' },
    { path: '/admin/settings', name: '設定画面', description: '医院名・営業時間・店舗設定' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-700 mb-4">歯知式アプリ</h1>
          <p className="text-xl text-gray-600 mb-2">歯科医院向けサブスクリプションサービス</p>
          <p className="text-lg text-gray-500">モックアップURL一覧</p>
        </div>

        {/* ★ 追加: プラン比較・管理画面へのリンク ★ */}
        <div className="mb-10 flex flex-col md:flex-row justify-center items-center gap-4">
          <a href="/patient/plans" className="btn-primary text-center w-64">患者向けプラン比較画面を見る</a>
          <a href="/admin/plans" className="btn-secondary text-center w-64">歯科医院向けプラン管理画面を見る</a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 患者向け画面 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🦷</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">患者向け画面</h2>
                <p className="text-gray-600">LINE LIFF対応</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {patientUrls.map((url, index) => (
                <a
                  key={index}
                  href={url.path}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{url.name}</h3>
                      <p className="text-sm text-gray-600">{url.description}</p>
                    </div>
                    <div className="text-primary-600 font-mono text-sm bg-primary-100 px-2 py-1 rounded">
                      {url.path}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* 歯科医院向け管理画面 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🏥</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">歯科医院向け管理画面</h2>
                <p className="text-gray-600">Web管理画面</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {adminUrls.map((url, index) => (
                <a
                  key={index}
                  href={url.path}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{url.name}</h3>
                      <p className="text-sm text-gray-600">{url.description}</p>
                    </div>
                    <div className="text-green-600 font-mono text-sm bg-green-100 px-2 py-1 rounded">
                      {url.path}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 技術情報 */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">技術情報</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">フロントエンド</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• React 18</li>
                <li>• React Router DOM</li>
                <li>• Tailwind CSS</li>
                <li>• Lucide React</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">患者向け機能</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• LINE LIFF対応</li>
                <li>• 認証機能</li>
                <li>• AIチャット</li>
                <li>• 特典管理</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">管理機能</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• ダッシュボード</li>
                <li>• 特典設定</li>
                <li>• ダイナミックプライシング</li>
                <li>• 店舗切替</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">注意事項</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>このアプリケーションはモックアップです。実際のデータベース接続や決済機能は実装されていません。UIとユーザーエクスペリエンスの確認を目的としています。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        {/* トップページ */}
        <Route path="/" element={<TopPage />} />
        {/* 患者向けプラン比較画面 */}
        <Route path="/patient/plans" element={<Plans />} />
        {/* 歯科医院向けプラン管理画面 */}
        <Route path="/admin/plans" element={<PlanManagement />} />
        {/* 患者向けLIFF画面 */}
        <Route path="/patient/auth" element={<PatientAuth />} />
        <Route path="/patient/home" element={<PatientHome />} />
        <Route path="/patient/chat" element={<AIChat />} />
        <Route path="/patient/richmenu" element={<RichMenu />} />
        {/* 患者向け設定画面 */}
        <Route path="/patient/settings" element={<Settings />} />
        {/* 歯科医院向けWeb管理画面 */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/benefits" element={<BenefitSettings />} />
        <Route path="/admin/pricing" element={<DynamicPricing />} />
        <Route path="/admin/pop" element={<PopPrintSettings />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </div>
  );
}

export default App; 