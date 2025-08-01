import React, { useState } from 'react';
import AdminNav from './AdminNav';
import { 
  Building, 
  Clock, 
  MapPin, 
  ToggleLeft, 
  ToggleRight,
  Plus,
  X,
  Save
} from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    clinicName: 'はち歯科医院',
    branches: [
      {
        id: 1,
        name: '大野城店',
        enabled: true,
        address: '福岡県大野城市○○○',
        phone: '092-XXX-XXXX',
        businessHours: {
          monday: { open: '09:00', close: '18:00', closed: false },
          tuesday: { open: '09:00', close: '18:00', closed: false },
          wednesday: { open: '09:00', close: '18:00', closed: false },
          thursday: { open: '09:00', close: '18:00', closed: false },
          friday: { open: '09:00', close: '18:00', closed: false },
          saturday: { open: '09:00', close: '17:00', closed: false },
          sunday: { open: '09:00', close: '17:00', closed: false },
          holiday: { open: '09:00', close: '17:00', closed: true },
        },
        lunchBreak: {
          enabled: true,
          start: '12:00',
          end: '13:00'
        }
      },
      {
        id: 2,
        name: '桜並木駅店',
        enabled: true,
        address: '福岡県○○市○○○',
        phone: '092-XXX-XXXX',
        businessHours: {
          monday: { open: '09:00', close: '18:00', closed: false },
          tuesday: { open: '09:00', close: '18:00', closed: false },
          wednesday: { open: '09:00', close: '18:00', closed: false },
          thursday: { open: '09:00', close: '18:00', closed: false },
          friday: { open: '09:00', close: '18:00', closed: false },
          saturday: { open: '09:00', close: '17:00', closed: false },
          sunday: { open: '09:00', close: '17:00', closed: false },
          holiday: { open: '09:00', close: '17:00', closed: true },
        },
        lunchBreak: {
          enabled: true,
          start: '12:00',
          end: '13:00'
        }
      }
    ]
  });

  const [editingBranch, setEditingBranch] = useState(null);
  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    phone: '',
    enabled: true,
    businessHours: {
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '09:00', close: '18:00', closed: false },
      saturday: { open: '09:00', close: '17:00', closed: false },
      sunday: { open: '09:00', close: '17:00', closed: false },
      holiday: { open: '09:00', close: '17:00', closed: true },
    },
    lunchBreak: {
      enabled: true,
      start: '12:00',
      end: '13:00'
    }
  });
  const [isAddingBranch, setIsAddingBranch] = useState(false);

  const days = [
    { key: 'monday', label: '月' },
    { key: 'tuesday', label: '火' },
    { key: 'wednesday', label: '水' },
    { key: 'thursday', label: '木' },
    { key: 'friday', label: '金' },
    { key: 'saturday', label: '土' },
    { key: 'sunday', label: '日' },
    { key: 'holiday', label: '祝' },
  ];

  const handleClinicNameChange = (value) => {
    setSettings({ ...settings, clinicName: value });
  };

  const handleBranchToggle = (branchId) => {
    setSettings({
      ...settings,
      branches: settings.branches.map(branch =>
        branch.id === branchId ? { ...branch, enabled: !branch.enabled } : branch
      )
    });
  };

  const handleBranchEdit = (branchId) => {
    const branch = settings.branches.find(b => b.id === branchId);
    setEditingBranch({ ...branch });
  };

  const handleBranchSave = () => {
    setSettings({
      ...settings,
      branches: settings.branches.map(branch =>
        branch.id === editingBranch.id ? editingBranch : branch
      )
    });
    setEditingBranch(null);
  };

  const handleBranchChange = (field, value) => {
    setEditingBranch({ ...editingBranch, [field]: value });
  };

  const handleBusinessHoursChange = (dayKey, field, value) => {
    setEditingBranch({
      ...editingBranch,
      businessHours: {
        ...editingBranch.businessHours,
        [dayKey]: {
          ...editingBranch.businessHours[dayKey],
          [field]: field === 'closed' ? value : value
        }
      }
    });
  };

  const handleLunchBreakChange = (field, value) => {
    setEditingBranch({
      ...editingBranch,
      lunchBreak: {
        ...editingBranch.lunchBreak,
        [field]: field === 'enabled' ? value : value
      }
    });
  };

  const handleAddBranch = () => {
    if (newBranch.name && newBranch.address && newBranch.phone) {
      const newId = Math.max(...settings.branches.map(b => b.id)) + 1;
      setSettings({
        ...settings,
        branches: [...settings.branches, { ...newBranch, id: newId }]
      });
      setNewBranch({
        name: '',
        address: '',
        phone: '',
        enabled: true,
        businessHours: {
          monday: { open: '09:00', close: '18:00', closed: false },
          tuesday: { open: '09:00', close: '18:00', closed: false },
          wednesday: { open: '09:00', close: '18:00', closed: false },
          thursday: { open: '09:00', close: '18:00', closed: false },
          friday: { open: '09:00', close: '18:00', closed: false },
          saturday: { open: '09:00', close: '17:00', closed: false },
          sunday: { open: '09:00', close: '17:00', closed: false },
          holiday: { open: '09:00', close: '17:00', closed: true },
        },
        lunchBreak: {
          enabled: true,
          start: '12:00',
          end: '13:00'
        }
      });
      setIsAddingBranch(false);
    }
  };

  const handleDeleteBranch = (branchId) => {
    setSettings({
      ...settings,
      branches: settings.branches.filter(branch => branch.id !== branchId)
    });
  };

  return (
    <AdminNav>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">設定</h1>
              <p className="mt-2 text-sm text-gray-700">
                歯科医院の基本情報と営業時間を管理します。
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
            {/* 歯科医院名設定 */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <Building className="w-5 h-5 mr-2 text-blue-500" />
                歯科医院名
              </h2>
              <div className="max-w-md">
                <input
                  type="text"
                  value={settings.clinicName}
                  onChange={(e) => handleClinicNameChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="歯科医院名を入力"
                />
              </div>
            </div>

            {/* 分院設定 */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-500" />
                  分院設定
                </h2>
                <button
                  onClick={() => setIsAddingBranch(true)}
                  className="btn-primary text-sm"
                  disabled={isAddingBranch}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  分院追加
                </button>
              </div>

              {/* 新規分院追加フォーム */}
              {isAddingBranch && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">新しい分院を追加</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="分院名"
                      value={newBranch.name}
                      onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <input
                      type="text"
                      placeholder="住所"
                      value={newBranch.address}
                      onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <input
                      type="text"
                      placeholder="電話番号"
                      value={newBranch.phone}
                      onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={handleAddBranch}
                      className="btn-primary text-sm"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      追加
                    </button>
                    <button
                      onClick={() => setIsAddingBranch(false)}
                      className="btn-secondary text-sm"
                    >
                      <X className="w-4 h-4 mr-1" />
                      キャンセル
                    </button>
                  </div>
                </div>
              )}

              {/* 分院一覧 */}
              <div className="space-y-4">
                {settings.branches.map((branch) => (
                  <div key={branch.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleBranchToggle(branch.id)}
                          className="flex items-center"
                        >
                          {branch.enabled ? (
                            <ToggleRight className="w-10 h-6 text-green-500" />
                          ) : (
                            <ToggleLeft className="w-10 h-6 text-gray-400" />
                          )}
                        </button>
                        <h3 className="ml-3 text-lg font-medium text-gray-900">{branch.name}</h3>
                      </div>
                      <div className="flex space-x-2">
                        {editingBranch?.id === branch.id ? (
                          <>
                            <button
                              onClick={handleBranchSave}
                              className="btn-primary text-sm"
                            >
                              <Save className="w-4 h-4 mr-1" />
                              保存
                            </button>
                            <button
                              onClick={() => setEditingBranch(null)}
                              className="btn-secondary text-sm"
                            >
                              <X className="w-4 h-4 mr-1" />
                              キャンセル
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleBranchEdit(branch.id)}
                              className="btn-secondary text-sm"
                            >
                              編集
                            </button>
                            <button
                              onClick={() => handleDeleteBranch(branch.id)}
                              className="btn-secondary text-sm text-red-600 hover:text-red-700"
                            >
                              削除
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {editingBranch?.id === branch.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            value={editingBranch.name}
                            onChange={(e) => handleBranchChange('name', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                            placeholder="分院名"
                          />
                          <input
                            type="text"
                            value={editingBranch.address}
                            onChange={(e) => handleBranchChange('address', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                            placeholder="住所"
                          />
                          <input
                            type="text"
                            value={editingBranch.phone}
                            onChange={(e) => handleBranchChange('phone', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                            placeholder="電話番号"
                          />
                        </div>

                        {/* 営業時間設定 */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            営業時間
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {days.map(({ key, label }) => (
                              <div key={key} className="border border-gray-200 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-700">{label}</span>
                                  <button
                                    onClick={() => handleBusinessHoursChange(key, 'closed', !editingBranch.businessHours[key].closed)}
                                    className="flex items-center"
                                  >
                                    {editingBranch.businessHours[key].closed ? (
                                      <ToggleLeft className="w-8 h-5 text-gray-400" />
                                    ) : (
                                      <ToggleRight className="w-8 h-5 text-green-500" />
                                    )}
                                  </button>
                                </div>
                                {!editingBranch.businessHours[key].closed && (
                                  <div className="space-y-2">
                                    <input
                                      type="time"
                                      value={editingBranch.businessHours[key].open}
                                      onChange={(e) => handleBusinessHoursChange(key, 'open', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                    />
                                    <input
                                      type="time"
                                      value={editingBranch.businessHours[key].close}
                                      onChange={(e) => handleBusinessHoursChange(key, 'close', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                    />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* お昼休み設定 */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-3">お昼休み</h4>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleLunchBreakChange('enabled', !editingBranch.lunchBreak.enabled)}
                              className="flex items-center"
                            >
                              {editingBranch.lunchBreak.enabled ? (
                                <ToggleRight className="w-8 h-5 text-green-500" />
                              ) : (
                                <ToggleLeft className="w-8 h-5 text-gray-400" />
                              )}
                            </button>
                            {editingBranch.lunchBreak.enabled && (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="time"
                                  value={editingBranch.lunchBreak.start}
                                  onChange={(e) => handleLunchBreakChange('start', e.target.value)}
                                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                                <span className="text-sm text-gray-600">〜</span>
                                <input
                                  type="time"
                                  value={editingBranch.lunchBreak.end}
                                  onChange={(e) => handleLunchBreakChange('end', e.target.value)}
                                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">住所:</span> {branch.address}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">電話:</span> {branch.phone}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">営業時間:</span> 月〜金 9:00-18:00、土日 9:00-17:00
                        </div>
                        {branch.lunchBreak.enabled && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">お昼休み:</span> {branch.lunchBreak.start}〜{branch.lunchBreak.end}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminNav>
  );
};

export default Settings; 