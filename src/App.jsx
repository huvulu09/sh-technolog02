import React, { useState } from 'react';

// --- 純淨 SVG 圖示 ---
const IconChevronDown = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>;
const IconCheckCircle = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const IconActivity = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
const IconWind = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path><path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path><path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path></svg>;
const IconDroplet = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg>;
const IconShield = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const IconAward = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>;
const IconBuilding = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>;

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState('core');
  const [activeScenario, setActiveScenario] = useState('左翻拍背');

  const scenarios = ['左翻拍背', '右翻拍背', '抽痰餵水', '抬背餵食', '舒活減壓', '尿布更換', '抬腿修甲', '零壓坐姿'];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans">
      
      {/* Header */}
      <header className="mb-6 border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          AIOT 智慧型翻身排泄護理組
        </h1>
        <p className="text-slate-400 text-sm mt-1">智慧聯網照護系統 (FMY-CF02 + SL-BBA00M)</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-140px)]">
        
        {/* 左側：3D 視覺展演區 (模擬) */}
        <div className="lg:col-span-7 bg-slate-800/30 rounded-2xl border border-slate-700 overflow-hidden relative group">
          {/* 未來替換為 Three.js Canvas */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 z-10 flex flex-col justify-end p-8">
            <h3 className="text-3xl font-black text-white drop-shadow-md mb-2">
              當前演示：{activeScenario}
            </h3>
            <p className="text-emerald-400 font-medium">高分子床墊減壓作動中 | 氣流循環開啟</p>
          </div>
          
          {/* 模擬 3D 床體影像 (此處使用 CSS 漸層與幾何圖形模擬科技感) */}
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900 flex items-center justify-center">
            <div className="relative w-3/4 h-1/2 perspective-[1000px]">
                {/* 模擬床墊 */}
                <div className={`w-full h-full bg-slate-800/80 rounded-xl border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.2)] transform transition-transform duration-1000 ${
                  activeScenario.includes('左翻') ? 'rotate-y-12 translate-x-4' : 
                  activeScenario.includes('右翻') ? '-rotate-y-12 -translate-x-4' : 
                  activeScenario.includes('抬腿') ? 'rotate-x-12 translate-y-4' : 
                  'rotate-x-12 rotate-y-6'
                }`}>
                   <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-xl"></div>
                   {/* 減壓切割線網格模擬 */}
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] rounded-xl opacity-30"></div>
                </div>
                {/* 浮水印/狀態 */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <span className="flex items-center px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full border border-emerald-500/30">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2"></span>系統連線中
                    </span>
                </div>
            </div>
          </div>
        </div>

        {/* 右側：劇本式銷售儀表板 */}
        <div className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          
          {/* 導航 Tabs */}
          <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-xl">
            {['core', 'policy', 'trust'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                {tab === 'core' && '核心科技'}
                {tab === 'policy' && '政策對接'}
                {tab === 'trust' && '權威實績'}
              </button>
            ))}
          </div>

          {/* 內容區塊 */}
          <div className="flex-1">
            
            {/* Tab: 核心科技 */}
            {activeTab === 'core' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700">
                  <h3 className="text-blue-400 font-bold mb-3 flex items-center"><IconActivity className="w-5 h-5 mr-2"/> 8 種獨家照護情境</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {scenarios.map(s => (
                      <button 
                        key={s}
                        onClick={() => setActiveScenario(s)}
                        className={`text-left px-3 py-2 rounded-lg text-sm border transition-all ${
                          activeScenario === s 
                            ? 'bg-blue-500/20 border-blue-500 text-blue-200' 
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-3">* 具備記憶功能，切換回自動時無縫接續上一動作。</p>
                </div>

                <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700">
                  <h3 className="text-purple-400 font-bold mb-3 flex items-center"><IconDroplet className="w-5 h-5 mr-2"/> 全自動排泄處理機連動</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start"><IconCheckCircle className="w-4 h-4 text-purple-400 mr-2 mt-0.5 shrink-0"/>自動感應污物 → 抽吸 → 溫水清潔 → 暖風烘乾</li>
                    <li className="flex items-start"><IconCheckCircle className="w-4 h-4 text-purple-400 mr-2 mt-0.5 shrink-0"/>內建 UV 殺菌與除臭盒，病房無異味</li>
                    <li className="flex items-start"><IconCheckCircle className="w-4 h-4 text-purple-400 mr-2 mt-0.5 shrink-0"/>超大 8L 污物桶，免去護理人員頻繁清理</li>
                    <li className="flex items-start"><IconCheckCircle className="w-4 h-4 text-purple-400 mr-2 mt-0.5 shrink-0"/>氣壓按摩功能，降低患者異物感</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab: 政策對接 */}
            {activeTab === 'policy' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="bg-emerald-900/20 p-5 rounded-2xl border border-emerald-500/30">
                  <h3 className="text-emerald-400 font-bold mb-2">指標 4 - 智慧輔助照顧科技應用</h3>
                  <p className="text-sm text-slate-300 mb-4">全面符合住宿機構照顧品質獎勵計畫，協助機構爭取最高補助。</p>
                  
                  <div className="space-y-3">
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <div className="text-emerald-300 font-medium text-sm mb-1">4.1 行動感知智慧輔助</div>
                      <p className="text-xs text-slate-400">具備離床、久臥警示，自動發出提醒語音 (遠端監控)。</p>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <div className="text-emerald-300 font-medium text-sm mb-1">4.2 移動支援智慧輔助</div>
                      <p className="text-xs text-slate-400">全方位自動翻身，自由設定參數，增加空氣流通消剪切力。</p>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <div className="text-emerald-300 font-medium text-sm mb-1">4.3 照護支援智慧輔助</div>
                      <p className="text-xs text-slate-400">可擴充雷達波、血氧、溫溼度偵測，數據直達 ERP。</p>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <div className="text-emerald-300 font-medium text-sm mb-1">4.4 排泄支援智慧輔助</div>
                      <p className="text-xs text-slate-400">大小便自動偵測清潔，並自動記錄患者排泄狀況。</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: 權威實績 */}
            {activeTab === 'trust' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* 實績 */}
                <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700">
                  <h3 className="text-blue-400 font-bold mb-3 flex items-center"><IconBuilding className="w-5 h-5 mr-2"/> 臨床場域實績</h3>
                  <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl">
                    <div>
                      <div className="text-lg font-bold text-white">彰化老人之家</div>
                      <div className="text-sm text-slate-400">114年9月起長期驗證</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-blue-400">40+ 床</div>
                      <div className="text-xs text-slate-500">買賣及捐贈啟用中</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-center">其他合作：基督教醫院、大龍養護中心、佳醫、樂福等</p>
                </div>

                {/* 認證免死金牌 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 flex flex-col items-center text-center group cursor-pointer hover:bg-slate-700/50 transition-colors">
                    <IconShield className="w-8 h-8 text-rose-400 mb-2 group-hover:scale-110 transition-transform"/>
                    <div className="text-sm font-bold text-slate-200">衛福部 FDA 函</div>
                    <div className="text-xs text-slate-400 mt-1">不以醫療器材列管</div>
                    <div className="text-[10px] text-blue-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">點擊檢視正本</div>
                  </div>
                  <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 flex flex-col items-center text-center group cursor-pointer hover:bg-slate-700/50 transition-colors">
                    <IconActivity className="w-8 h-8 text-emerald-400 mb-2 group-hover:scale-110 transition-transform"/>
                    <div className="text-sm font-bold text-slate-200">NCC 射頻認證</div>
                    <div className="text-xs text-slate-400 mt-1">SL-CWF08P</div>
                    <div className="text-[10px] text-blue-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">點擊檢視正本</div>
                  </div>
                  <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 flex flex-col items-center text-center col-span-2">
                    <IconAward className="w-6 h-6 text-yellow-400 mb-2"/>
                    <div className="text-sm font-bold text-slate-200">多項專利與 SGS 認證、台灣精品獎</div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}} />
    </div>
  );
}