import React from 'react';
import { CheckCircle2, Stars } from 'lucide-react';

interface Props {
  name: string;
  affirmation: string;
  onReset: () => void;
}

export const SubmissionResult: React.FC<Props> = ({ name, affirmation, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gradient-to-b from-white to-blue-50/50">
      <div className="mb-6 relative">
        <div className="absolute inset-0 bg-green-200 blur-xl opacity-50 rounded-full"></div>
        <CheckCircle2 className="w-20 h-20 text-green-500 relative z-10" />
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-2">報名成功！</h2>
      <p className="text-slate-600 mb-8 max-w-xs mx-auto">
        我們已收到您的款項確認資訊。課程連結將會在開課前三天寄送至您的信箱。
      </p>

      <div className="w-full bg-white border border-indigo-100 rounded-xl p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"></div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Stars className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold text-indigo-500 tracking-wider uppercase">來自宇宙的祝福</span>
          <Stars className="w-5 h-5 text-amber-400" />
        </div>
        <blockquote className="text-lg text-slate-700 italic font-medium leading-relaxed font-serif">
          "{affirmation}"
        </blockquote>
      </div>

      <div className="mt-10">
        <button
          onClick={onReset}
          className="text-slate-400 hover:text-slate-600 text-sm underline transition-colors"
        >
          為下一位同學報名
        </button>
      </div>
    </div>
  );
};