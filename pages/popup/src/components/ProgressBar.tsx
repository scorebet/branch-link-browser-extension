import React from 'react'

const ProgressBar = ({ stepCount, currentStepIndex }) => {
  const arr = new Array(stepCount).fill(0)
  return (
    <div className="flex flex-row gap-3 ">
      {arr.map((_i, idx) => {
        if (idx === currentStepIndex) {
          return <div key={idx} className="bg-blue-600 h-1 w-full"></div>
        }
        return <div key={idx} className="bg-gray-400 h-1 w-full"></div>
      })}
    </div>
  )
}

export default ProgressBar
