import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Gift, 
  DollarSign, 
  Users, 
  Printer, 
  Settings,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

const AdminNav = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState('大野城店');

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'ダッシュボード' },
    { path: '/admin/benefits', icon: Gift, label: '特典設定' },
    { path: '/admin/pricing', icon: DollarSign, label: 'ダイナミックプライシング' },
    { path: '/admin/staff', icon: Users, label: 'スタッフ指名履歴' },
    { path: '/admin/pop', icon: Printer, label: 'ポップ印刷設定' },
    { path: '/admin/force-join', icon: Settings, label: '強制加入フラグ設定' },
  ];

  const stores = ['大野城店', '桜並木駅店'];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="admin-container flex">
      {/* サイドバー - デスクトップ */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:border-r lg:border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-primary-700">はち歯科医院</h1>
          </div>
          
          {/* 店舗切替 */}
          <div className="mt-6 px-4">
            <div className="relative">
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer"
              >
                {stores.map((store) => (
                  <option key={store} value={store}>{store}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <nav className="mt-8 flex-1 px-2 space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                    isActive(item.path)
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className={`mr-3 h-5 w-5 ${
                    isActive(item.path) ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* モバイルメニューオーバーレイ */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 flex z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-xl font-bold text-primary-700">はち歯科医院</h1>
              </div>
              <div className="mt-6 px-4">
                <div className="relative">
                  <select
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer"
                  >
                    {stores.map((store) => (
                      <option key={store} value={store}>{store}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <nav className="mt-8 px-2 space-y-1">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                        isActive(item.path)
                          ? 'bg-primary-100 text-primary-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <IconComponent className={`mr-3 h-5 w-5 ${
                        isActive(item.path) ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* トップバー */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow lg:border-none border-b border-gray-200">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <span className="text-lg font-medium text-gray-700">
                      歯知式管理画面 - {selectedStore}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ページコンテンツ */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminNav; 