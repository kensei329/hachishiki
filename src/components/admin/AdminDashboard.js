import React, { useState, useMemo } from 'react';
import AdminNav from './AdminNav';
import { Users, CreditCard, MessageCircle, Crown, Star, TrendingUp, CheckCircle, XCircle, Clock, Eye, Search, Edit, Save, X, Calendar, User, Building, Gift } from 'lucide-react';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState({});
  const [showBenefitConfirm, setShowBenefitConfirm] = useState({ open: false, memberId: null, benefitIndex: null });
  const [assignedStaff, setAssignedStaff] = useState({});
  const [aiChatHistory, setAiChatHistory] = useState({});
  const [confirmedChats, setConfirmedChats] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showNewMemberModal, setShowNewMemberModal] = useState({ open: false, memberId: null, type: null });
  const [showAIChatDetail, setShowAIChatDetail] = useState({ open: false, memberId: null, chat: null });
  const [showPlanUpgradeConfirm, setShowPlanUpgradeConfirm] = useState({ open: false, memberId: null });
  const [showDiscountConfirm, setShowDiscountConfirm] = useState({ open: false, memberId: null, discount: null }); // 割引申し込み確認モーダルの状態
  
  // 新着情報の状態管理
  const [newMembers, setNewMembers] = useState([
    {
      id: 1,
      type: 'plan_upgrade',
      message: '田中 花子さんがProプランにアップグレードしました',
      date: '2024/12/15',
      status: 'pending'
    },
    {
      id: 2,
      type: 'benefit_request',
      message: '佐藤 太郎さんが特典「お口の細菌バランス検査」を申請中',
      date: '2024/12/14',
      status: 'pending'
    },
    {
      id: 3,
      type: 'ai_chat',
      message: '山田 美咲さんがAI歯科医に相談しました',
      date: '2024/12/14',
      status: 'pending'
    }
  ]);

  const stats = [
    {
      name: '公式LINE数',
      value: '156',
      change: '+8',
      changeType: 'increase',
      icon: MessageCircle,
    },
    {
      name: 'ベーシック数',
      value: '69',
      change: '+5',
      changeType: 'increase',
      icon: Users,
    },
    {
      name: 'Pro数',
      value: '25',
      change: '+3',
      changeType: 'increase',
      icon: Star,
    },
    {
      name: 'Pro Max数',
      value: '12',
      change: '+2',
      changeType: 'increase',
      icon: Crown,
    },
    {
      name: '歯知クラブ月間売上',
      value: '¥116,000',
      change: '+5.4%',
      changeType: 'increase',
      icon: CreditCard,
    },
  ];

  const [recentMembers, setRecentMembers] = useState([
    {
      id: 1,
      name: '田中 花子',
      patientId: '3901',
      birthDate: '1985-03-15',
      gender: '女性',
      clinicCode: 'HACHI001',
      plan: 'ベーシック',
      status: '支払済',
      joinDate: '2024/10/15',
      expiryDate: '2025/10/15',
      benefitsUsed: 2,
      benefitsTotal: 4,
      benefits: [
        { name: 'お口の細菌バランス検査', remaining: 0, total: 1, isRequested: false },
        { name: '唾液検査', remaining: 0, total: 1, isRequested: false },
        { name: '口臭検査', remaining: 1, total: 1, isRequested: false },
        { name: '血糖値検査', remaining: 1, total: 1, isRequested: false }
      ],
      aiChats: [
        {
          id: 1,
          date: '2024/12/15 14:30',
          summary: '歯の痛みについて相談。冷たいものがしみる症状。',
          status: 'unconfirmed',
          details: '患者: 冷たいものを食べると歯がしみるんです\nAI: 知覚過敏の可能性があります。歯科医院での診察をお勧めします。'
        },
        {
          id: 2,
          date: '2024/12/14 10:15',
          summary: '歯磨きの方法について質問。',
          status: 'confirmed',
          details: '患者: 正しい歯磨きの方法を教えてください\nAI: 45度の角度で小刻みに磨くことをお勧めします。'
        }
      ],
      discountRequests: [ // 割引申し込みの新着情報を追加
        { 
          id: 1, 
          serviceName: 'ホームホワイトニング割引', 
          price: 5000, 
          date: '2024/12/15', 
          status: 'pending',
          discountType: 'ホームホワイトニング割引',
          originalPrice: 15000,
          discountPrice: 5000
        },
        { 
          id: 2, 
          serviceName: '平日(10:00-15:00)割引-矯正-', 
          price: 640000, 
          date: '2024/12/15', 
          status: 'pending',
          discountType: '平日(10:00-15:00)割引',
          serviceType: '矯正',
          originalPrice: 800000,
          discountPrice: 640000
        }
      ],
      // 過去の支払い履歴を追加
      paymentHistory: [
        { id: 1, serviceName: 'お口の細菌バランス検査', amount: 5500, date: '2024/11/20', status: '支払済' },
        { id: 2, serviceName: '唾液検査', amount: 5500, date: '2024/11/15', status: '支払済' },
        { id: 3, serviceName: '平日割引-セラミック', amount: 45000, date: '2024/10/25', status: '支払済' },
        { id: 4, serviceName: '土曜日割引-ホワイトニング', amount: 12000, date: '2024/10/10', status: '支払済' }
      ]
    },
    {
      id: 2,
      name: '佐藤 太郎',
      patientId: '3902',
      birthDate: '1990-07-22',
      gender: '男性',
      clinicCode: 'HACHI001',
      plan: 'Pro',
      status: '支払済',
      joinDate: '2024/10/14',
      expiryDate: '2025/10/14',
      benefitsUsed: 3,
      benefitsTotal: 7,
      benefits: [
        { name: 'お口の細菌バランス検査', remaining: 0, total: 1, isRequested: false },
        { name: '唾液検査', remaining: 0, total: 1, isRequested: false },
        { name: '口臭検査', remaining: 0, total: 1, isRequested: false },
        { name: '血糖値検査', remaining: 0, total: 1, isRequested: false },
        { name: 'セラミック1本10%OFF', remaining: 1, total: 1, isRequested: false },
        { name: 'パウダーメンテナンス', remaining: 1, total: 1, isRequested: false },
        { name: '口腔ケア商品プレゼント', remaining: 1, total: 1, isRequested: false }
      ],
      // 過去の支払い履歴を追加
      paymentHistory: [
        { id: 1, serviceName: 'セラミック1本10%OFF', amount: 45000, date: '2024/11/25', status: '支払済' },
        { id: 2, serviceName: 'パウダーメンテナンス', amount: 5500, date: '2024/11/10', status: '支払済' },
        { id: 3, serviceName: '平日割引-インプラント', amount: 800000, date: '2024/10/20', status: '支払済' }
      ]
    },
    {
      id: 3,
      name: '山田 美咲',
      patientId: '3903',
      birthDate: '1988-11-08',
      gender: '女性',
      clinicCode: 'HACHI001',
      plan: 'Pro Max',
      status: '未払い',
      joinDate: '2024/10/13',
      expiryDate: '2025/10/13',
      benefitsUsed: 0,
      benefitsTotal: 10,
      benefits: [
        { name: 'お口の細菌バランス検査', remaining: 1, total: 1, isRequested: true },
        { name: '唾液検査', remaining: 1, total: 1, isRequested: false },
        { name: '口臭検査', remaining: 1, total: 1, isRequested: false },
        { name: '血糖値検査', remaining: 1, total: 1, isRequested: false },
        { name: 'セラミック1本10%OFF', remaining: 1, total: 1, isRequested: false },
        { name: 'パウダーメンテナンス', remaining: 1, total: 1, isRequested: false },
        { name: '口腔ケア商品プレゼント', remaining: 1, total: 1, isRequested: false },
        { name: 'ホームホワイトニング割引', remaining: 1, total: 1, isRequested: false },
        { name: 'オーラルセラピー', remaining: 1, total: 1, isRequested: false },
        { name: 'リップクレンジング', remaining: 1, total: 1, isRequested: false }
      ],
      aiChats: [
        {
          id: 1,
          date: '2024/12/15 16:45',
          summary: '歯の黄ばみについて相談。ホワイトニングの効果について質問。',
          status: 'unconfirmed',
          details: '患者: 歯の黄ばみが気になります。ホワイトニングは効果がありますか？\nAI: ホワイトニングは歯の黄ばみを改善する効果的な方法です。ただし、個人差があります。'
        }
      ],
      // 過去の支払い履歴を追加
      paymentHistory: [
        { id: 1, serviceName: 'ホームホワイトニング割引', amount: 5000, date: '2024/11/30', status: '支払済' },
        { id: 2, serviceName: 'オーラルセラピー', amount: 3300, date: '2024/11/15', status: '支払済' },
        { id: 3, serviceName: 'リップクレンジング', amount: 5500, date: '2024/11/05', status: '支払済' }
      ]
    },
    {
      id: 4,
      name: '鈴木 一郎',
      patientId: '3904',
      birthDate: '1975-12-03',
      gender: '男性',
      clinicCode: 'HACHI001',
      plan: 'ベーシック',
      status: '支払済',
      joinDate: '2024/10/12',
      expiryDate: '2025/10/12',
      benefitsUsed: 1,
      benefitsTotal: 4,
      benefits: [
        { name: 'お口の細菌バランス検査', remaining: 0, total: 1, isRequested: false },
        { name: '唾液検査', remaining: 1, total: 1, isRequested: false },
        { name: '口臭検査', remaining: 1, total: 1, isRequested: false },
        { name: '血糖値検査', remaining: 1, total: 1, isRequested: false }
      ],
      // 過去の支払い履歴を追加
      paymentHistory: [
        { id: 1, serviceName: 'お口の細菌バランス検査', amount: 5500, date: '2024/11/18', status: '支払済' },
        { id: 2, serviceName: '平日割引-一般診療', amount: 3000, date: '2024/10/28', status: '支払済' }
      ]
    },
    {
      id: 5,
      name: '高橋 恵美',
      patientId: '3905',
      birthDate: '1992-05-18',
      gender: '女性',
      clinicCode: 'HACHI001',
      plan: 'Pro',
      status: '支払済',
      joinDate: '2024/10/11',
      expiryDate: '2025/10/11',
      benefitsUsed: 5,
      benefitsTotal: 7,
      benefits: [
        { name: 'お口の細菌バランス検査', remaining: 0, total: 1, isRequested: false },
        { name: '唾液検査', remaining: 0, total: 1, isRequested: false },
        { name: '口臭検査', remaining: 0, total: 1, isRequested: false },
        { name: '血糖値検査', remaining: 0, total: 1, isRequested: false },
        { name: 'セラミック1本10%OFF', remaining: 0, total: 1, isRequested: false },
        { name: 'パウダーメンテナンス', remaining: 1, total: 1, isRequested: false },
        { name: '口腔ケア商品プレゼント', remaining: 1, total: 1, isRequested: false }
      ],
      // 過去の支払い履歴を追加
      paymentHistory: [
        { id: 1, serviceName: 'セラミック1本10%OFF', amount: 45000, date: '2024/11/22', status: '支払済' },
        { id: 2, serviceName: 'パウダーメンテナンス', amount: 5500, date: '2024/11/08', status: '支払済' },
        { id: 3, serviceName: '口腔ケア商品プレゼント', amount: 0, date: '2024/11/01', status: 'プレゼント' }
      ]
    },
  ]);

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

  // 検索フィルタリング
  const filteredMembers = recentMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.patientId.includes(searchTerm)
  );

  // ソート機能
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // 新着情報の処理
  const handleNewMemberAction = (memberId, type, action) => {
    if (action === 'complete') {
      setNewMembers(prev => prev.filter(item => item.id !== memberId));
      setShowNewMemberModal({ open: false, memberId: null, type: null });
    }
  };

  // 新着情報があるかチェック
  const hasNewInfo = (member) => {
    const hasBenefitRequest = member.benefits.some(b => b.isRequested);
    const hasUnconfirmedChat = member.aiChats && member.aiChats.some(c => c.status === 'unconfirmed');
    const hasPlanUpgrade = member.plan === 'Pro Max' && member.joinDate === '2024/10/13' && !member.planUpgradeCompleted; // Pro Max加入を新着として判定（完了していない場合のみ）
    const hasDiscountRequest = member.discountRequests && member.discountRequests.some(d => d.status === 'pending'); // 割引申し込みの新着情報
    return hasBenefitRequest || hasUnconfirmedChat || hasPlanUpgrade || hasDiscountRequest;
  };

  // ソートされたメンバーリスト（新着情報を上位に表示）
  const sortedMembers = useMemo(() => {
    let sortableMembers = [...filteredMembers];
    
    // 新着情報がある患者を上位に配置
    sortableMembers.sort((a, b) => {
      const aHasNew = hasNewInfo(a);
      const bHasNew = hasNewInfo(b);
      
      if (aHasNew && !bHasNew) return -1;
      if (!aHasNew && bHasNew) return 1;
      
      // 新着情報がない場合は通常のソート
      if (sortConfig.key) {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });
    
    return sortableMembers;
  }, [filteredMembers, sortConfig]);

  // 患者詳細表示
  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setEditingData({ ...member });
    setIsEditing(false);
  };

  // 編集開始
  const handleEdit = () => {
    setIsEditing(true);
  };

  // 編集保存
  const handleSave = () => {
    setRecentMembers(prev => prev.map(member =>
      member.id === editingData.id ? editingData : member
    ));
    setIsEditing(false);
    setSelectedMember(editingData);
  };

  // 編集キャンセル
  const handleCancel = () => {
    setEditingData({ ...selectedMember });
    setIsEditing(false);
  };

  // 編集データ更新
  const handleEditChange = (field, value) => {
    setEditingData(prev => ({ ...prev, [field]: value }));
  };

  // 患者詳細モーダルを閉じる
  const closeModal = () => {
    setSelectedMember(null);
    setIsEditing(false);
    setEditingData({});
  };

  // AIチャットを確認済みにする
  const handleConfirmChat = (memberId, chatId) => {
    setConfirmedChats(prev => ({
      ...prev,
      [`${memberId}-${chatId}`]: true
    }));
    
    // 患者データのAIチャット状態も更新
    setRecentMembers(prev => prev.map(member => {
      if (member.id === memberId) {
        return {
          ...member,
          aiChats: member.aiChats.map(chat => 
            chat.id === chatId ? { ...chat, status: 'confirmed' } : chat
          )
        };
      }
      return member;
    }));

    // 選択中のメンバーも更新
    if (selectedMember && selectedMember.id === memberId) {
      const updatedMember = { ...selectedMember };
      updatedMember.aiChats = updatedMember.aiChats.map(chat => 
        chat.id === chatId ? { ...chat, status: 'confirmed' } : chat
      );
      setSelectedMember(updatedMember);
    }
  };

  // 特典利用確認ポップアップを表示
  const handleUseBenefit = (memberId, benefitIndex) => {
    setShowBenefitConfirm({ open: true, memberId, benefitIndex });
  };

  // 特典利用確認
  const handleBenefitConfirm = (confirmed) => {
    if (confirmed && showBenefitConfirm.memberId !== null && showBenefitConfirm.benefitIndex !== null) {
      setRecentMembers(prev => prev.map(member => {
        if (member.id === showBenefitConfirm.memberId) {
          const updatedBenefits = [...member.benefits];
          const benefit = updatedBenefits[showBenefitConfirm.benefitIndex];
          if (benefit.remaining > 0) {
            updatedBenefits[showBenefitConfirm.benefitIndex] = {
              ...benefit,
              remaining: benefit.remaining - 1,
              isRequested: false // 申請中状態を解除
            };
          }
          return {
            ...member,
            benefits: updatedBenefits,
            benefitsUsed: member.benefitsUsed + 1
          };
        }
        return member;
      }));

      // 選択中のメンバーも更新
      if (selectedMember && selectedMember.id === showBenefitConfirm.memberId) {
        const updatedMember = { ...selectedMember };
        const benefit = updatedMember.benefits[showBenefitConfirm.benefitIndex];
        if (benefit.remaining > 0) {
          updatedMember.benefits[showBenefitConfirm.benefitIndex] = {
            ...benefit,
            remaining: benefit.remaining - 1,
            isRequested: false // 申請中状態を解除
          };
          updatedMember.benefitsUsed += 1;
        }
        setSelectedMember(updatedMember);
      }
    }
    setShowBenefitConfirm({ open: false, memberId: null, benefitIndex: null });
  };

  // プラン加入完了処理
  const handlePlanUpgradeComplete = (memberId) => {
    setRecentMembers(prev => prev.map(member =>
      member.id === memberId 
        ? { ...member, planUpgradeCompleted: true }
        : member
    ));
    
    // 選択中のメンバーも更新
    if (selectedMember && selectedMember.id === memberId) {
      setSelectedMember(prev => ({ ...prev, planUpgradeCompleted: true }));
    }
  };

  // 割引申し込み確認処理
  const handleDiscountConfirm = (memberId, discountId) => {
    setRecentMembers(prev => prev.map(member => {
      if (member.id === memberId) {
        const updatedDiscountRequests = member.discountRequests.map(d => 
          d.id === discountId ? { ...d, status: 'confirmed' } : d
        );
        return {
          ...member,
          discountRequests: updatedDiscountRequests
        };
      }
      return member;
    }));

    // 選択中のメンバーも更新
    if (selectedMember && selectedMember.id === memberId) {
      const updatedMember = { ...selectedMember };
      updatedMember.discountRequests = updatedMember.discountRequests.map(d => 
        d.id === discountId ? { ...d, status: 'confirmed' } : d
      );
      setSelectedMember(updatedMember);
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
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
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
                  最近加入された患者さんの一覧です。新着情報がある患者は上位に表示されます。
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

            {/* 検索バー */}
            <div className="mt-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="患者名または患者番号で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div className="mt-4 bg-white shadow rounded-lg overflow-hidden">
              <div className="min-w-full overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('patientId')}
                      >
                        <div className="flex items-center">
                          患者番号
                          {sortConfig.key === 'patientId' && (
                            <span className="ml-1">
                              {sortConfig.direction === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center">
                          患者名
                          {sortConfig.key === 'name' && (
                            <span className="ml-1">
                              {sortConfig.direction === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('assignedStaff')}
                      >
                        <div className="flex items-center">
                          担当スタッフ
                          {sortConfig.key === 'assignedStaff' && (
                            <span className="ml-1">
                              {sortConfig.direction === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('plan')}
                      >
                        <div className="flex items-center">
                          プラン
                          {sortConfig.key === 'plan' && (
                            <span className="ml-1">
                              {sortConfig.direction === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('joinDate')}
                      >
                        <div className="flex items-center">
                          加入日
                          {sortConfig.key === 'joinDate' && (
                            <span className="ml-1">
                              {sortConfig.direction === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('status')}
                      >
                        <div className="flex items-center">
                          支払状況
                          {sortConfig.key === 'status' && (
                            <span className="ml-1">
                              {sortConfig.direction === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        特典使用状況
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedMembers.map((member) => (
                      <tr key={member.id} className={`hover:bg-gray-50 cursor-pointer ${hasNewInfo(member) ? 'bg-yellow-50' : ''}`} onClick={() => handleMemberClick(member)}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{member.patientId}</div>
                            {hasNewInfo(member) && (
                              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">新着</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 hover:text-primary-600">{member.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {assignedStaff[member.id] || '未設定'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {member.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.joinDate}
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* プラン加入確認モーダル */}
      {showPlanUpgradeConfirm.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">プラン加入確認</h3>
            
            <div className="mb-6 text-center">
              <p className="text-gray-700 mb-4">患者への説明は完了しましたか？</p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  // プラン加入の新着情報を完了として処理
                  handlePlanUpgradeComplete(showPlanUpgradeConfirm.memberId);
                  setShowPlanUpgradeConfirm({ open: false, memberId: null });
                }}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-300"
              >
                はい
              </button>
              <button
                onClick={() => setShowPlanUpgradeConfirm({ open: false, memberId: null })}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-all duration-300"
              >
                いいえ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI相談詳細モーダル */}
      {showAIChatDetail.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full mx-4 border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">AI歯科医相談詳細</h3>
            
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="text-sm text-gray-600 mb-2">相談日時</div>
                <div className="font-medium">{showAIChatDetail.chat.date}</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="text-sm text-gray-600 mb-2">相談概要</div>
                <div className="font-medium">{showAIChatDetail.chat.summary}</div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600 mb-2">相談内容詳細</div>
                <div className="text-sm text-gray-800 whitespace-pre-line">{showAIChatDetail.chat.details}</div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  handleConfirmChat(showAIChatDetail.memberId, showAIChatDetail.chat.id);
                  setShowAIChatDetail({ open: false, memberId: null, chat: null });
                }}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-300"
              >
                確認完了
              </button>
              <button
                onClick={() => setShowAIChatDetail({ open: false, memberId: null, chat: null })}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-all duration-300"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 新着情報対応モーダル */}
      {showNewMemberModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
              {showNewMemberModal.type === 'plan_upgrade' && 'プランアップグレード対応'}
              {showNewMemberModal.type === 'benefit_request' && '特典申請対応'}
              {showNewMemberModal.type === 'ai_chat' && 'AI相談対応'}
            </h3>
            
            <div className="mb-6">
              {showNewMemberModal.type === 'plan_upgrade' && (
                <div className="text-center">
                  <p className="text-gray-700 mb-4">患者のプランアップグレードが完了しました。</p>
                  <button
                    onClick={() => handleNewMemberAction(showNewMemberModal.memberId, showNewMemberModal.type, 'complete')}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    加入御礼をする
                  </button>
                </div>
              )}
              
              {showNewMemberModal.type === 'benefit_request' && (
                <div className="text-center">
                  <p className="text-gray-700 mb-4">特典の申請を確認しました。</p>
                  <button
                    onClick={() => handleNewMemberAction(showNewMemberModal.memberId, showNewMemberModal.type, 'complete')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    利用する
                  </button>
                </div>
              )}
              
              {showNewMemberModal.type === 'ai_chat' && (
                <div className="text-center">
                  <p className="text-gray-700 mb-4">AI歯科医との相談を確認しました。</p>
                  <button
                    onClick={() => handleNewMemberAction(showNewMemberModal.memberId, showNewMemberModal.type, 'complete')}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    確認する
                  </button>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <button
                onClick={() => setShowNewMemberModal({ open: false, memberId: null, type: null })}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 患者詳細・編集モーダル */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">患者詳細情報</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {!isEditing ? (
              // 表示モード
              <div className="space-y-6">
                {/* 新着情報（患者詳細内） */}
                {(selectedMember.benefits.filter(b => b.isRequested).length > 0 || 
                  (selectedMember.aiChats && selectedMember.aiChats.filter(c => c.status === 'unconfirmed').length > 0) ||
                  (selectedMember.plan === 'Pro Max' && selectedMember.joinDate === '2024/10/13' && !selectedMember.planUpgradeCompleted)) && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-2 animate-pulse">新着</span>
                      新着情報
                    </h3>
                    <div className="space-y-3">
                      {/* Pro Maxプラン加入の新着情報 */}
                      {selectedMember.plan === 'Pro Max' && selectedMember.joinDate === '2024/10/13' && !selectedMember.planUpgradeCompleted && (
                        <div className="flex items-center justify-between bg-green-100 p-3 rounded">
                          <div>
                            <span className="text-green-800 font-medium">Pro Maxプラン加入</span>
                            <div className="text-green-600 text-sm">新しいプランに加入されました</div>
                            <div className="text-green-500 text-xs">加入日: {selectedMember.joinDate}</div>
                          </div>
                          <button
                            onClick={() => setShowPlanUpgradeConfirm({ open: true, memberId: selectedMember.id })}
                            className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors"
                          >
                            加入御礼する
                          </button>
                        </div>
                      )}

                      {/* 申請中の特典 */}
                      {selectedMember.benefits.filter(b => b.isRequested).map((benefit, idx) => {
                        const benefitIndex = selectedMember.benefits.findIndex(b => b.name === benefit.name);
                        return (
                          <div key={idx} className="flex items-center justify-between bg-yellow-100 p-3 rounded">
                            <div>
                              <span className="text-yellow-800 font-medium">{benefit.name} 申請中</span>
                              <div className="text-yellow-600 text-sm">特典の利用申請があります</div>
                            </div>
                            <button
                              onClick={() => handleUseBenefit(selectedMember.id, benefitIndex)}
                              disabled={benefit.remaining === 0}
                              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                                benefit.remaining > 0
                                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              利用する
                            </button>
                          </div>
                        );
                      })}
                      
                      {/* 未確認のAI相談 */}
                      {selectedMember.aiChats && selectedMember.aiChats.filter(c => c.status === 'unconfirmed').map((chat, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-blue-100 p-3 rounded">
                          <div>
                            <span className="text-blue-800 font-medium">AI相談 未確認</span>
                            <div className="text-blue-600 text-sm">{chat.summary}</div>
                            <div className="text-blue-500 text-xs">{chat.date}</div>
                          </div>
                          <button
                            onClick={() => setShowAIChatDetail({ open: true, memberId: selectedMember.id, chat: chat })}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                          >
                            確認する
                          </button>
                        </div>
                      ))}

                      {/* 割引申し込みの新着情報 */}
                      {selectedMember.discountRequests && selectedMember.discountRequests.filter(d => d.status === 'pending').map((discount, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-purple-100 p-3 rounded">
                          <div className="flex-1">
                            <span className="text-purple-800 font-medium">割引申し込み 未確認</span>
                            <div className="text-purple-600 text-sm">
                              {discount.discountType}
                              {discount.serviceType && `-${discount.serviceType}-`}
                            </div>
                            <div className="text-purple-700 font-bold text-lg">¥{discount.price.toLocaleString()}</div>
                            <div className="text-purple-500 text-xs">{discount.date}</div>
                            {discount.originalPrice && (
                              <div className="text-purple-500 text-xs">
                                通常価格: ¥{discount.originalPrice.toLocaleString()} → 
                                割引価格: ¥{discount.discountPrice.toLocaleString()}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => setShowDiscountConfirm({ open: true, memberId: selectedMember.id, discount: discount })}
                            className="px-3 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600 transition-colors ml-3"
                          >
                            確認する
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 基本情報 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      基本情報
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">患者名:</span>
                        <span className="font-medium">{selectedMember.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">患者番号:</span>
                        <span className="font-medium">{selectedMember.patientId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">生年月日:</span>
                        <span className="font-medium">{selectedMember.birthDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">性別:</span>
                        <span className="font-medium">{selectedMember.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">歯科医院コード:</span>
                        <span className="font-medium">{selectedMember.clinicCode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Crown className="w-5 h-5 mr-2" />
                      プラン情報
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">現在のプラン:</span>
                        <span className="font-medium">{selectedMember.plan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">支払状況:</span>
                        <span className="font-medium">{selectedMember.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">加入日:</span>
                        <span className="font-medium">{selectedMember.joinDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">加入期日:</span>
                        <span className="font-medium">{selectedMember.expiryDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* 担当スタッフ */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      担当スタッフ
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="担当スタッフ名を入力"
                          value={assignedStaff[selectedMember.id] || ''}
                          onChange={(e) => setAssignedStaff(prev => ({
                            ...prev,
                            [selectedMember.id]: e.target.value
                          }))}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        />
                        <button
                          onClick={() => {
                            // 担当スタッフの保存処理
                            console.log(`担当スタッフを保存: ${assignedStaff[selectedMember.id]}`);
                          }}
                          className="px-3 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors text-sm"
                        >
                          保存
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 特典利用情報 */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Gift className="w-5 h-5 mr-2" />
                    特典利用情報
                  </h3>
                  <div className="space-y-4">
                    {/* 申請中の特典を最上部に表示 */}
                    {selectedMember.benefits.filter(b => b.isRequested).length > 0 && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-medium text-yellow-800 mb-2">申請中の特典</h4>
                        <div className="space-y-2">
                          {selectedMember.benefits.filter(b => b.isRequested).map((benefit, idx) => {
                            const benefitIndex = selectedMember.benefits.findIndex(b => b.name === benefit.name);
                            return (
                              <div key={idx} className="flex items-center justify-between bg-yellow-100 p-2 rounded">
                                <span className="text-yellow-800 font-medium">{benefit.name}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-yellow-600 text-sm">申請中</span>
                                  <button
                                    onClick={() => handleUseBenefit(selectedMember.id, benefitIndex)}
                                    disabled={benefit.remaining === 0}
                                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                                      benefit.remaining > 0
                                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                  >
                                    利用する
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 全特典の状況 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedMember.benefits.map((benefit, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-800">{benefit.name}</span>
                            {benefit.isRequested && (
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">申請中</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            残り: {benefit.remaining}/{benefit.total}
                          </div>
                          <div className="mt-2 flex space-x-1 mb-3">
                            {[...Array(benefit.total)].map((_, index) => (
                              <div
                                key={index}
                                className={`w-3 h-3 rounded-full border ${
                                  index < (benefit.total - benefit.remaining)
                                    ? 'bg-yellow-400 border-yellow-400'
                                    : 'border-gray-300 bg-transparent'
                                }`}
                              />
                            ))}
                          </div>
                          <button
                            onClick={() => handleUseBenefit(selectedMember.id, idx)}
                            disabled={benefit.remaining === 0}
                            className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                              benefit.remaining > 0
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            利用する
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 過去の支払い履歴 */}
                {selectedMember.paymentHistory && selectedMember.paymentHistory.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      過去の支払い履歴
                    </h3>
                    <div className="space-y-3">
                      {selectedMember.paymentHistory.map((payment, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{payment.serviceName}</div>
                            <div className="text-sm text-gray-600">{payment.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-800">
                              {payment.status === 'プレゼント' ? 'プレゼント' : `¥${payment.amount.toLocaleString()}`}
                            </div>
                            <div className={`text-xs px-2 py-1 rounded-full ${
                              payment.status === '支払済' 
                                ? 'bg-green-100 text-green-800' 
                                : payment.status === 'プレゼント'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {payment.status}
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* 支払い合計 */}
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-blue-800">支払い合計</span>
                          <span className="font-bold text-blue-800 text-lg">
                            ¥{selectedMember.paymentHistory
                              .filter(payment => payment.status === '支払済')
                              .reduce((sum, payment) => sum + payment.amount, 0)
                              .toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI歯科医師とのやり取り */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    AI歯科医師とのやり取り
                  </h3>
                  <div className="space-y-3">
                    {selectedMember.aiChats && selectedMember.aiChats.map((chat, idx) => (
                      <div key={chat.id} className={`p-3 rounded-lg border ${
                        chat.status === 'unconfirmed' 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'bg-green-50 border-green-200'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-gray-600">{chat.date}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            chat.status === 'unconfirmed' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {chat.status === 'unconfirmed' ? '未確認' : '確認済み'}
                          </div>
                        </div>
                        <div className="text-sm text-gray-800 mb-2">
                          <strong>概要:</strong> {chat.summary}
                        </div>
                        {chat.status === 'unconfirmed' && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleConfirmChat(selectedMember.id, chat.id)}
                              className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                            >
                              確認した
                            </button>
                            <button
                              onClick={() => {
                                // 詳細表示の処理
                                console.log('チャット詳細:', chat.details);
                              }}
                              className="px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600 transition-colors"
                            >
                              詳細を見る
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    {(!selectedMember.aiChats || selectedMember.aiChats.length === 0) && (
                      <div className="text-center text-gray-500 text-sm py-4">
                        AI歯科医師とのやり取りはありません
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleEdit}
                    className="btn-primary"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    編集
                  </button>
                </div>
              </div>
            ) : (
              // 編集モード
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">患者名</label>
                      <input
                        type="text"
                        value={editingData.name}
                        onChange={(e) => handleEditChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">患者番号</label>
                      <input
                        type="text"
                        value={editingData.patientId}
                        onChange={(e) => handleEditChange('patientId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">生年月日</label>
                      <input
                        type="date"
                        value={editingData.birthDate}
                        onChange={(e) => handleEditChange('birthDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">性別</label>
                      <select
                        value={editingData.gender}
                        onChange={(e) => handleEditChange('gender', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="男性">男性</option>
                        <option value="女性">女性</option>
                        <option value="その他">その他</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">歯科医院コード</label>
                      <input
                        type="text"
                        value={editingData.clinicCode}
                        onChange={(e) => handleEditChange('clinicCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">プラン</label>
                      <select
                        value={editingData.plan}
                        onChange={(e) => handleEditChange('plan', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="フリープラン">フリープラン</option>
                        <option value="ベーシック">ベーシック</option>
                        <option value="Pro">Pro</option>
                        <option value="Pro Max">Pro Max</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">加入日</label>
                      <input
                        type="date"
                        value={editingData.joinDate}
                        onChange={(e) => handleEditChange('joinDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">加入期日</label>
                      <input
                        type="date"
                        value={editingData.expiryDate}
                        onChange={(e) => handleEditChange('expiryDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-primary"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    保存
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 特典利用確認ポップアップ */}
      {showBenefitConfirm.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xs w-full border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">利用しますか？</h3>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                onClick={() => handleBenefitConfirm(true)}
              >
                はい
              </button>
              <button
                className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300"
                onClick={() => handleBenefitConfirm(false)}
              >
                いいえ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 割引申し込み確認モーダル */}
      {showDiscountConfirm.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">割引申し込み確認</h3>
            
            <div className="mb-6 text-center">
              <p className="text-gray-700 mb-4">申込み内容を確認取りましたか？</p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-purple-800 font-medium">{showDiscountConfirm.discount.serviceName}</div>
                <div className="text-purple-600">¥{showDiscountConfirm.discount.price.toLocaleString()}</div>
                <div className="text-purple-500 text-sm">{showDiscountConfirm.discount.date}</div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  handleDiscountConfirm(showDiscountConfirm.memberId, showDiscountConfirm.discount.id);
                  setShowDiscountConfirm({ open: false, memberId: null, discount: null });
                }}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-300"
              >
                はい
              </button>
              <button
                onClick={() => setShowDiscountConfirm({ open: false, memberId: null, discount: null })}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-all duration-300"
              >
                いいえ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* プラン加入確認モーダル */}
      {showPlanUpgradeConfirm.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">プラン加入確認</h3>
            
            <div className="mb-6 text-center">
              <p className="text-gray-700 mb-4">患者への説明は完了しましたか？</p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  // プラン加入の新着情報を完了として処理
                  handlePlanUpgradeComplete(showPlanUpgradeConfirm.memberId);
                  setShowPlanUpgradeConfirm({ open: false, memberId: null });
                }}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-300"
              >
                はい
              </button>
              <button
                onClick={() => setShowPlanUpgradeConfirm({ open: false, memberId: null })}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-all duration-300"
              >
                いいえ
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminNav>
  );
};

export default AdminDashboard; 