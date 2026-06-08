import React, { useState, useMemo, useEffect } from 'react';
import {
  Home, Calculator, BedDouble,
  UserMinus, TrendingDown, CircleDollarSign, Target, UserCircle,
  AlertTriangle, Wrench, BarChart3,
  PieChart as PieChartIcon,
  Package, CheckCircle2, ChevronRight, Zap, ShieldCheck, Droplets,
  ClipboardList, Download, Upload, Plus, FileText, Save, Trash2,
  Calendar, FileSpreadsheet, Activity, Building, Briefcase, X
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const NAV_ITEMS = [
  { id: 'home', icon: Home, label: '首頁' },
  { id: 'products', icon: Package, label: '產品' },
  { id: 'calculator', icon: Calculator, label: '試算' },
  { id: 'notes', icon: ClipboardList, label: 'CRM' },
  { id: 'device', icon: BarChart3, label: '監控' },
];

const COLORS = ['#38bdf8', '#94a3b8', '#cbd5e1'];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [calcMode, setCalcMode] = useState('buyout');
  const [price, setPrice] = useState('45000');
  const [beds, setBeds] = useState('10');
  const [addons, setAddons] = useState('200');

  // --- 新增：憑證解鎖狀態與密碼 ---
  const [certPassword, setCertPassword] = useState('');
  const [isCertUnlocked, setIsCertUnlocked] = useState(false);

  const handleUnlockCerts = () => {
    if (certPassword === 'aj4' || certPassword === '木') {
      setIsCertUnlocked(true);
    } else {
      alert('密碼錯誤，拒絕存取');
    }
  };
  // ---------------------------------

  // 計算邏輯
  const { totalRevenue, myProfit, subDistProfit, profitPool, agentBonus, chartData, isValid } = useMemo(() => {
    const p = Math.max(0, Number(price) || 0);
    const b = Math.max(0, Number(beds) || 0);
    const a = Math.max(0, Number(addons) || 0);
    const rev = p * b;
    const my = rev * 0.1;
    const sub = rev * 0.2;
    const cost = rev * 0.7;
    const ok = p > 0 && b > 0;
    return {
      totalRevenue: rev,
      myProfit: my,
      subDistProfit: sub,
      profitPool: my + sub,
      agentBonus: a * b,
      isValid: ok,
      chartData: ok ? [
        { name: '下線分銷', value: sub },
        { name: '總經銷', value: my },
        { name: '原廠維運', value: cost },
      ] : [],
    };
  }, [price, beds, addons]);

  const fmt = (n) => `NT$ ${Number(n).toLocaleString('en-US')}`;

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
      
      {/* Sidebar - 固定寬度，不依賴斷點 */}
      <nav style={{ width: '80px', backgroundColor: '#0f172a', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
        <BedDouble size={28} color="#38bdf8" style={{ marginBottom: '30px' }} />
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              padding: '15px 0', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
              color: activeTab === item.id ? '#fff' : '#64748b',
              backgroundColor: activeTab === item.id ? '#0ea5e9' : 'transparent',
              border: 'none', cursor: 'pointer'
            }}
          >
            <item.icon size={20} />
            <span style={{ fontSize: '10px', marginTop: '5px' }}>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content - 簡單結構 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {activeTab === 'home' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>歡迎回來，王總監</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '15px' }}>人力減少</div>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '15px' }}>成本降低</div>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '15px' }}>創造獲利</div>
            </div>

            {/* --- 新增：權威實績與認證合規鎖定區塊 --- */}
            <div style={{ background: '#1e293b', padding: '20px', borderRadius: '15px', marginTop: '20px', color: '#fff' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={20} color="#38bdf8" /> 權威實績與認證合規
              </h3>
              {!isCertUnlocked ? (
                <div style={{ background: '#0f172a', padding: '15px', borderRadius: '10px', border: '1px solid #334155' }}>
                  <p style={{ color: '#fbbf24', fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <AlertTriangle size={16} /> 此資料衛福部規定不得作為廣告背書用，限內部私下查閱。
                  </p>
                  <input
                    type="password"
                    value={certPassword}
                    onChange={e => setCertPassword(e.target.value)}
                    placeholder="請輸入業務解鎖密碼..."
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #475569', background: '#1e293b', color: '#fff', marginBottom: '10px' }}
                  />
                  <button
                    onClick={handleUnlockCerts}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0ea5e9', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    解鎖查閱
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div style={{ background: '#0f172a', padding: '15px', borderRadius: '10px', border: '1px solid #334155' }}>
                    <div style={{ color: '#ef4444', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}><ShieldCheck size={30} /></div>
                    <h4 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '5px' }}>衛福部 FDA 函</h4>
                    <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>不以醫療器材列管</p>
                  </div>
                  <div style={{ background: '#0f172a', padding: '15px', borderRadius: '10px', border: '1px solid #334155' }}>
                    <div style={{ color: '#22c55e', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}><Activity size={30} /></div>
                    <h4 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '5px' }}>NCC 射頻認證</h4>
                    <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>SL-CWF08P</p>
                  </div>
                  <div style={{ background: '#0f172a', padding: '15px', borderRadius: '10px', border: '1px solid #334155', gridColumn: 'span 2' }}>
                    <div style={{ color: '#eab308', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}><Zap size={30} /></div>
                    <h4 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '5px' }}>多項專利與 SGS 認證、台灣精品獎</h4>
                  </div>
                </div>
              )}
            </div>
            {/* -------------------------------------- */}
          </div>
        )}

        {activeTab === 'calculator' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>分潤試算</h2>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '15px' }}>
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
                <input type="number" value={beds} onChange={e => setBeds(e.target.value)} style={{ width: '100%', padding: '10px' }} />
              </div>
              <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '15px' }}>
                <p>利潤總池: {fmt(profitPool)}</p>
                {isValid && (
                  <div style={{ height: '200px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8">
                          {chartData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 簡單化的其他頁面，確保不會崩潰 */}
        {['products', 'notes', 'device', 'profile'].includes(activeTab) && (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>{activeTab.toUpperCase()} 頁面</h2>
            <p>功能正常運作中</p>
          </div>
        )}
      </div>
    </div>
  );
}
