import React, { useState } from 'react';
import AdminNav from './AdminNav';
import { User, Calendar, Award, Filter, Download } from 'lucide-react';

const StaffNomination = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('今月');
  const [selectedStaff, setSelectedStaff] = useState('全スタッフ');

  const staff = [
    { id: 1, name: '田中 太郎', role: '歯科医師', image: null },
    { id: 2, name: '佐藤 花子', role: '歯科衛生士', image: null },
    { id: 3, name: '山田 次郎', role: '歯科医師', image: null },
    { id: 4, name: '鈴木 美咲', role: '歯科衛生士', image: null },
    { id: 5, name: '高橋 健一', role: '歯科医師', image: null },
  ];

  const nominationData = [
    {
      id: 1,
      staffId: 1,
      staffName: '田中 太郎',
      patientName: '山田 花子',
      date: '2024/10/15',
      time: '14:30',
      service: '一般歯科',
      status: '完了'
    },
    {
      id: 2,
      staffId: 2,
      staffName: '佐藤 花子',
      patientName: '鈴木 太郎',
      date: '2024/10/15',
      time: '15:00',
      service: 'エアフロー',
      status: '完了'
    },
    {
      id: 3,
      staffId: 1,
      staffName: '田中 太郎',
      patientName: '高橋 美咲',
      date: '2024/10/14',
      time: '10:30',
      service: 'ホワイトニング',
      status: '完了'
    },
    {
      id: 4,
      staffId: 3,
      staffName: '山田 次郎',
      patientName: '田中 恵子',
      date: '2024/10/14',
      time: '16:00',
      service: '一般歯科',
      status: 'キャンセル'
    },
    {
      id: 5,
      staffId: 2,
      staffName: '佐藤 花子',
      patientName: '佐藤 一郎',
      date: '2024/10/13',
      time: '11:00',
      service: 'エアフロー',
      status: '完了'
    },
  ];

  const getStaffStats = () => {
    const stats = staff.map(member => {
      const nominations = nominationData.filter(nom => nom.staffId === member.id);
      const completedNominations = nominations.filter(nom => nom.status === '完了');
      const cancelledNominations = nominations.filter(nom => nom.status === 'キャンセル');
      
      return {
        ...member,
        totalNominations: nominations.length,
        completedNominations: completedNominations.length,
        cancelledNominations: cancelledNominations.length,
        completionRate: nominations.length > 0 ? Math.round((completedNominations.length / nominations.length) * 100) : 0
      };
    });
    
    return stats.sort((a, b) => b.completedNominations - a.completedNominations);
  };

  const filteredNominations = nominationData.filter(nomination => {
    if (selectedStaff !== '全スタッフ') {
      return nomination.staffName === selectedStaff;
    }
    return true;
  });

  const periodOptions = ['今月', '先月', '過去3ヶ月', '過去6ヶ月', '過去1年'];
  const staffOptions = ['全スタッフ', ...staff.map(s => s.name)];

  return (
    <AdminNav>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">スタッフ指名履歴</h1>
              <p className="mt-2 text-sm text-gray-700">
                スタッフ別の指名回数と履歴を管理します。
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button className="btn-primary">
                <Download className="w-4 h-4 mr-2" />
                データをエクスポート
              </button>
            </div>
          </div>

          {/* フィルター */}
          <div className="mt-6 bg-white shadow rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-gray-400" />
                <div className="flex space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      期間
                    </label>
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    >
                      {periodOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      スタッフ
                    </label>
                    <select
                      value={selectedStaff}
                      onChange={(e) => setSelectedStaff(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    >
                      {staffOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* スタッフ別統計 */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">スタッフ別指名統計</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getStaffStats().map((member) => (
                <div key={member.id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">総指名回数</span>
                      <span className="text-sm font-semibold text-gray-900">{member.totalNominations}回</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">完了</span>
                      <span className="text-sm font-semibold text-green-600">{member.completedNominations}回</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">キャンセル</span>
                      <span className="text-sm font-semibold text-red-600">{member.cancelledNominations}回</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-sm text-gray-600">完了率</span>
                      <span className="text-sm font-semibold text-primary-600">{member.completionRate}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${member.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 指名履歴一覧 */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">指名履歴一覧</h2>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="min-w-full overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        指名日時
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        スタッフ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        患者名
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        診療内容
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ステータス
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredNominations.map((nomination) => (
                      <tr key={nomination.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{nomination.date}</div>
                              <div className="text-sm text-gray-500">{nomination.time}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                              <User className="w-4 h-4 text-primary-600" />
                            </div>
                            <div className="text-sm font-medium text-gray-900">{nomination.staffName}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{nomination.patientName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{nomination.service}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            nomination.status === '完了' 
                              ? 'bg-green-100 text-green-800'
                              : nomination.status === 'キャンセル'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {nomination.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 注意事項 */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <Award className="w-5 h-5 text-blue-400 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">指名カウントについて</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>指名日基準でカウントされます</li>
                    <li>来院キャンセルでもカウント対象となります</li>
                    <li>同日同一患者の複数指名は1回として処理されます</li>
                    <li>変更・キャンセル後の調整は行われません</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminNav>
  );
};

export default StaffNomination; 