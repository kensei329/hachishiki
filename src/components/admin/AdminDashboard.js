import React from 'react';
import AdminNav from './AdminNav';
import { Users, CreditCard, Gift, TrendingUp, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      name: '総加入者数',
      value: '127',
      change: '+12',
      changeType: 'increase',
      icon: Users,
    },
    {
      name: '月間売上',
      value: '¥1,016,000',
      change: '+5.4%',
      changeType: 'increase',
      icon: CreditCard,
    },
    {
      name: '特典利用率',
      value: '78%',
      change: '+2.1%',
      changeType: 'increase',
      icon: Gift,
    },
    {
      name: '継続率',
      value: '91%',
      change: '-0.5%',
      changeType: 'decrease',
      icon: TrendingUp,
    },
  ];

  const recentMembers = [
    {
      id: 1,
      name: '田中 花子',
      patientId: '12345',
      plan: '歯知クラブ Pro',
      status: '支払済',
      joinDate: '2024/10/15',
      benefitsUsed: 3,
      benefitsTotal: 8,
    },
    {
      id: 2,
      name: '佐藤 太郎',
      patientId: '12346',
      plan: '歯知クラブ ベーシック',
      status: '支払済',
      joinDate: '2024/10/14',
      benefitsUsed: 1,
      benefitsTotal: 5,
    },
    {
      id: 3,
      name: '山田 美咲',
      patientId: '12347',
      plan: '歯知クラブ Pro',
      status: '未払い',
      joinDate: '2024/10/13',
      benefitsUsed: 0,
      benefitsTotal: 8,
    },
    {
      id: 4,
      name: '鈴木 一郎',
      patientId: '12348',
      plan: '歯知クラブ ライト',
      status: '支払済',
      joinDate: '2024/10/12',
      benefitsUsed: 2,
      benefitsTotal: 3,
    },
    {
      id: 5,
      name: '高橋 恵美',
      patientId: '12349',
      plan: '歯知クラブ Pro',
      status: '支払済',
      joinDate: '2024/10/11',
      benefitsUsed: 5,
      benefitsTotal: 8,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case '支払済':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case '未払い':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '支払済':
        return 'text-green-700 bg-green-100';
      case '未払い':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-yellow-700 bg-yellow-100';
    }
  };

  return (
    <AdminNav>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">ダッシュボード</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* 統計カード */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.name} className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                  <dt>
                    <div className="absolute bg-primary-500 rounded-md p-3">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
                  </dt>
                  <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                    <p
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {item.change}
                    </p>
                  </dd>
                </div>
              );
            })}
          </div>

          {/* 加入者一覧 */}
          <div className="mt-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-xl font-semibold text-gray-900">加入者一覧</h2>
                <p className="mt-2 text-sm text-gray-700">
                  最近加入された患者さんの一覧です。
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  type="button"
                  className="btn-primary"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  すべて表示
                </button>
              </div>
            </div>
            <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
              <div className="min-w-full overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        患者情報
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        プラン
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        支払状況
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        特典使用状況
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        加入日
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500">ID: {member.patientId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {member.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(member.status)}
                            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(member.status)}`}>
                              {member.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-primary-600 h-2 rounded-full"
                                style={{ width: `${(member.benefitsUsed / member.benefitsTotal) * 100}%` }}
                              ></div>
                            </div>
                            <span>{member.benefitsUsed}/{member.benefitsTotal}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.joinDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminNav>
  );
};

export default AdminDashboard; 