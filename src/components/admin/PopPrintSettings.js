import React, { useState } from 'react';
import AdminNav from './AdminNav';
import { Printer, Palette, Download, Eye, Save } from 'lucide-react';

const PopPrintSettings = () => {
  const [popSettings, setPopSettings] = useState({
    title: 'はち歯科医院の\n8クラブ始まります！',
    subtitle: '月額8,000円で特典いっぱい',
    features: [
      '指名無料 5回',
      'エアフロー 3回',
      'ホワイトニング 2回'
    ],
    backgroundColor: '#0ea5e9',
    textColor: '#ffffff',
    accentColor: '#f59e0b',
    clinicName: 'はち歯科医院',
    contactInfo: 'TEL: 092-123-4567'
  });

  const colorPresets = [
    { name: 'ブルー', bg: '#0ea5e9', text: '#ffffff', accent: '#f59e0b' },
    { name: 'グリーン', bg: '#10b981', text: '#ffffff', accent: '#f59e0b' },
    { name: 'パープル', bg: '#8b5cf6', text: '#ffffff', accent: '#f59e0b' },
    { name: 'レッド', bg: '#ef4444', text: '#ffffff', accent: '#fbbf24' },
    { name: 'オレンジ', bg: '#f97316', text: '#ffffff', accent: '#ffffff' },
  ];

  const handleSettingChange = (field, value) => {
    setPopSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...popSettings.features];
    newFeatures[index] = value;
    setPopSettings(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setPopSettings(prev => ({
      ...prev,
      features: [...prev.features, '新しい特典']
    }));
  };

  const removeFeature = (index) => {
    setPopSettings(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const applyColorPreset = (preset) => {
    setPopSettings(prev => ({
      ...prev,
      backgroundColor: preset.bg,
      textColor: preset.text,
      accentColor: preset.accent
    }));
  };

  return (
    <AdminNav>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">ポップ印刷設定</h1>
              <p className="mt-2 text-sm text-gray-700">
                加入促進POPのデザインと内容を設定します。
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-3">
              <button className="btn-secondary">
                <Eye className="w-4 h-4 mr-2" />
                プレビュー
              </button>
              <button className="btn-primary">
                <Download className="w-4 h-4 mr-2" />
                PDF出力
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 設定パネル */}
            <div className="space-y-6">
              {/* 基本設定 */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">基本設定</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      タイトル
                    </label>
                    <textarea
                      value={popSettings.title}
                      onChange={(e) => handleSettingChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      サブタイトル
                    </label>
                    <input
                      type="text"
                      value={popSettings.subtitle}
                      onChange={(e) => handleSettingChange('subtitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      医院名
                    </label>
                    <input
                      type="text"
                      value={popSettings.clinicName}
                      onChange={(e) => handleSettingChange('clinicName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      連絡先
                    </label>
                    <input
                      type="text"
                      value={popSettings.contactInfo}
                      onChange={(e) => handleSettingChange('contactInfo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* 特典設定 */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">特典一覧</h3>
                  <button onClick={addFeature} className="btn-secondary text-sm">
                    + 追加
                  </button>
                </div>
                <div className="space-y-3">
                  {popSettings.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <button
                        onClick={() => removeFeature(index)}
                        className="text-red-600 hover:text-red-800 px-2 py-1"
                      >
                        削除
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* カラー設定 */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  カラー設定
                </h3>
                
                {/* カラープリセット */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カラープリセット
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {colorPresets.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => applyColorPreset(preset)}
                        className="aspect-square rounded-lg border-2 border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 relative group"
                        style={{ backgroundColor: preset.bg }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ color: preset.text }}>
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 個別カラー設定 */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      背景色
                    </label>
                    <input
                      type="color"
                      value={popSettings.backgroundColor}
                      onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      文字色
                    </label>
                    <input
                      type="color"
                      value={popSettings.textColor}
                      onChange={(e) => handleSettingChange('textColor', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      アクセント色
                    </label>
                    <input
                      type="color"
                      value={popSettings.accentColor}
                      onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* プレビュー */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Printer className="w-5 h-5 mr-2" />
                プレビュー
              </h3>
              
              {/* A4サイズのプレビュー */}
              <div className="border border-gray-300 rounded-lg overflow-hidden" style={{ aspectRatio: '210/297' }}>
                <div 
                  className="w-full h-full p-8 flex flex-col justify-center items-center text-center relative"
                  style={{ 
                    backgroundColor: popSettings.backgroundColor,
                    color: popSettings.textColor 
                  }}
                >
                  {/* タイトル */}
                  <h1 className="text-3xl font-bold mb-4 whitespace-pre-line">
                    {popSettings.title}
                  </h1>
                  
                  {/* サブタイトル */}
                  <p className="text-xl mb-6" style={{ color: popSettings.accentColor }}>
                    {popSettings.subtitle}
                  </p>
                  
                  {/* 特典リスト */}
                  <div className="bg-white/10 rounded-lg p-4 mb-6 w-full max-w-md">
                    <h3 className="text-lg font-semibold mb-3" style={{ color: popSettings.accentColor }}>
                      ✨ 特典内容 ✨
                    </h3>
                    <ul className="space-y-2">
                      {popSettings.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: popSettings.accentColor }}></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* 医院情報 */}
                  <div className="mt-auto">
                    <h2 className="text-xl font-bold mb-2">{popSettings.clinicName}</h2>
                    <p className="text-sm" style={{ color: popSettings.accentColor }}>
                      {popSettings.contactInfo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminNav>
  );
};

export default PopPrintSettings; 