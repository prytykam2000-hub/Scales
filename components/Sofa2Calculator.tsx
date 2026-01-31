
import React, { useState, useEffect } from 'react';
import { SOFA2_OPTIONS } from '../constants';
import { Sofa2Inputs } from '../types';
import { getClinicalInterpretation } from '../services/gemini';
import ScoreSummary from './ScoreSummary';

const Sofa2Calculator: React.FC = () => {
  const [inputs, setInputs] = useState<Sofa2Inputs>({
    respiration: 0,
    coagulation: 0,
    liver: 0,
    cardiovascular: 0,
    cns: 0,
    renal: 0,
  });
  const [interpretation, setInterpretation] = useState('');
  const [loading, setLoading] = useState(false);

  const totalScore = (Object.values(inputs) as number[]).reduce((a, b) => a + b, 0);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await getClinicalInterpretation('SOFA 2 (mSOFA)', totalScore, inputs);
    setInterpretation(result || '');
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleAnalyze();
    }, 1500);
    return () => clearTimeout(timer);
  }, [inputs]);

  const setVal = (key: keyof Sofa2Inputs, val: number) => {
    setInputs(prev => ({ ...prev, [key]: val }));
  };

  const systems: { key: keyof Sofa2Inputs; label: string; icon: string }[] = [
    { key: 'respiration', label: 'Дихання (SpO2/FiO2 ratio)', icon: '💨' },
    { key: 'coagulation', label: 'Коагуляція (Тромбоцити)', icon: '💉' },
    { key: 'liver', label: 'Печінка (Білірубін)', icon: '🍺' },
    { key: 'cardiovascular', label: 'Серцево-судинна (АТ/Підтримка)', icon: '💓' },
    { key: 'cns', label: 'ЦНС (Шкала коми Глазго)', icon: '🧠' },
    { key: 'renal', label: 'Нирки (Креатинін/Діурез)', icon: '🧪' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded-r-2xl shadow-sm">
        <h4 className="font-bold text-indigo-900 mb-1 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
          Особливості SOFA 2 (mSOFA)
        </h4>
        <p className="text-sm text-indigo-800 leading-relaxed">
          На відміну від класичної SOFA, тут використовується показник <strong>SpO2/FiO2</strong>. Це дозволяє оцінити стан пацієнта без інвазивного забору крові, що особливо важливо для швидкого моніторингу.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {systems.map(({ key, label, icon }) => (
          <div key={key} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">{icon}</span> {label}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {SOFA2_OPTIONS[key].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setVal(key, opt.value)}
                  className={`p-3 text-sm rounded-xl border-2 transition-all text-left flex flex-col justify-between h-full ${
                    inputs[key] === opt.value
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md transform scale-[1.02]'
                      : 'bg-gray-50 border-transparent text-gray-600 hover:border-gray-200 hover:bg-white'
                  }`}
                >
                  <span className={`font-black mb-1 ${inputs[key] === opt.value ? 'text-indigo-100' : 'text-indigo-600'}`}>
                    Бал {opt.value}
                  </span>
                  <span className="leading-snug">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ScoreSummary 
        score={totalScore} 
        label="SOFA 2" 
        interpretation={interpretation} 
        loading={loading}
        onRefreshInterpretation={handleAnalyze}
      />
    </div>
  );
};

export default Sofa2Calculator;
