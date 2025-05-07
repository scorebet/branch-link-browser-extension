type ActionButtonProps = {
  onClick: () => void
  children: React.ReactNode
  svg?: React.ReactNode
}

export default function ActionButton({ onClick, svg, children }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-x-2 stroke-slate-500 hover:stroke-brand-green-link hover:bg-brand-background-green w-full py-2">
      {svg}
      {children}
    </button>
  )
}
