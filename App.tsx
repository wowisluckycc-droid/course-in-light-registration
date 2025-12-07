import React, { useState } from 'react';
import { CourseDetails } from './components/CourseDetails';
import { RegistrationForm } from './components/RegistrationForm';
import { SubmissionResult } from './components/SubmissionResult';
import { generateAffirmation } from './services/geminiService';
import { Sparkles, Loader2 } from 'lucide-react';
import { RegistrationData, SubmissionStatus } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [affirmation, setAffirmation] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');

  const handleRegistration = async (data: RegistrationData) => {
    setStatus('submitting');
    setStudentName(data.name);

    try {
      // Simulate API call to save registration data to a database
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate a spiritual affirmation using Gemini
      const aiResponse = await generateAffirmation(data.name);
      setAffirmation(aiResponse);
      setStatus('success');
    } catch (error) {
      console.error("Registration failed", error);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setAffirmation('');
    setStudentName('');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-md mb-4">
            <Sparkles className="h-8 w-8 text-indigo-500" />
          </div>
          <h1 className="text-4xl font-light tracking-tight text-slate-900 sm:text-5xl">
            光的課程 <span className="font-semibold text-indigo-600">行星一</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            請填寫下方資訊完成報名
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          {/* Left Column: Course Info */}
          <div className="h-full">
            <CourseDetails />
          </div>

          {/* Right Column: Form or Result */}
          <div className="h-full">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full border border-slate-100 relative">
              {status === 'idle' && (
                <RegistrationForm onSubmit={handleRegistration} />
              )}

              {status === 'submitting' && (
                <div className="flex flex-col items-center justify-center h-full p-12 space-y-4 min-h-[400px]">
                  <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
                  <p className="text-slate-600 font-medium animate-pulse">
                    正在確認您的報名資訊...
                  </p>
                </div>
              )}

              {status === 'success' && (
                <SubmissionResult 
                  name={studentName} 
                  affirmation={affirmation} 
                  onReset={handleReset} 
                />
              )}

              {status === 'error' && (
                <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                  <div className="bg-red-50 p-4 rounded-full mb-4">
                    <span className="text-3xl">⚠️</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">發生錯誤</h3>
                  <p className="text-slate-600 mb-6">
                    抱歉，報名過程中發生問題。請稍後再試，或直接在群組詢問。
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors"
                  >
                    重試
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <footer className="mt-16 text-center text-slate-400 text-sm">
          <p>© 2025 拉維拉. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;