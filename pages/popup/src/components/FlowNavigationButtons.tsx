type FlowNavigationButtonsProps = {
  back: () => void
  next: () => void
  onFirstPage: boolean
  onLastPage: boolean
}

const FlowNavigationButtons = ({ back, next, onFirstPage, onLastPage }: FlowNavigationButtonsProps) => {
  return (
    <div className="flex flex-row gap-x-2 absolute w-4/5 bottom-1 left-0 right-0 m-auto">
      <button
        className="text-blue-600 font-bold border-2 rounded-md border-blue-600 px-1 py-2 w-full"
        type="submit"
        disabled={onFirstPage}
        onClick={back}>
        Back
      </button>

      <button
        className="text-white bg-blue-600 font-bold border-2 rounded-md border-blue-600 px-1 py-2 w-full"
        type="submit"
        disabled={onLastPage}
        onClick={next}>
        Next
      </button>
    </div>
  )
}

export default FlowNavigationButtons
