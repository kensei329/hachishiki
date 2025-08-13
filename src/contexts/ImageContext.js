import React, { createContext, useContext, useState, useEffect } from 'react';

const ImageContext = createContext();

export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
};

export const ImageProvider = ({ children }) => {
  // 初期画像の設定（実際の実装では、これらの画像はpublic/images/に配置）
  const [serviceImages, setServiceImages] = useState({
    orthodontics: {
      id: 'orthodontics',
      name: '矯正',
      defaultImage: '/images/orthodontics-default.jpg',
      customImage: null,
      description: '歯並びを美しく整える矯正治療'
    },
    whitening: {
      id: 'whitening',
      name: 'ホワイトニング',
      defaultImage: '/images/whitening-default.jpg',
      customImage: null,
      description: '歯を白く美しくするホワイトニング'
    },
    ceramic: {
      id: 'ceramic',
      name: 'セラミック',
      defaultImage: '/images/ceramic-default.jpg',
      customImage: null,
      description: '美しいセラミックによる歯の修復'
    },
    implant: {
      id: 'implant',
      name: 'インプラント',
      defaultImage: '/images/implant-default.jpg',
      customImage: null,
      description: '失った歯を人工歯根で補うインプラント'
    }
  });

  // ローカルストレージからカスタム画像を読み込み
  useEffect(() => {
    const savedImages = localStorage.getItem('serviceImages');
    if (savedImages) {
      try {
        const parsed = JSON.parse(savedImages);
        setServiceImages(prev => ({
          ...prev,
          ...parsed
        }));
      } catch (error) {
        console.error('画像データの読み込みに失敗しました:', error);
      }
    }
  }, []);

  // 画像の変更
  const updateServiceImage = (serviceId, imageFile) => {
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newImageData = e.target.result;
      
      setServiceImages(prev => {
        const updated = {
          ...prev,
          [serviceId]: {
            ...prev[serviceId],
            customImage: newImageData
          }
        };
        
        // ローカルストレージに保存
        localStorage.setItem('serviceImages', JSON.stringify(updated));
        return updated;
      });
    };
    
    reader.readAsDataURL(imageFile);
  };

  // カスタム画像の削除（デフォルト画像に戻す）
  const resetServiceImage = (serviceId) => {
    setServiceImages(prev => {
      const updated = {
        ...prev,
        [serviceId]: {
          ...prev[serviceId],
          customImage: null
        }
      };
      
      // ローカルストレージに保存
      localStorage.setItem('serviceImages', JSON.stringify(updated));
      return updated;
    });
  };

  // 現在の画像URLを取得
  const getCurrentImage = (serviceId) => {
    const service = serviceImages[serviceId];
    if (!service) return null;
    
    return service.customImage || service.defaultImage;
  };

  // 画像の存在確認
  const hasCustomImage = (serviceId) => {
    return !!serviceImages[serviceId]?.customImage;
  };

  const value = {
    serviceImages,
    updateServiceImage,
    resetServiceImage,
    getCurrentImage,
    hasCustomImage
  };

  return (
    <ImageContext.Provider value={value}>
      {children}
    </ImageContext.Provider>
  );
};
