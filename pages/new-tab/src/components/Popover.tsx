import { useEffect, useRef, useState } from 'react'

const Popover = ({ content, children }) => {
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

  return (
    <div className="relative inline-block">
      <div ref={triggerRef} onClick={() => setOpen(!open)}>
        {children}
      </div>
      {open && (
        <div
          ref={popoverRef}
          className="absolute z-50 w-64 rounded-md border border-gray-200 bg-white p-4 shadow-lg transition-all duration-200 ease-out">
          {content}
        </div>
      )}
    </div>
  )
}

export default Popover
