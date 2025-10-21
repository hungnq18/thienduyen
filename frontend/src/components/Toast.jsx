import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-500'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: XCircle,
      iconColor: 'text-red-500'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: AlertCircle,
      iconColor: 'text-yellow-500'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: Info,
      iconColor: 'text-blue-500'
    }
  };

  const style = styles[type] || styles.success;
  const Icon = style.icon;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideIn">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${style.bg} ${style.border} ${style.text} min-w-[300px] max-w-md`}>
        <Icon className={`flex-shrink-0 ${style.iconColor}`} size={24} />
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className={`flex-shrink-0 hover:opacity-70 transition-opacity ${style.iconColor}`}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

