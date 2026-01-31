
import React, { useState, useEffect } from 'react';
import { TISS_ITEMS } from '../constants';
import { getClinicalInterpretation } from '../services/gemini';
import ScoreSummary from './ScoreSummary';

const TissCalculator: React.FC = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [interpretation, setInterpretation] = useState('');
  const [loading, setLoading] = useState(false);

  const totalScore = TISS_ITEMS
    .filter(item => selected.has(item.id))
    .reduce((sum, item) => sum + item.points, 0);

  const toggleItem = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const handleAnalyze = async () => {
    if (totalScore === 0) return;
    setLoading(true);
    const details = TISS_ITEMS.filter(i => selected.has(i.id)).map(i => `${i.label} (${i.description})`);
    const result = await getClinicalInterpretation('TISS-28', totalScore, details);
    setInterpretation(result || '');
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (totalScore > 0) handleAnalyze();
    }, 1500);
    return () => clearTimeout(timer);
  }, [selected]);

  const categories = Array.from(new Set(TISS_ITEMS.map(i => i.category)));

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div key={cat} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <h3 className="font-black text-gray-800 mb-4 pb-2 border-b-2 border-blue-100 flex items-center justify-between">
              {cat}
              <span className="text-[10px] text-blue-400 font-normal uppercase tracking-widest">Категорія</span>
            </h3>
            <div className="space-y-4">
              {TISS_ITEMS.filter(i => i.category === cat).map(item => (
                <div 
                  key={item.id} 
                  onClick={() => toggleItem(item.id)}
                  className={`flex items-start gap-4 p-3 rounded-xl transition-all cursor-pointer border-2 ${
                    selected.has(item.id) 
                      ? 'bg-blue-50 border-blue-400 shadow-sm' 
                      : 'bg-gray-50/50 border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                    selected.has(item.id) ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'
                  }`}>
                    {selected.has(item.id) && (
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-sm font-bold text-gray-800 leading-tight">{item.label}</span>
                      <span className="text-xs font-black text-blue-600 shrink-0">+{item.points}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ScoreSummary 
        score={totalScore} 
        label="TISS-28" 
        interpretation={interpretation} 
        loading={loading}
        onRefreshInterpretation={handleAnalyze}
      />
    </div>
  );
};

export default TissCalculator;
