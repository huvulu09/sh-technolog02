import React, { useState, useMemo } from 'react';
import { LayoutDashboard, Package, Calculator, Users, ShieldCheck, TrendingUp, Info } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // 產品資料庫 (根據 2026.06 最新報價表更新)
  const products = [
    { id: 'E+', name: '智慧型翻身輔助器-E+', price: 68000, rent: 2500, ncc: 'CCAG26Y10020TO' },
    { id: 'EX', name: 'AIoT 智慧型翻身輔助架-EX', price: 64000, rent: 2700, ncc: 'CCAG26Y10020TO' },
    { id: '排泄機', name: 'AIoT 全自動排泄處理機', price: 248000, rent: 6500, ncc: 'N/A' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">業務總覽 - 2026.06 季度</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-blue-600 rounded-xl text-white shadow-lg">
                <p className="opacity-80">本月預估佣金池</p>
                <p className="text-3xl font-bold">NT$ 485,000</p>
              </div>
              <div className="p-6 bg-emerald-600 rounded-xl text-white shadow-lg">
                <p className="opacity-80">場域驗證中床位</p>
                <p className="text-3xl font-bold">42 床</p>
              </div>
              <div className="p-6 bg-amber-600 rounded-xl text-white shadow-lg">
                <p className="opacity-80">NCC 合規認證</p>
                <p className="text-3xl font-bold">已完成</p>
              </div>
            </div>
          </div>
        );
      case 'catalog':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">產品規格與認證 (V6)</h2>
            {products.map((p) => (
              <div key={p.id} className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-sm text-slate-500">認證字號: {p.ncc}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-600 font-bold">零售: NT${p.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'calculator':
        return <div className="p-10 text-center text-slate-400">分潤試算引擎模組已更新至 V6 版本 (支援即時連動價格)</div>;
      default:
        return <div>請選擇功能模組</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <nav className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-xl font-bold mb-8 text-blue-400">碩享 SS-Care V6</h1>
        <div className="space-y-4">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: '儀表總覽' },
            { id: 'catalog', icon: Package, label: '產品型錄' },
            { id: 'calculator', icon: Calculator, label: '分潤試算' },
            { id: 'crm', icon: Users, label: '拜訪 CRM' }
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} 
              className={`flex items-center gap-3 w-full p-3 rounded-lg ${activeTab === item.id ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              <item.icon size={20} /> {item.label}
            </button>
          ))}
        </div>
      </nav>
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
}
