import { useEffect } from 'react'

type ToastProps = {
  message: string
  type?: string
  duration?: number
  onClose: () => void
}

const Toast = ({ message, type = 'info', duration = 3000, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const baseStyles =
    'fixed bottom-6 right-1/2 left-1/2 px-4 py-3 rounded-md text-white shadow-lg z-50 transition-all animate-fadeIn w-72 text-center font-bold'
  const typeStyles = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500 text-black',
  }

  return <div className={`${baseStyles} ${typeStyles[type] || typeStyles.info}`}>{message}</div>
}

export default Toast
