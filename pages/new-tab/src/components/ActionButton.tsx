import SvgDelete from './SvgDelete'
import SvgEdit from './SvgEdit'

type Variant = 'edit' | 'delete'

type ActionButtonProps = {
  onClick: () => void
  children: React.ReactNode
  variant?: Variant
}

const ActionButtonIcon = ({ variant }: { variant: Variant }) => {
  switch (variant) {
    case 'edit':
      return <SvgEdit />
    case 'delete':
      return <SvgDelete />
    default:
      return null
  }
}

export default function ActionButton({ onClick, variant, children }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-x-2 stroke-slate-500 hover:stroke-brand-green-link hover:bg-brand-background-green w-full py-2">
      <ActionButtonIcon variant={variant!} />
      {children}
    </button>
  )
}
