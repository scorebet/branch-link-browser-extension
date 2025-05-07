import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

const Popover = ({ children }) => {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const popoverRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
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
