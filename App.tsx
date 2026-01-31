
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
    <div className="min-h-screen pb-20 bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-blue-50">
                +
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 leading-none tracking-tight">ICU Score Pro</h1>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.2em] mt-1.5">Системи медичної оцінки UA</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 shadow-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                ШІ-Аналіз Gemini Flash 3.0
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-2 -mb-px overflow-x-auto no-scrollbar py-2">
            {[
              { id: 'TISS', label: 'TISS-28', color: 'blue' },
              { id: 'SOFA', label: 'SOFA Classic', color: 'indigo' },
              { id: 'SOFA2', label: 'SOFA 2 (mSOFA)', color: 'violet' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-3 px-6 font-bold text-sm whitespace-nowrap transition-all rounded-xl border-2 ${
                  activeTab === tab.id 
                    ? `border-blue-600 text-blue-600 bg-blue-50 shadow-sm` 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white hover:border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10 text-center md:text-left animate-fadeIn">
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-[10px] font-bold uppercase tracking-widest mb-3">
            {activeTab} МОДУЛЬ
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            {activeTab === 'TISS' && 'Терапевтичні втручання'}
            {activeTab === 'SOFA' && 'Органна недостатність'}
            {activeTab === 'SOFA2' && 'Модифікована оцінка SOFA 2'}
          </h2>
          <p className="text-lg text-gray-500 mt-3 max-w-4xl leading-relaxed">
            {activeTab === 'TISS' && 'Комплексна оцінка інтенсивності лікування. Використовуйте для розрахунку навантаження на персонал та складності випадку.'}
            {activeTab === 'SOFA' && 'Класичний підхід Gold Standard. Вимагає лабораторних даних PaO2 та біохімії крові.'}
            {activeTab === 'SOFA2' && 'Вдосконалений протокол mSOFA. Використовує SpO2/FiO2 для неінвазивної оцінки респіраторної підтримки.'}
          </p>
        </div>

        <div className="relative min-h-[400px]">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 py-3 px-6 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            Медичний асистент • Тільки для фахівців • {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              UA-INTENSIVE-CARE
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
