// App.jsx - 最終合併完整版（以第2版為基底）
import React, { useState, useMemo } from 'react';
import './App.css';

function App() {
  const [active, setActive] = useState('左翻拍背');
  const [showPolicy, setShowPolicy] = useState(true);

  // 使用 useMemo 保護靜態資料，符合大型專案架構規範
  const scenarios = useMemo(() => [
    '左翻拍背', '右翻拍背', '抬背餵食', '抽痰餵水',
    '舒活減壓', '尿布更換', '抬腿修甲', '零壓坐姿'
  ], []);

  return (
    <div className="showcase-grid">

      {/* 左側：3D 視覺展示區 */}
      <div className="viewer-pane">
        {showPolicy && (
          <div className="policy-badge">
            指標 4.1-4.4 智慧照顧應用已啟用
          </div>
        )}
        <div className="model-placeholder">🛏️</div>
        <h2>AIOT 智慧護理系統 - {active}模式</h2>
        <p>即時監測：翻身角度、壓力分佈、環境溫濕度</p>
      </div>

      {/* 右側：操控面板 */}
      <div className="controls-pane">
        <h3>情境模式控制</h3>
        {scenarios.map(s => (
          <button
            key={s}
            className={`scenario-btn ${active === s ? 'active' : ''}`}
            onClick={() => setActive(s)}
          >
            {s}
          </button>
        ))}
        <button
          className="toggle-btn"
          onClick={() => setShowPolicy(prev => !prev)}
        >
          {showPolicy ? '隱藏補助指標說明' : '顯示補助指標說明'}
        </button>
      </div>

    </div>
  );
}

export default App;
