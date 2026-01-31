
import React, { useState, useEffect } from 'react';
import { SOFA_OPTIONS } from '../constants';
import { SofaInputs } from '../types';
import { getClinicalInterpretation } from '../services/gemini';
import ScoreSummary from './ScoreSummary';

const SofaCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<SofaInputs>({
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
    const result = await getClinicalInterpretation('SOFA (Sequential Organ Failure Assessment)', totalScore, inputs);
    setInterpretation(result || '');
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleAnalyze();
    }, 1500);
    return () => clearTimeout(timer);
  }, [inputs]);

  const setVal = (key: keyof SofaInputs, val: number) => {
    setInputs(prev => ({ ...prev, [key]: val }));
  };

  const systems: { key: keyof SofaInputs; label: string; icon: string }[] = [
    { key: 'respiration', label: 'Дихальна система (PaO2/FiO2)', icon: '🫁' },
    { key: 'coagulation', label: 'Коагуляція (Тромбоцити)', icon: '🩸' },
    { key: 'liver', label: 'Печінка (Білірубін)', icon: '🥃' },
    { key: 'cardiovascular', label: 'Серцево-судинна (АТ/Вазопресори)', icon: '❤️' },
    { key: 'cns', label: 'ЦНС (Шкала коми Глазго)', icon: '🧠' },
    { key: 'renal', label: 'Ниркова система (Креатинін/Діурез)', icon: '💧' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 gap-8">
        {systems.map(({ key, label, icon }) => (
          <div key={key} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">{icon}</span> {label}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {SOFA_OPTIONS[key].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setVal(key, opt.value)}
                  className={`p-3 text-sm rounded-xl border-2 transition-all text-left flex flex-col justify-between h-full ${
                    inputs[key] === opt.value
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md transform scale-[1.02]'
                      : 'bg-gray-50 border-transparent text-gray-600 hover:border-gray-200 hover:bg-white'
                  }`}
                >
                  <span className={`font-black mb-1 ${inputs[key] === opt.value ? 'text-blue-100' : 'text-blue-600'}`}>
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
        label="SOFA" 
        interpretation={interpretation} 
        loading={loading}
        onRefreshInterpretation={handleAnalyze}
      />
    </div>
  );
};

export default SofaCalculator;
