import React, { useState } from 'react';
import { RegistrationData } from '../types';

interface Props {
  onSubmit: (data: RegistrationData) => void;
}

export const RegistrationForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    sex: '',
    birthday: '',
    phone: '',
    note: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    sex: false,
    birthday: false,
    phone: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid =
    formData.name &&
    formData.sex &&
    formData.birthday &&
    formData.phone;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        onSubmit(formData);
      } else {
        alert("提交失敗，請稍後再試");
      }

    } catch (error) {
      alert("伺服器錯誤，請稍後再試");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">學員報名</h2>
      <p className="text-slate-500 mb-8">請填寫以下資訊完成報名。</p>

      <form onSubmit={handleSubmit} className="space-y-6 flex-grow">

        {/* 姓名 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            中文姓名
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            onBlur={() => setTouched({ ...touched, name: true })}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            placeholder="請輸入您的姓名"
          />
          {touched.name && !formData.name && (
            <p className="text-xs text-red-500 mt-1">姓名不能空白</p>
          )}
        </div>

        {/* 性別 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            性別
          </label>
          <select
            value={formData.sex}
            onChange={(e) =>
              setFormData({ ...formData, sex: e.target.value })
            }
            onBlur={() => setTouched({ ...touched, sex: true })}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
          >
            <option value="">請選擇性別</option>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
          {touched.sex && !formData.sex && (
            <p className="text-xs text-red-500 mt-1">請選擇性別</p>
          )}
        </div>

        {/* 生日 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            生日
          </label>
          <input
            type="date"
            value={formData.birthday}
            onChange={(e) =>
              setFormData({ ...formData, birthday: e.target.value })
            }
            onBlur={() => setTouched({ ...touched, birthday: true })}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
          />
          {touched.birthday && !formData.birthday && (
            <p className="text-xs text-red-500 mt-1">請選擇生日</p>
          )}
        </div>

        {/* 電話 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            聯絡電話
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            onBlur={() => setTouched({ ...touched, phone: true })}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            placeholder="09xxxxxxxx"
          />
          {touched.phone && !formData.phone && (
            <p className="text-xs text-red-500 mt-1">電話不能空白</p>
          )}
        </div>

        {/* 備註 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            備註（選填）
          </label>
          <textarea
            value={formData.note}
            onChange={(e) =>
              setFormData({ ...formData, note: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            rows={3}
            placeholder="可輸入其他資訊"
          />
        </div>

        {/* 送出按鈕 */}
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg disabled:bg-slate-300"
        >
          {isSubmitting ? "送出中..." : "確認送出"}
        </button>

      </form>
    </div>
  );
};
