/** eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react'

const Dropdown = ({ options, selectedOptions, onSelect, selected }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(prev => !prev)
  }

  // Handle option selection/deselection
  const handleOptionToggle = option => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(item => item !== option) // Deselect if already selected
      : [...selectedOptions, option] // Select if not selected
    onSelect(newSelectedOptions)
  }

  return (
    <div className="relative inline-block text-left w-36 max-w-36 h-6 max-h-6">
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-700">
        {selectedOptions.length > 0 ? `Selected: ${selectedOptions.join(', ')}` : 'Select Options'}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 left-0 mx-auto mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-10">
          <ul className="py-1">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionToggle(option)}
                className={`block px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer ${
                  selectedOptions.includes(option) ? 'bg-blue-200' : ''
                }`}>
                <input type="checkbox" checked={selectedOptions.includes(option)} readOnly className="mr-2" />
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Dropdown
