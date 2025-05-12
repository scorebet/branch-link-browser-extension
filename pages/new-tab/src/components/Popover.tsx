import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

const Popover = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const trigger = children.find(child => child.type === Popover.target)
  const content = children.find(child => child.type === Popover.content)

  return (
    <div className="relative inline-block">
      <div ref={triggerRef} onClick={() => setOpen(!open)}>
        {trigger.props.children}
      </div>
      {open && (
        <div
          ref={popoverRef}
          className="absolute z-50 w-64 rounded-md border border-gray-200 bg-white p-4 shadow-lg transition-all duration-200 ease-out">
          {content.props.children}
        </div>
      )}
    </div>
  )
}

Popover.target = ({ children }: { children: ReactNode }) => children
Popover.content = ({ children }: { children: ReactNode }) => children

export default Popover
