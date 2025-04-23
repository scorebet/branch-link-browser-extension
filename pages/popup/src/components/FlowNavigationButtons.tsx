import { PopupContext } from '@src/Popup'
import { useContext } from 'react'

type FlowNavigationButtonsProps = {
  back?: () => void
  next?: () => void
  nextTitle?: string
}

const FlowNavigationButtons = ({ back: backOverride, next: nextOverride, nextTitle }: FlowNavigationButtonsProps) => {
  const { flowIndex, setFlowIndex, FLOW } = useContext(PopupContext)

  const onFirstPage = flowIndex === 0
  const onLastPage = flowIndex === Object.keys(FLOW).length - 1

  const next = () => {
    nextOverride?.()
    console.log('setFLowIndex to ', flowIndex + 1)
    setFlowIndex(flowIndex + 1)
  }
  const back = () => {
    backOverride?.()
    setFlowIndex(flowIndex - 1)
  }

  return (
    <div className="flex flex-row gap-x-2 absolute w-4/5 bottom-1 left-0 right-0 m-auto">
      <button
        className="text-gray-800 bg-gray-300 font-bold rounded-md  px-1 py-2 w-full"
        type="submit"
        disabled={onFirstPage}
        onClick={back}>
        Back
      </button>

      <button
        className="text-white bg-brand-green font-bold rounded-md  px-1 py-2 w-full"
        type="submit"
        disabled={onLastPage}
        onClick={next}>
        {nextTitle ?? `Next`}
      </button>
    </div>
  )
}

export default FlowNavigationButtons
