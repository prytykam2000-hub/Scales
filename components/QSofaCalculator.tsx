
import React, { useState, useEffect } from 'react';
import { QSofaInputs } from '../types';
import { getClinicalInterpretation } from '../services/gemini';
import ScoreSummary from './ScoreSummary';

const QSofaCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<QSofaInputs>({
    respiratoryRate: false,
    alteredMentality: false,
    systolicBP: false,
  });
  const [interpretation, setInterpretation] = useState('');
  const [loading, setLoading] = useState(false);

  const totalScore = (inputs.respiratoryRate ? 1 : 0) + 
                    (inputs.alteredMentality ? 1 : 0) + 
                    (inputs.systolicBP ? 1 : 0);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await getClinicalInterpretation('qSOFA (Quick SOFA)', totalScore, inputs);
    setInterpretation(result || '');
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleAnalyze();
    }, 1500);
    return () => clearTimeout(timer);
  }, [inputs]);

  const toggle = (key: keyof QSofaInputs) => {
    setInputs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-blue-600 p-4 text-white">
          <h3 className="font-bold text-lg">Критерії qSOFA</h3>
          <p className="text-blue-100 text-xs mt-1">Швидка оцінка ризику сепсису поза межами ВІТ</p>
        </div>
        
        <div className="divide-y divide-gray-100">
          <div 
            onClick={() => toggle('respiratoryRate')}
            className={`p-6 flex items-center justify-between cursor-pointer transition-colors ${inputs.respiratoryRate ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
          >
            <div>
              <h4 className="font-bold text-gray-800">Тахіпное</h4>
              <p className="text-sm text-gray-500">Частота дихання ≥ 22 /хв</p>
            </div>
            <div className={`w-12 h-6 rounded-full transition-colors relative ${inputs.respiratoryRate ? 'bg-blue-600' : 'bg-gray-300'}`}>
               <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${inputs.respiratoryRate ? 'left-7' : 'left-1'}`}></div>
            </div>
          </div>

          <div 
            onClick={() => toggle('alteredMentality')}
            className={`p-6 flex items-center justify-between cursor-pointer transition-colors ${inputs.alteredMentality ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
          >
            <div>
              <h4 className="font-bold text-gray-800">Змінений ментальний статус</h4>
              <p className="text-sm text-gray-500">ШКГ &lt; 15</p>
            </div>
            <div className={`w-12 h-6 rounded-full transition-colors relative ${inputs.alteredMentality ? 'bg-blue-600' : 'bg-gray-300'}`}>
               <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${inputs.alteredMentality ? 'left-7' : 'left-1'}`}></div>
            </div>
          </div>

          <div 
            onClick={() => toggle('systolicBP')}
            className={`p-6 flex items-center justify-between cursor-pointer transition-colors ${inputs.systolicBP ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
          >
            <div>
              <h4 className="font-bold text-gray-800">Гіпотензія</h4>
              <p className="text-sm text-gray-500">Систолічний АТ ≤ 100 мм рт.ст.</p>
            </div>
            <div className={`w-12 h-6 rounded-full transition-colors relative ${inputs.systolicBP ? 'bg-blue-600' : 'bg-gray-300'}`}>
               <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${inputs.systolicBP ? 'left-7' : 'left-1'}`}></div>
            </div>
          </div>
        </div>
      </div>

      <ScoreSummary 
        score={totalScore} 
        label="qSOFA" 
        interpretation={interpretation} 
        loading={loading}
        onRefreshInterpretation={handleAnalyze}
      />
    </div>
  );
};

export default QSofaCalculator;
