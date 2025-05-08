import SvgDelete from './SvgDelete'
import SvgEdit from './SvgEdit'

type ActionButtonProps = {
  onClick: () => void
  children: React.ReactNode
  variant?: 'edit' | 'delete'
}

export default function ActionButton({ onClick, variant, children }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-x-2 stroke-slate-500 hover:stroke-brand-green-link hover:bg-brand-background-green w-full py-2">
      {variant === 'edit' ? <SvgEdit /> : <SvgDelete />}
      {children}
    </button>
  )
}
