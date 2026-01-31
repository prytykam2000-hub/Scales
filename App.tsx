
import React, { useState } from 'react';
import { TabType } from './types';
import TissCalculator from './components/TissCalculator';
import SofaCalculator from './components/SofaCalculator';
import Sofa2Calculator from './components/Sofa2Calculator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('TISS');

  const renderContent = () => {
    switch (activeTab) {
      case 'TISS': return <TissCalculator />;
      case 'SOFA': return <SofaCalculator />;
      case 'SOFA2': return <Sofa2Calculator />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-slate-50 selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg ring-4 ring-blue-50">
                +
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 leading-none tracking-tight">ICU Score Pro</h1>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.2em] mt-1.5 flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                  Медична аналітика UA
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-2 -mb-px overflow-x-auto no-scrollbar py-2">
            {[
              { id: 'TISS', label: 'TISS-28', desc: 'Терапевтичне навантаження' },
              { id: 'SOFA', label: 'SOFA Classic', desc: 'Органна недостатність' },
              { id: 'SOFA2', label: 'SOFA 2 (mSOFA)', desc: 'Модифікована оцінка' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex flex-col items-start py-3 px-5 min-w-[160px] transition-all rounded-2xl border-2 text-left ${
                  activeTab === tab.id 
                    ? `border-blue-600 bg-blue-50 shadow-sm ring-1 ring-blue-600/10` 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-white hover:border-slate-200'
                }`}
              >
                <span className={`font-black text-sm ${activeTab === tab.id ? 'text-blue-700' : 'text-slate-900'}`}>{tab.label}</span>
                <span className="text-[10px] font-medium opacity-70 mt-0.5">{tab.desc}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-12 animate-fadeIn">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            {activeTab === 'TISS' && 'Терапевтичні втручання'}
            {activeTab === 'SOFA' && 'Органна недостатність (PaO2)'}
            {activeTab === 'SOFA2' && 'Модифікована SOFA 2 (SpO2)'}
          </h2>
          <p className="text-lg text-slate-500 mt-4 max-w-3xl leading-relaxed font-medium">
            {activeTab === 'TISS' && 'Оцінка інтенсивності лікування. Розрахунок навантаження на персонал на основі 28 терапевтичних маніпуляцій.'}
            {activeTab === 'SOFA' && 'Класична шкала Sequential Organ Failure Assessment. Базується на лабораторних показниках газів крові.'}
            {activeTab === 'SOFA2' && 'Вдосконалений протокол mSOFA. Використовує неінвазивну пульсоксиметрію (S/F ratio) для оцінки дихання.'}
          </p>
        </div>

        <div className="relative min-h-[500px]">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 py-4 px-6 z-30 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Професійний інструмент</span>
            <div className="h-4 w-px bg-slate-200"></div>
            <span className="text-[10px] font-bold text-blue-600">v3.1 STABLE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 text-[10px] font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              AI ENGINE: GEMINI 3 FLASH
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

export default App;
