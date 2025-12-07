import React from 'react';

interface Props {
  name: string;
  onReset: () => void;
}

export const SubmissionResult: React.FC<Props> = ({ name, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-12 text-center space-y-6">
      <div className="text-4xl">🎉</div>

      <h2 className="text-2xl font-semibold text-slate-800">
        報名成功，感謝填寫！
      </h2>

      <p className="text-slate-600 text-lg">
        {name} 您的報名資料已成功送出，我們會再與您聯繫。
      </p>

      <button
        onClick={onReset}
        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        返回填寫
      </button>
    </div>
  );
};