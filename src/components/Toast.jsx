import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, XCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    error: <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-500 flex-shrink-0" />,
  };

  const borderStyles = {
    success: 'border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/95 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200',
    error: 'border-red-200 dark:border-red-800/50 bg-red-50/95 dark:bg-red-950/80 text-red-900 dark:text-red-200',
    warning: 'border-amber-200 dark:border-amber-800/50 bg-amber-50/95 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200',
    info: 'border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/95 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-200',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce-in max-w-md w-full px-4 sm:px-0">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all ${borderStyles[type] || borderStyles.info}`}
      >
        {icons[type] || icons.info}
        <div className="flex-1 text-sm font-medium pr-2">{message}</div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
