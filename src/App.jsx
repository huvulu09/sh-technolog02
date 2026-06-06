import React, { useState } from 'react';
import { 
  BedDouble, 
  Zap, 
  Droplets, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  HeartPulse, 
  CheckCircle2, 
  Settings, 
  MapPin, 
  Sparkles, 
  Activity,
  ChevronRight,
  Calculator,
  X,
  FileText
} from 'lucide-react';

export default function App() {
  // 卡片滑鼠懸停互動狀態
  const [hoveredCard, setHoveredCard] = useState(null); // 'left' | 'right' | null
  // 基礎版床位卡片的標籤切換狀態 (雷達感測, 自動清理, NCC 認證)
  const [activeTab, setActiveTab] = useState('radar'); // 'radar' | 'clean' | 'ncc'
  // 專案利潤試算彈窗狀態
  const [showCalc, setShowCalc] = useState(false);
  // 試算器變數
  const [bedCount, setBedCount] = useState(10);
  const [rentMonths, setRentMonths] = useState(12);
  const [selectedPlan, setSelectedPlan] = useState('ex'); // 'e', 'e_plus', 'ex', 'all'

  // 01-08 功能項目資料
  const items01to08 = [
    {
      id: "01",
      label: "FIRST ITEM",
      title: "核心照護雙模解決方案",
      desc: "雙機一體設計，結合智慧型翻身與全自動排泄處理，徹底解放護理人力。",
      tags: ["AIOT 智慧", "雙機連動"]
    },
    {
      id: "02",
      label: "SECOND ITEM",
      title: "開發目的 - 照護失能",
      desc: "減輕醫護工作強度，降低家庭經濟與社會照護成本，並導入綠色環保 ESG 永續概念。",
      tags: ["醫護雙贏", "ESG 環保"]
    },
    {
      id: "03",
      label: "THIRD ITEM",
      title: "全自動翻身 & 排泄技術",
      desc: "支援左/右翻拍背、抬腿等8種照護情境，以及溫水洗淨、UV殺菌、氣囊助便等多種排泄清理科技。",
      tags: ["8種情境", "UV殺菌"]
    },
    {
      id: "04",
      label: "FOURTH ITEM",
      title: "精密安全生命體徵感測",
      desc: "一機整合非接觸雷達波體態、離床偵測、久臥感應、血氧生命體徵監控等多維安全感知網。",
      tags: ["多維感知", "自動語音預警"]
    },
    {
      id: "05",
      label: "FIFTH ITEM",
      title: "高分子專利科學減壓床墊",
      desc: "特製高分子減壓切割線，分散身體各點受壓面積，促進背部空氣循環，全面消除皮膚摩擦力。",
      tags: ["專利切割線", "空氣循環"]
    },
    {
      id: "06",
      label: "SIXTH ITEM",
      title: "多重臨床醫學場域實證",
      desc: "已於彰化老人之家、大龍養護中心、興隆照顧中心等機構累積超過 40 床長期臨床使用回饋。",
      tags: ["40床實證", "機構首選"]
    },
    {
      id: "07",
      label: "SEVENTH ITEM",
      title: "多項國家級專利與精品肯定",
      desc: "榮獲發明與新型專利、SGS、FDA 及醫療級安規認證。並獲台灣精品獎推薦智慧輔具照顧應用。",
      tags: ["台灣精品", "醫療安全認證"]
    },
    {
      id: "08",
      label: "EIGHTH ITEM",
      title: "ESG 百分百回收未來藍圖",
      desc: "研發採用 100% 可回收與生物降解環保料件，落實綠色低碳採購；並將整合自動拍痰敲擊技術。",
      tags: ["綠色低碳", "震動拍痰"]
    }
  ];

  // 租賃資費定義
  const plans = {
    e: { name: 'E版本 (基礎)', price: 3200, desc: '定時自動翻身、離床久臥安全警報。' },
    e_plus: { name: 'E+版本 (情境)', price: 2000, desc: '8種照護實景快捷情境、自動記憶功能。' },
    ex: { name: 'EX版本 (智慧物聯)', price: 2500, desc: '具備 E+ 完整功能、支援雲端聯網與遠端歷程看板。' },
    all: { name: '雙機全套護理組 (雙機)', price: 9700, desc: '氣墊床 (EX版) + 全自動排泄處理機全套設備。' }
  };

  // 利潤試算邏輯
  const calcRevenue = () => bedCount * plans[selectedPlan].price * rentMonths;
  const calcCost = () => calcRevenue() * 0.35; // 假設營運/維護成本為 35%
  const calcProfit = () => calcRevenue() - calcCost();

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      
      {/* ── 頂部頂級導覽列 ── */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 py-4 px-6 flex justify-between items-center sticky top-0 z-40 transition-all">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-md shadow-blue-500/20">
            碩
          </div>
          <div>
            <span className="text-lg md:text-xl font-black text-blue-900 tracking-tight block">碩享科技 SHUOSHANG</span>
            <span className="text-[10px] text-slate-400 block tracking-widest uppercase font-bold">AIOT Smart Care</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button 
            onClick={() => setShowCalc(true)}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-xs md:text-sm px-4 py-2 rounded-xl border border-blue-200 flex items-center space-x-1.5 transition"
          >
            <Calculator className="w-4 h-4" />
            <span>利潤試算器</span>
          </button>
          <span className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-sm shadow-blue-500/10">
            經銷商後台
          </span>
        </div>
      </nav>

      {/* ── 【第一分區】產品科技與八大核心優勢 ── */}
      <div className="relative">
        {/* 1. 藍色漸層主標題橫幅 */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-blue-800 text-white py-12 px-6 shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]"></div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <span className="bg-blue-500/20 text-blue-300 text-[10px] md:text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-blue-500/30">
              分區一：全方位智慧科技展示
            </span>
            <h1 className="text-2xl md:text-4xl font-black mt-4 mb-3 tracking-tight leading-snug">
              智慧物聯網護理系統之智慧翻身排泄護理組
            </h1>
            <p className="text-xs md:text-sm text-blue-200/90 font-medium max-w-3xl mx-auto leading-relaxed">
              含行動漁業、移動、照顧支持、排泄漁業、四合一物聯資訊
            </p>
          </div>
        </div>

        {/* 2. 八大核心項目卡片 */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">核心照護八大特色項目</h2>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              彙整臨床、技術與永續層面的完整解決方案，全面提升長期照護品質
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items01to08.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-200 group-hover:text-blue-500 font-black text-2xl transition-colors">
                      {item.id}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 group-hover:text-blue-600 transition-colors bg-slate-50 group-hover:bg-blue-50 px-2 py-0.5 rounded">
                      {item.label}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-base mb-2 group-hover:text-blue-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-50 flex flex-wrap gap-1">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 【第二分區】SS-Care 產品型錄與規格配置 ── */}
      <div className="relative border-t border-slate-100">
        {/* 1. 藍色漸層主標題橫幅 */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-indigo-950 text-white py-12 px-6 shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]"></div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <span className="bg-indigo-500/20 text-indigo-300 text-[10px] md:text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-indigo-500/30">
              分區二：核心機型與認證技術
            </span>
            <h1 className="text-2xl md:text-4xl font-black mt-4 mb-3 tracking-tight leading-snug">
              智慧物聯網護理系統之智慧翻身排泄護理組
            </h1>
            <p className="text-xs md:text-sm text-indigo-200/90 font-medium max-w-3xl mx-auto leading-relaxed">
              含行動漁業、移動、照顧支持、排泄漁業、四合一物聯資訊
            </p>
          </div>
        </div>

        {/* 2. SS-Care 旗艦型病床特色配置 (對照 image_014d49.png) */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          
          {/* 原圖中的標題區塊 */}
          <div className="flex items-center space-x-2.5 mb-6">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-blue-900">產品型錄與規格</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                向客戶展示「碩享智慧全效護理床」的核心優勢與 NCC 認證技術。
              </p>
            </div>
          </div>

          {/* 旗艦型智慧病床大卡片 */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* 左側深色調形象展示區 (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#111827] to-[#1f2937] text-white p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
              
              <div>
                <div className="w-16 h-16 bg-blue-600/15 rounded-2xl flex items-center justify-center border border-blue-500/30 mb-8 shadow-inner">
                  <BedDouble className="w-9 h-9 text-blue-400" />
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-1">SS-Care</h3>
                <span className="text-sm text-blue-400 font-bold tracking-wide uppercase block mb-8">
                  AIOT 智慧型翻身排泄護理組
                </span>

                {/* 可切換的詳細說明標籤 */}
                <div className="space-y-3">
                  <button 
                    onClick={() => setActiveTab('radar')}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      activeTab === 'radar' 
                        ? 'bg-blue-600/25 border-blue-500 text-white shadow-md' 
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3 text-xs md:text-sm font-bold">
                      <Zap className={`w-4 h-4 ${activeTab === 'radar' ? 'text-blue-400' : 'text-slate-500'}`} />
                      <span>雷達感測</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => setActiveTab('clean')}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      activeTab === 'clean' 
                        ? 'bg-blue-600/25 border-blue-500 text-white shadow-md' 
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3 text-xs md:text-sm font-bold">
                      <Droplets className={`w-4 h-4 ${activeTab === 'clean' ? 'text-blue-400' : 'text-slate-500'}`} />
                      <span>自動清理</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => setActiveTab('ncc')}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      activeTab === 'ncc' 
                        ? 'bg-blue-600/25 border-blue-500 text-white shadow-md' 
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3 text-xs md:text-sm font-bold">
                      <ShieldCheck className={`w-4 h-4 ${activeTab === 'ncc' ? 'text-blue-400' : 'text-slate-500'}`} />
                      <span>NCC 認證</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 根據 activeTab 顯示不同內容 */}
              <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-300">
                {activeTab === 'radar' && "配置 24GHz 毫米波雷達，全天候非接觸式監控離床、呼吸與體動數據。"}
                {activeTab === 'clean' && "感測器秒級判定排泄產生，微溫水高壓沖洗與三段恆溫低噪熱風烘乾。"}
                {activeTab === 'ncc' && "通過國家通訊傳播委員會 NCC 嚴格射頻與電磁干擾驗證，品質安全合規。"}
              </div>
            </div>

            {/* 右側規格說明與資費 (7 cols) */}
            <div className="lg:col-span-7 p-8 flex flex-col justify-between">
              
              {/* 床墊標題與認證規格 */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <h4 className="text-xl md:text-2xl font-black text-slate-900">
                    SS-Care 旗艦型智慧病床
                  </h4>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-md border border-emerald-200">
                    ESG 綠色材料
                  </span>
                </div>
                
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-6">
                  通過 NCC 認證 (SL-CWF08P)，結合物聯網科技與人體工學高分子床墊，專為長期臥床患者打造。
                </p>

                {/* 特色列表 */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-slate-800 text-xs md:text-sm">8 種智能翻身模式</h5>
                      <p className="text-[11px] text-slate-400">左/右翻拍背、抽痰餵水、抬背餵食、舒活減壓、零壓坐姿等。</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-slate-800 text-xs md:text-sm">全自動排泄處理系統</h5>
                      <p className="text-[11px] text-slate-400">UV 殺菌、溫水沖洗、暖風烘乾，臀部氣囊按摩，無異味產生。</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-slate-800 text-xs md:text-sm">智慧感測警示 + ERP 對接</h5>
                      <p className="text-[11px] text-slate-400">離床/久臥/排泄偵測，符合住宿機構照顧品質獎勵計畫申請資格。</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 租賃版本月費清單 (重現 image_014d49.png 定價) */}
              <div>
                <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                  <h5 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">租賃版本月費</h5>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center text-xs md:text-sm border-b border-slate-200/50 pb-2">
                      <span className="font-bold text-slate-700">E 版本 (基礎)</span>
                      <span className="font-black text-blue-900">NT$ 3,200 / 月</span>
                    </div>
                    <div className="flex justify-between items-center text-xs md:text-sm border-b border-slate-200/50 pb-2">
                      <span className="font-bold text-slate-700">E+ 版本 (情境模式)</span>
                      <span className="font-black text-blue-900">NT$ 2,000 / 月</span>
                    </div>
                    <div className="flex justify-between items-center text-xs md:text-sm">
                      <span className="font-bold text-slate-700">EX 版本 (智慧聯網)</span>
                      <span className="font-black text-blue-900">NT$ 2,500 / 月</span>
                    </div>
                  </div>
                </div>

                {/* 前往試算利潤按鈕 */}
                <button 
                  onClick={() => setShowCalc(true)}
                  className="w-full bg-[#0b1329] hover:bg-slate-800 text-white text-xs md:text-sm font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition"
                >
                  <span>前往試算專案利潤</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ── 【第三分區】各版本與資費詳細說明 ── */}
      <div className="relative border-t border-slate-100">
        {/* 1. 藍色漸層主標題橫幅 */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-indigo-900 text-white py-12 px-6 shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]"></div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <span className="bg-indigo-500/20 text-indigo-300 text-[10px] md:text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-indigo-500/30">
              分區三：各資費規格與長照補貼
            </span>
            <h1 className="text-2xl md:text-4xl font-black mt-4 mb-3 tracking-tight leading-snug">
              智慧物聯網護理系統之智慧翻身排泄護理組
            </h1>
            <p className="text-xs md:text-sm text-indigo-200/90 font-medium max-w-3xl mx-auto leading-relaxed">
              含行動漁業、移動、照顧支持、排泄漁業、四合一物聯資訊
            </p>
          </div>
        </div>

        {/* 2. 資費大卡片對比 */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* E 方案卡片 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-2.5 py-1 rounded-md">基礎單機</span>
                <h4 className="text-lg font-extrabold text-slate-800 mt-2 mb-1">E版本 (基礎版)</h4>
                <p className="text-[11px] text-slate-400 mb-4">使用實體手持操作面板，提供基礎排班定時功能</p>
                <div className="text-2xl font-black text-slate-900 mb-6">NT$ 3,200 <span className="text-xs font-normal text-slate-400">/ 月</span></div>
                <ul className="space-y-3 text-xs text-slate-500">
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />定時自動左右側翻功能</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />配置離床與久臥基本防護警報</li>
                  <li className="text-slate-300 line-through">• 不支援情境模式，需手動微調</li>
                  <li className="text-slate-300 line-through">• 無網卡配備，無遠端監控看板</li>
                </ul>
              </div>
              <button 
                onClick={() => { setSelectedPlan('e'); setShowCalc(true); }}
                className="mt-8 w-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 rounded-xl border border-slate-200 transition"
              >
                選取進行試算
              </button>
            </div>

            {/* E+ 方案卡片 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-md">首選性價比</span>
                <h4 className="text-lg font-extrabold text-slate-800 mt-2 mb-1">E+版本 (情境模式)</h4>
                <p className="text-[11px] text-slate-400 mb-4">具備8種臨床情境，提供自訂翻身角度與定時參數</p>
                <div className="text-2xl font-black text-emerald-600 mb-6">NT$ 2,000 <span className="text-xs font-normal text-slate-400">/ 月</span></div>
                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />自定義設定定時與角度翻身參數</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />一鍵切換8種精選護理情境功能</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />智慧自動記憶，接續中斷動作</li>
                  <li className="text-slate-300 line-through">• 無雲端數據互聯功能</li>
                </ul>
              </div>
              <button 
                onClick={() => { setSelectedPlan('e_plus'); setShowCalc(true); }}
                className="mt-8 w-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 rounded-xl border border-slate-200 transition"
              >
                選取進行試算
              </button>
            </div>

            {/* EX 方案卡片 */}
            <div className="bg-white rounded-3xl p-6 border-2 border-blue-500 shadow-md flex flex-col justify-between relative">
              <span className="absolute -top-3 left-6 bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-md">
                智慧物聯推薦
              </span>
              <div>
                <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-md">雲端物聯</span>
                <h4 className="text-lg font-extrabold text-slate-800 mt-2 mb-1">EX版本 (智慧聯網)</h4>
                <p className="text-[11px] text-slate-400 mb-4">支援大型看板、雲端上傳，提供機構一體化對接</p>
                <div className="text-2xl font-black text-blue-600 mb-6">NT$ 2,500 <span className="text-xs font-normal text-slate-400">/ 月</span></div>
                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-blue-500 mr-2 shrink-0" />保留 E+ 完整大面板與 8 種功能情境</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-blue-500 mr-2 shrink-0" />4G / Wi-Fi 即時傳輸上傳雲端平台</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-blue-500 mr-2 shrink-0" />支援加購擴充高感知雷達與血氧監控</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-blue-500 mr-2 shrink-0" />提供遠端歷史歷程查詢與報表</li>
                </ul>
              </div>
              <button 
                onClick={() => { setSelectedPlan('ex'); setShowCalc(true); }}
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl shadow transition"
              >
                選取進行試算
              </button>
            </div>

          </div>

          {/* 全套護理組大資費方案 */}
          <div className="mt-10 bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    雙機一體旗艦組
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    極致護理支援
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black mt-3">AIOT 智慧型翻身排泄雙機旗艦護理組</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-2xl">
                  全套方案包括：AIOT 智慧型翻身輔支床墊 (EX版) + AIOT 全自動排泄處理機機體各一台。
                  滿足臨床對於呼吸、防褥瘡、自動排泄除臭的極致追求。
                </p>
              </div>
              <div className="text-left md:text-right shrink-0">
                <div className="text-3xl md:text-4xl font-black text-blue-400">NT$ 9,700<span className="text-sm font-normal text-slate-300"> / 月</span></div>
                <p className="text-[10px] text-slate-400 mt-1">* 建議租約至少 6 個月，大量訂購可另議經銷商特別折扣</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── 專案利潤試算器彈窗 (Modal) ── */}
      {showCalc && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* 彈窗標頭 */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 relative">
              <button 
                onClick={() => setShowCalc(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <Calculator className="w-6 h-6 text-blue-300" />
                <h3 className="text-lg font-bold">碩享智慧病床租賃利潤試算</h3>
              </div>
              <p className="text-xs text-blue-200/80 mt-1">
                依據專案建置規模，快速評估月營收與預估毛利。
              </p>
            </div>

            {/* 彈窗內容 */}
            <div className="p-6 space-y-6">
              
              {/* 選擇型號 */}
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                  選擇租賃版本
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(plans).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedPlan(key)}
                      className={`text-left p-3 rounded-xl border text-xs font-bold transition ${
                        selectedPlan === key
                          ? 'border-blue-600 bg-blue-50 text-blue-900'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="block font-black">{plans[key].name}</span>
                      <span className="block text-[10px] text-slate-400 font-normal mt-0.5">
                        NT$ {plans[key].price.toLocaleString()} / 月
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 床位數量 & 租期 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                    預計床位數量 (張)
                  </label>
                  <input 
                    type="number" 
                    value={bedCount}
                    onChange={(e) => setBedCount(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                    租賃合約期 (月)
                  </label>
                  <input 
                    type="number" 
                    value={rentMonths}
                    onChange={(e) => setRentMonths(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* 試算結果 */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>專案總營業額：</span>
                  <span className="font-bold text-slate-800">
                    NT$ {calcRevenue().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>預估維護與折舊成本 (35%)：</span>
                  <span className="font-bold text-slate-800">
                    NT$ {calcCost().toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-sm font-extrabold text-blue-900">經銷商預估淨利潤：</span>
                  <span className="text-xl font-black text-emerald-600">
                    NT$ {calcProfit().toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 leading-relaxed">
                * 註：此試算表僅供評估參考，實際毛利因各區人力成本、配備與特定機構大宗租約條件不同而異，經銷合約細節請洽碩享科技業務代表。
              </div>

            </div>

            {/* 彈窗頁尾 */}
            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowCalc(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition shadow-md shadow-blue-500/10"
              >
                確認關閉
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── 頁尾 ── */}
      <footer className="bg-slate-900 text-slate-500 text-xs py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-white font-black text-base tracking-wide">碩享科技 SHUOSHANG</span>
            <span className="text-slate-600">|</span>
            <span>AIOT 智慧物聯網照護系統</span>
          </div>
          <p>© 2026 碩享科技股份有限公司. All Rights Reserved. 專利與智慧財產權保護</p>
        </div>
      </footer>

    </div>
  );
}
```
`eof`

---

### 💡 專案重構亮點：
1. **藍色漸層主標題橫幅：** 三個主要的分區頂端均已完美整合主標題與副標題：
   * *主標題：* `智慧物聯網護理系統之智慧翻身排泄護理組`
   * *副標題：* `含行動漁業、移動、照顧支持、排泄漁業、四合一物聯資訊`
2. **第一分區（核心技術）：** 完整重現並美化 `01` 到 `08` 核心項目（FIRST ITEM - EIGHTH ITEM），並配置了互動的動態小標籤。
3. **第二分區（型錄與規格卡片）：** 依照 `image_014d49.png` 完美的重構了旗艦卡片，搭配 Lucide 圖示、NCC 規格字樣，以及左側的「雷達感測、自動清理、NCC 認證」動態切換效果。
4. **第三分區（各資費說明與比較）：** 完美包含 E、E+、EX 三種版本的完整資費對比（並遵循 `image_014d49.png` 中的 E: 3200、E+: 2000、EX: 2500，以及雙機組：9700）。
5. **整合利潤試算器 (Calculator)：** 點選「前往試算專案利潤」或「利潤試算器」會開啟互動彈窗，讓經銷商在向客戶簡報時可即時拉動床數進行利潤推算。