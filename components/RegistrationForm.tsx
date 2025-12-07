import React, { useState } from 'react';
import { RegistrationData } from '../types';
import { ArrowRight, Check } from 'lucide-react';

interface Props {
  onSubmit: (data: RegistrationData) => void;
}

export const RegistrationForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [transferLast5, setTransferLast5] = useState('');
  const [touched, setTouched] = useState({ name: false, transferLast5: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && transferLast5.length === 5) {
      onSubmit({ name, transferLast5 });
    } else {
        setTouched({ name: true, transferLast5: true });
    }
  };

  const isLast5Valid = transferLast5.length === 5 && /^\d+$/.test(transferLast5);

  return (
    <div className="p-8 h-full flex flex-col">
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">學員報名</h2>
      <p className="text-slate-500 mb-8">請在轉帳完成後填寫以下資訊以核對您的款項。</p>

      <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            中文姓名
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched({ ...touched, name: true })}
            placeholder="請輸入您的真實姓名"
            className={`w-full px-4 py-3 rounded-lg border ${
              touched.name && !name ? 'border-red-300 ring-red-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
            } focus:ring-4 transition-all outline-none bg-slate-50 focus:bg-white`}
          />
          {touched.name && !name && (
            <p className="mt-1 text-xs text-red-500">請輸入姓名</p>
          )}
        </div>

        <div>
          <label htmlFor="transferLast5" className="block text-sm font-medium text-slate-700 mb-1">
            帳號後五碼
          </label>
          <div className="relative">
            <input
              type="text"
              id="transferLast5"
              maxLength={5}
              value={transferLast5}
              onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setTransferLast5(val);
              }}
              onBlur={() => setTouched({ ...touched, transferLast5: true })}
              placeholder="12345"
              className={`w-full px-4 py-3 rounded-lg border font-mono tracking-widest ${
                touched.transferLast5 && !isLast5Valid 
                ? 'border-red-300 ring-red-200' 
                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200'
              } focus:ring-4 transition-all outline-none bg-slate-50 focus:bg-white`}
            />
            {isLast5Valid && (
                <div className="absolute right-3 top-3.5 text-green-500">
                    <Check size={20} />
                </div>
            )}
          </div>
          <p className="mt-2 text-xs text-slate-500">
            請輸入您轉帳卡片或存摺的後五碼數字。
          </p>
          {touched.transferLast5 && !isLast5Valid && (
            <p className="mt-1 text-xs text-red-500">請輸入完整的 5 碼數字</p>
          )}
        </div>

        <div className="pt-4 mt-auto">
          <button
            type="submit"
            disabled={!name || !isLast5Valid}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            確認送出
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};