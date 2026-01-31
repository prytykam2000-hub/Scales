
import React from 'react';

interface ScoreSummaryProps {
  score: number;
  label: string;
  interpretation?: string;
  loading?: boolean;
  onRefreshInterpretation?: () => void;
}

const ScoreSummary: React.FC<ScoreSummaryProps> = ({ score, label, interpretation, loading, onRefreshInterpretation }) => {
  const getSeverityColor = () => {
    if (label === 'TISS-28') {
      if (score < 20) return 'text-green-600';
      if (score < 30) return 'text-yellow-600';
      return 'text-red-600';
    }
    if (label === 'SOFA' || label === 'qSOFA') {
      if (score < 7 && label === 'SOFA') return 'text-green-600';
      if (score < 12 && label === 'SOFA') return 'text-yellow-600';
      if (label === 'qSOFA') {
        if (score === 0) return 'text-green-600';
        if (score === 1) return 'text-yellow-600';
        return 'text-red-600';
      }
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8 border-t-4 border-blue-600">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-gray-500 uppercase tracking-wider font-semibold text-sm">Загальний бал {label}</h3>
          <div className={`text-6xl font-bold mt-2 ${getSeverityColor()}`}>{score}</div>
        </div>
        
        <div className="flex-1 bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-blue-800 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Клінічний аналіз (ШІ)
            </h4>
            {onRefreshInterpretation && (
              <button 
                onClick={onRefreshInterpretation}
                disabled={loading}
                className="text-xs text-blue-600 hover:underline"
              >
                Оновити аналіз
              </button>
            )}
          </div>
          {loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-blue-200 rounded w-full"></div>
              <div className="h-4 bg-blue-200 rounded w-3/4"></div>
            </div>
          ) : (
            <p className="text-sm text-blue-900 leading-relaxed italic">
              {interpretation || "Змініть параметри, щоб побачити детальний клінічний аналіз."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreSummary;
