import React from 'react';
import { Calendar, Clock, CreditCard, Landmark, MapPin } from 'lucide-react';

export const CourseDetails: React.FC = () => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white h-full flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-8 bg-indigo-500 rounded-full block"></span>
          課程資訊
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl">
            <Calendar className="w-6 h-6 text-indigo-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-indigo-900 uppercase tracking-wider">開課日期</h3>
              <p className="text-lg text-slate-700 font-medium">2025年 12月 18日 (週四)</p>
              <div className="mt-2 p-2 bg-white/60 rounded border border-blue-100">
                <p className="text-xs font-bold text-indigo-800 mb-1">暫定上課日期：</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  1/15，1/29，2/5，2/12，2/26
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl">
            <Clock className="w-6 h-6 text-indigo-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-indigo-900 uppercase tracking-wider">上課時間</h3>
              <p className="text-lg text-slate-700 font-medium">每週四 19:40 - 22:10</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl">
            <MapPin className="w-6 h-6 text-indigo-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-indigo-900 uppercase tracking-wider">上課方式</h3>
              <p className="text-lg text-slate-700 font-medium">Zoom 線上直播</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100">
            <CreditCard className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-amber-900 uppercase tracking-wider">課程學費</h3>
              <p className="text-2xl text-amber-600 font-bold">NT$ 9,100 <span className="text-sm font-normal text-amber-700">/ 一期 (13堂)</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-100">
        <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
           <Landmark className="w-5 h-5 text-slate-500" />
           匯款資訊
        </h2>
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <div className="text-slate-500">銀行代碼</div>
            <div className="font-mono font-medium text-slate-700">017 (兆豐國際商業銀行-南台中分行)</div>
            
            <div className="text-slate-500">銀行帳號</div>
            <div className="font-mono font-bold text-lg text-slate-800 tracking-wider">044-10-433269</div>
            
          </div>
          <p className="mt-4 text-xs text-slate-400">
            * 請先完成匯款後，再填寫下方報名表單。
          </p>
        </div>
      </div>
    </div>
  );
};