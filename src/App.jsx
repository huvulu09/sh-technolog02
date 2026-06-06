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
  { id: 'home',       icon: Home,          label: '首頁' },
  { id: 'products',   icon: Package,       label: '產品' },
  { id: 'calculator', icon: Calculator,    label: '試算' },
  { id: 'notes',      icon: ClipboardList, label: 'CRM' },
  { id: 'device',     icon: BarChart3,     label: '監控' },
];

const COLORS = ['#38bdf8', '#94a3b8', '#cbd5e1'];

const SALES_STAGES = [
  { value: '初次拜訪',       color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { value: '需求確認',       color: 'bg-sky-50 text-sky-700 border-sky-200' },
  { value: '報價與展示',     color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { value: '獨佔/年約協商', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: '簽約結案',       color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
];

const EMPTY_NOTE = {
  id: '', clientName: '', date: new Date().toISOString().split('T')[0],
  stage: '初次拜訪', commission: '', requiredDocs: '', contractTerms: '', extraNotes: ''
};

export default function App() {
  const [activeTab, setActiveTab]       = useState('home');
  const [calcMode, setCalcMode]         = useState('buyout');
  const [price, setPrice]               = useState('45000');
  const [beds,  setBeds]                = useState('10');
  const [addons,setAddons]              = useState('200');
  const [notes, setNotes]               = useState([]);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [newNote, setNewNote]           = useState({ ...EMPTY_NOTE });
  const [toast, setToast]               = useState('');

  useEffect(() => {
    setNotes([{
      id: '1', clientName: '彰化老人之家 (場域驗證專案)',
      date: '2026-06-01', stage: '簽約結案',
      commission: '專案補助，無退傭',
      requiredDocs: 'NCC 認證報告 (SL-CWF08P)、SGS 報告',
      contractTerms: '長期場域使用驗證，預計導入 40 床。',
      extraNotes: '後續確認 ERP 系統對接 API。'
    }]);
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleSaveNote = () => {
    if (!newNote.clientName) { showToast('請輸入客戶/機構名稱'); return; }
    setNotes(prev => [{ ...newNote, id: Date.now().toString() }, ...prev]);
    setNewNote({ ...EMPTY_NOTE });
    setShowNoteForm(false);
    showToast('CRM 拜訪紀錄已儲存');
  };

  const handleDeleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    showToast('紀錄已刪除');
  };

  const handleExport = () => {
    if (!notes.length) { showToast('目前沒有資料可匯出'); return; }
    const a = document.createElement('a');
    a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(notes, null, 2));
    a.download = `CRM_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    showToast('成功匯出 CRM 紀錄');
  };

  const handleImport = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const imported = JSON.parse(evt.target.result);
        if (Array.isArray(imported)) {
          setNotes(prev => {
            const merged = [...imported, ...prev];
            return merged.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
          });
          showToast(`成功匯入 ${imported.length} 筆紀錄`);
        } else { showToast('格式錯誤，需為陣列'); }
      } catch { showToast('讀取失敗，請確認 JSON 格式'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleModeSwitch = (mode) => {
    setCalcMode(mode);
    setPrice(mode === 'buyout' ? '45000' : '3200');
  };

  const { totalRevenue, myProfit, subDistProfit, profitPool, agentBonus, chartData, isValid } = useMemo(() => {
    const p = Math.max(0, Number(price)  || 0);
    const b = Math.max(0, Number(beds)   || 0);
    const a = Math.max(0, Number(addons) || 0);
    const rev = p * b, cost = rev * 0.7, my = rev * 0.1, sub = rev * 0.2;
    const ok  = p > 0 && b > 0;
    return {
      totalRevenue: rev, myProfit: my, subDistProfit: sub,
      profitPool: my + sub, agentBonus: a * b, isValid: ok,
      chartData: ok ? [
        { name: '下線分銷 (20%)',  value: sub  },
        { name: '總經銷(您) (10%)', value: my   },
        { name: '原廠維運 (70%)',  value: cost },
      ] : [],
    };
  }, [price, beds, addons]);

  const fmt = (n) => `NT$ ${Number(n).toLocaleString('en-US')}`;
  const periodLabel = calcMode === 'lease' ? ' /月' : '';

  // ── Shared input style ──
  const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all";

  return (
    // Key fix: use flex row with a ALWAYS-visible compact sidebar + main scroll area
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'row', overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}
         className="bg-slate-50 text-slate-800">

      {/* ── SIDEBAR — always visible, icon+label, compact ── */}
      <aside style={{ width: 64, minWidth: 64, background: '#0f172a', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12, paddingBottom: 12 }}>
        {/* Logo */}
        <div style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <BedDouble size={26} color="#38bdf8" />
        </div>

        {/* Nav items */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, width: '100%', paddingLeft: 6, paddingRight: 6 }}>
          {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '8px 0', borderRadius: 12, border: 'none', cursor: 'pointer',
                background: activeTab === id ? '#0ea5e9' : 'transparent',
                color: activeTab === id ? '#fff' : '#94a3b8',
                transition: 'background 0.15s',
              }}
            >
              <Icon size={18} />
              <span style={{ fontSize: 9, marginTop: 3, fontWeight: 700 }}>{label}</span>
            </button>
          ))}
        </div>

        {/* Profile */}
        <button
          onClick={() => setActiveTab('profile')}
          style={{ marginTop: 'auto', background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', padding: 8 }}
        >
          <UserCircle size={26} />
        </button>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <main style={{ flex: 1, overflowY: 'auto' }}>

          {/* ════ HOME ════ */}
          {activeTab === 'home' && (
            <div>
              <div className="bg-slate-900 px-6 py-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                  <div>
                    <h1 className="text-3xl font-bold mb-1">歡迎回來，王總監</h1>
                    <p className="text-sky-200 text-sm">持續推進北區智慧照護市場佈局，落實 ESG 精神。</p>
                  </div>
                  <div className="bg-white/10 border border-white/10 rounded-2xl px-5 py-4 shrink-0">
                    <p className="text-xs text-sky-200 mb-1">本月累積團隊利潤 (NT$)</p>
                    <h2 className="text-4xl font-bold text-white tracking-tight">485,000</h2>
                  </div>
                </div>
              </div>

              {/* Product title banner */}
              <div className="px-6 pt-8 max-w-5xl mx-auto">
                <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-2xl px-6 py-4 mb-5 shadow-md">
                  <p className="text-sky-100 text-[10px] font-semibold uppercase tracking-widest mb-1">核心產品</p>
                  <h2 className="text-white font-bold text-base md:text-lg leading-snug">
                    智慧聯網照護系統之 智慧型翻身排泄護理組
                  </h2>
                  <p className="text-sky-200 text-xs mt-1.5 leading-relaxed">
                    含行動感知、移動、照護支援、排泄感知、四合一物聯資訊
                  </p>
                </div>
              </div>

              <div className="px-6 pb-2 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {[
                  { icon: UserMinus,        color: 'text-orange-500', bg: 'bg-orange-50',  title: '1. 人力減少',  desc: '全自動翻身 (8 種模式) 與排泄處理，取代重度勞力，解決缺工痛點。' },
                  { icon: TrendingDown,     color: 'text-emerald-600',bg: 'bg-emerald-50', title: '2. 成本降低',  desc: '免換尿布耗材歸零；降低離職率，省下龐大招募與訓練隱形成本。' },
                  { icon: CircleDollarSign, color: 'text-blue-600',   bg: 'bg-blue-50',    title: '3. 創造獲利',  desc: '對接 ERP 獲取政府補助；外掛模組無須汰換現有病床，無痛升級。' },
                ].map((c, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className={`w-11 h-11 ${c.bg} ${c.color} rounded-xl flex items-center justify-center mb-4`}>
                      <c.icon size={20} />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-1.5 text-sm">{c.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>

              <div className="px-6 pb-10 max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1 flex items-center text-sm">
                      <Briefcase className="text-sky-500 mr-2" size={18} /> 準備好向機構提案了嗎？
                    </h3>
                    <p className="text-slate-500 text-xs">利用試算引擎展示 ROI，並在 CRM 紀錄談判條件。</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => setActiveTab('calculator')} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors flex items-center text-xs">
                      <Calculator size={14} className="mr-1.5" /> 試算
                    </button>
                    <button onClick={() => setActiveTab('notes')} className="px-4 py-2 rounded-xl bg-sky-500 text-white font-bold hover:bg-sky-600 shadow-md shadow-sky-500/30 transition-all flex items-center text-xs">
                      <ClipboardList size={14} className="mr-1.5" /> CRM
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ PRODUCTS ════ */}
          {activeTab === 'products' && (
            <div className="p-6 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center mb-1">
                <Package className="mr-2 text-sky-500" size={24} /> 產品型錄與規格
              </h2>
              <p className="text-slate-500 text-sm mb-6">向客戶展示「碩享智慧全效護理床」的核心優勢與 NCC 認證技術。</p>

              <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 mb-5 flex flex-col lg:flex-row">
                {/* Visual */}
                <div className="w-full lg:w-2/5 bg-slate-900 p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[240px]">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10 w-full max-w-xs bg-slate-800/80 border border-slate-700 rounded-2xl p-7 flex flex-col items-center">
                    <BedDouble size={52} className="text-sky-400 mb-3" />
                    <p className="text-slate-200 font-bold tracking-widest text-center text-sm">SS-Care</p>
                    <p className="text-slate-400 text-xs mt-1">AIOT 智慧型翻身排泄護理組</p>
                  </div>
                  <div className="relative z-10 flex gap-2 mt-4 w-full max-w-xs">
                    {[{icon:Zap,c:'text-amber-400',l:'雷達感測'},{icon:Droplets,c:'text-sky-400',l:'自動清理'},{icon:ShieldCheck,c:'text-emerald-400',l:'NCC 認證'}].map((x,i)=>(
                      <div key={i} className="flex-1 bg-slate-800/80 border border-slate-700 p-2.5 rounded-xl text-center">
                        <x.icon size={16} className={`${x.c} mx-auto mb-1`} />
                        <p className="text-[10px] text-slate-300 font-medium">{x.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Specs */}
                <div className="w-full lg:w-3/5 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-slate-800">SS-Care 旗艦型智慧病床</h3>
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded border border-emerald-200">ESG 綠色材料</span>
                  </div>
                  <p className="text-slate-600 text-xs mb-4 leading-relaxed">通過 NCC 認證 (SL-CWF08P)，結合物聯網科技與人體工學高分子床墊，專為長期臥床患者打造。</p>

                  <div className="space-y-3 mb-5">
                    {[
                      { title: '8 種智能翻身模式', desc: '左/右翻拍背、抽痰餵水、抬背餵食、舒活減壓、零壓坐姿等。' },
                      { title: '全自動排泄處理系統', desc: 'UV 殺菌、溫水沖洗、暖風烘乾，臀部氣囊按摩，無異味產生。' },
                      { title: '智慧感測警示 + ERP 對接', desc: '離床/久臥/排泄偵測，符合住宿機構照顧品質獎勵計畫申請資格。' },
                    ].map((f,i) => (
                      <div key={i} className="flex items-start">
                        <div className="bg-sky-100 p-1 rounded-lg mr-2.5 shrink-0 mt-0.5">
                          <CheckCircle2 size={14} className="text-sky-600" />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-700 text-xs mb-0.5">{f.title}</h5>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4">
                    <h5 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">租賃版本月費</h5>
                    <div className="space-y-1.5">
                      {[['E 版本 (基礎)', 'NT$ 3,200 /月'], ['E+ 版本 (情境模式)', 'NT$ 2,000 /月'], ['EX 版本 (智慧聯網)', 'NT$ 2,500 /月']].map(([k,v],i)=>(
                        <div key={i} className="flex justify-between text-xs border-b border-slate-100 last:border-0 pb-1.5 last:pb-0">
                          <span className="text-slate-600">{k}</span>
                          <span className="font-bold text-slate-800">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => setActiveTab('calculator')} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center text-sm group shadow">
                    前往試算專案利潤 <ChevronRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ════ CALCULATOR ════ */}
          {activeTab === 'calculator' && (
            <div className="p-6 max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">經銷分潤試算引擎</h2>
              <p className="text-slate-500 text-sm mb-6">即時模擬買斷與租賃方案的財務結構，作為談判依據。</p>

              <div className="flex flex-col lg:flex-row gap-5">
                {/* Input */}
                <div className="w-full lg:w-5/12 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                  <div className="flex bg-slate-100 p-1 rounded-xl mb-5">
                    {['buyout','lease'].map(mode => (
                      <button key={mode} onClick={() => handleModeSwitch(mode)}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${calcMode === mode ? 'bg-white shadow border border-slate-200 text-sky-600' : 'text-slate-500'}`}>
                        {mode === 'buyout' ? '設備買斷' : '輕資產租賃'}
                      </button>
                    ))}
                  </div>

                  {!isValid && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-700 px-3 py-2.5 rounded-xl text-xs flex items-center mb-4">
                      <AlertTriangle size={14} className="mr-2 shrink-0" /> 請輸入有效的單價與床數。
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {calcMode === 'buyout' ? '單床買斷零售價 (NT$)' : '單床每月租金 (NT$)'}
                      </label>
                      <input type="number" value={price} onChange={e => setPrice(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xl font-bold text-slate-800 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all" />
                      {calcMode === 'lease' && (
                        <div className="mt-2 flex gap-1.5">
                          {[['3200','E版'],['2000','E+版'],['2500','EX版']].map(([v,l])=>(
                            <button key={v} onClick={() => setPrice(v)} className="px-2 py-1 bg-slate-100 hover:bg-sky-100 hover:text-sky-700 text-slate-600 rounded text-[10px] font-bold transition-colors">{l} ${v}</button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">推廣床數（床）</label>
                        <input type="number" value={beds} onChange={e => setBeds(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xl font-bold text-slate-800 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          加值服務 <span className="bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded text-[9px] font-bold ml-1">100%實拿</span>
                        </label>
                        <input type="number" value={addons} onChange={e => setAddons(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xl font-bold text-slate-800 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all" />
                      </div>
                    </div>

                    {calcMode === 'lease' && (
                      <p className="text-[10px] text-slate-400 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                        ＊ 以下結果均為<strong className="text-slate-600">每月經常性收益</strong>，非一次性金額。
                      </p>
                    )}

                    <button onClick={() => {
                      setActiveTab('notes');
                      setShowNoteForm(true);
                      setNewNote(prev => ({ ...prev, contractTerms: `推廣 ${beds} 床，單價 ${price}。總營收 ${fmt(totalRevenue)}。` }));
                    }}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl transition-colors flex justify-center items-center text-sm border border-slate-200">
                      <ClipboardList size={15} className="mr-2" /> 帶入 CRM 紀錄
                    </button>
                  </div>
                </div>

                {/* Results */}
                <div className="w-full lg:w-7/12 space-y-5">
                  <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg">
                    <div className="absolute -right-16 -top-16 w-56 h-56 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                      <h3 className="text-slate-400 text-xs font-medium mb-2 flex items-center">
                        <Target size={14} className="mr-1.5 text-sky-400" />
                        總通路利潤池 (30%){calcMode === 'lease' ? ' — 每月經常性' : ''}
                      </h3>
                      <div className="text-4xl font-bold mb-1 tracking-tight">{fmt(profitPool)}</div>
                      <p className="text-slate-500 text-xs mb-5">專案總營收：{fmt(totalRevenue)}{periodLabel}</p>

                      <div className="grid grid-cols-2 gap-3 border-t border-slate-800 pt-5">
                        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/50">
                          <p className="text-[10px] text-sky-300 mb-1 font-medium">下線分銷商 (20%)</p>
                          <p className="text-xl font-bold text-sky-300">{fmt(subDistProfit)}</p>
                        </div>
                        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/50">
                          <p className="text-[10px] text-slate-300 mb-1 font-medium">北區總經銷(您) (10%)</p>
                          <p className="text-xl font-bold text-white">{fmt(myProfit)}</p>
                        </div>
                      </div>

                      <div className="mt-4 bg-emerald-900/30 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <p className="text-xs text-emerald-400 font-bold flex items-center"><CircleDollarSign size={14} className="mr-1.5" /> 前線加值服務獎金</p>
                          <p className="text-[10px] text-emerald-400/60 mt-0.5">不計入原廠分潤，100% 獨立實拿</p>
                        </div>
                        <p className="text-xl font-bold text-emerald-400">{fmt(agentBonus)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-4 flex items-center text-sm">
                      <PieChartIcon size={16} className="mr-2 text-sky-500" /> 本金流向結構（不含加值）
                    </h4>
                    {isValid ? (
                      <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={chartData} cx="40%" cy="50%" innerRadius={52} outerRadius={74} paddingAngle={4} dataKey="value" stroke="none">
                              {chartData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                            </Pie>
                            <Tooltip formatter={(v) => v != null ? fmt(v) : '-'} contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,.08)' }} />
                            <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-52 flex flex-col items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                        <PieChartIcon className="text-slate-300 mb-2" size={36} />
                        <p className="text-slate-400 text-sm">請輸入數值以產生圖表</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ CRM NOTES ════ */}
          {activeTab === 'notes' && (
            <div className="p-6 max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 border-b border-slate-200 pb-5">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                    <ClipboardList className="mr-2 text-sky-500" size={24} /> 業務微型 CRM 系統
                  </h2>
                  <p className="text-slate-500 mt-1 text-xs max-w-lg leading-relaxed">紀錄推廣進度、談判籌碼、退傭設定與獨佔條款。資料支援本機端匯出/匯入。</p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <button onClick={handleExport} className="px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors flex items-center text-xs font-bold shadow-sm">
                    <Download size={14} className="mr-1.5" /> 匯出
                  </button>
                  <label className="px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors flex items-center text-xs font-bold shadow-sm cursor-pointer">
                    <Upload size={14} className="mr-1.5" /> 匯入
                    <input type="file" accept=".json" className="hidden" onChange={handleImport} />
                  </label>
                  <button onClick={() => setShowNoteForm(v => !v)} className={`px-4 py-2 text-white rounded-xl transition-all flex items-center text-xs font-bold shadow-md ${showNoteForm ? 'bg-slate-800' : 'bg-sky-500 hover:bg-sky-600 shadow-sky-500/30'}`}>
                    {showNoteForm ? <X size={14} className="mr-1.5" /> : <Plus size={14} className="mr-1.5" />}
                    {showNoteForm ? '取消' : '新增紀錄'}
                  </button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-5">
                <div className="w-full lg:w-3/4">
                  {/* Note form */}
                  {showNoteForm && (
                    <div className="bg-white rounded-3xl p-5 shadow-md border border-sky-100 mb-5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500" />
                      <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center">
                        <FileText size={18} className="mr-2 text-sky-500" /> 建立新談判紀錄
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">客戶/機構名稱 <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <Building size={14} className="absolute left-3 top-3 text-slate-400" />
                            <input type="text" value={newNote.clientName} onChange={e => setNewNote({...newNote, clientName: e.target.value})} placeholder="例：北區長青安養中心" className={inputCls + ' pl-8'} />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">拜訪日期</label>
                          <div className="relative">
                            <Calendar size={14} className="absolute left-3 top-3 text-slate-400" />
                            <input type="date" value={newNote.date} onChange={e => setNewNote({...newNote, date: e.target.value})} className={inputCls + ' pl-8'} />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">業務階段</label>
                          <div className="relative">
                            <Activity size={14} className="absolute left-3 top-3 text-slate-400" />
                            <select value={newNote.stage} onChange={e => setNewNote({...newNote, stage: e.target.value})} className={inputCls + ' pl-8 appearance-none'}>
                              {SALES_STAGES.map(s => <option key={s.value} value={s.value}>{s.value}</option>)}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">退傭/讓利條件</label>
                          <input type="text" value={newNote.commission} onChange={e => setNewNote({...newNote, commission: e.target.value})} placeholder="例：設備讓利 15%" className={inputCls} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">待補件/提供資料</label>
                          <input type="text" value={newNote.requiredDocs} onChange={e => setNewNote({...newNote, requiredDocs: e.target.value})} placeholder="例：NCC 認證報告" className={inputCls} />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">年約條件與獨佔申請</label>
                          <textarea value={newNote.contractTerms} onChange={e => setNewNote({...newNote, contractTerms: e.target.value})} rows="2" placeholder="例：要求北區三間分院獨家代理，年採購 50 床..." className={inputCls + ' resize-none'}></textarea>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">其他備註</label>
                          <textarea value={newNote.extraNotes} onChange={e => setNewNote({...newNote, extraNotes: e.target.value})} rows="2" placeholder="與採購人員討論的細節、競爭者資訊..." className={inputCls + ' resize-none'}></textarea>
                        </div>
                      </div>
                      <div className="flex justify-end pt-3 border-t border-slate-100">
                        <button onClick={handleSaveNote} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center text-sm font-bold shadow-md">
                          <Save size={16} className="mr-2" /> 儲存進入 CRM
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Notes list */}
                  <div className="space-y-4">
                    {notes.length === 0 ? (
                      <div className="text-center py-16 bg-white border-2 border-dashed border-slate-200 rounded-3xl">
                        <ClipboardList size={36} className="text-slate-300 mx-auto mb-3" />
                        <h3 className="text-base font-bold text-slate-600 mb-1">尚無客戶紀錄</h3>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto">點擊「新增紀錄」開始建立，或由右上角匯入歷史 JSON。</p>
                      </div>
                    ) : notes.map(note => {
                      const stageStyle = SALES_STAGES.find(s => s.value === note.stage)?.color || 'bg-slate-100 text-slate-700 border-slate-200';
                      return (
                        <div key={note.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 hover:shadow-md hover:border-sky-200 transition-all relative group">
                          <button onClick={() => handleDeleteNote(note.id)} className="absolute top-5 right-5 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1 rounded" title="刪除">
                            <Trash2 size={16} />
                          </button>
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2 pr-6">
                            <div>
                              <h4 className="font-bold text-lg text-slate-800 mb-1">{note.clientName}</h4>
                              <p className="text-xs text-slate-500 flex items-center"><Calendar size={11} className="mr-1" /> {note.date}</p>
                            </div>
                            <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${stageStyle}`}>{note.stage}</span>
                              {note.commission && <span className="bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-medium max-w-[180px] truncate">💰 {note.commission}</span>}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            {note.requiredDocs && <div><p className="font-bold text-slate-700 text-xs flex items-center mb-1"><FileText size={12} className="mr-1 text-sky-500"/>待補件</p><p className="text-slate-600 text-xs leading-relaxed">{note.requiredDocs}</p></div>}
                            {note.contractTerms && <div><p className="font-bold text-slate-700 text-xs flex items-center mb-1"><Target size={12} className="mr-1 text-orange-500"/>年約/獨佔</p><p className="text-slate-600 text-xs leading-relaxed">{note.contractTerms}</p></div>}
                            {note.extraNotes && <div className="md:col-span-2 pt-2 border-t border-slate-100"><p className="font-bold text-slate-700 text-xs flex items-center mb-1"><ClipboardList size={12} className="mr-1 text-slate-400"/>備註</p><p className="text-slate-600 text-xs leading-relaxed">{note.extraNotes}</p></div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Resources sidebar */}
                <div className="w-full lg:w-1/4">
                  <div className="bg-slate-900 rounded-3xl p-5 text-white shadow-xl">
                    <h3 className="font-bold text-sm mb-3 flex items-center border-b border-slate-800 pb-3">
                      <Briefcase size={16} className="mr-2 text-sky-400" /> 業務推廣資源
                    </h3>
                    <p className="text-[10px] text-slate-400 mb-3">會議中常需提供的官方文件與報價表單。</p>
                    <div className="space-y-2.5">
                      {[
                        { icon: FileSpreadsheet, color: 'text-emerald-400', name: '2026.06 貼牌價格表.xlsx' },
                        { icon: FileSpreadsheet, color: 'text-sky-400',     name: '2026.06 零售價格表 V.3.xlsx' },
                        { icon: ShieldCheck,     color: 'text-purple-400',  name: 'NCC 認證_SL-CWF08P.pdf', sub: 'CCAG26LP0020TO' },
                      ].map((f,i) => (
                        <div key={i} className="bg-slate-800/80 hover:bg-slate-800 p-3 rounded-xl border border-slate-700 transition-colors cursor-pointer group">
                          <div className="flex items-start">
                            <f.icon size={14} className={`${f.color} mr-2 mt-0.5 shrink-0`} />
                            <div>
                              <p className={`text-[10px] font-medium text-slate-300 group-hover:${f.color} transition-colors leading-tight`}>{f.name}</p>
                              {f.sub && <p className="text-[9px] text-slate-500 mt-0.5">{f.sub}</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ DEVICE / PROFILE placeholder ════ */}
          {(activeTab === 'device' || activeTab === 'profile') && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400 p-8">
              <Wrench size={48} className="text-slate-300 mb-4" />
              <h2 className="font-bold text-xl text-slate-600 mb-2">系統模組開發中</h2>
              <p className="text-slate-400 text-center text-sm max-w-sm">
                {activeTab === 'device' ? '機構設備監控大廳' : '個人帳戶與權限設定'}將於下一版本釋出，敬請期待。
              </p>
            </div>
          )}

        </main>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl z-50 flex items-center border border-slate-700"
             style={{ animation: 'fadeIn 0.2s ease' }}>
          <CheckCircle2 size={16} className="text-emerald-400 mr-2.5 shrink-0" />
          <span className="text-sm font-bold">{toast}</span>
        </div>
      )}
    </div>
  );
}
