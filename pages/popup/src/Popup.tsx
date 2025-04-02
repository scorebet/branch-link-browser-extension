import type { ReactNode } from 'react'
import React from 'react'
import './Popup.css'

import GenerateLinkPage from './Pages/GenerateLinkPage'
import LinkTitlePage from './Pages/LinkTitlePage'

import type { MultiValue, SingleValue } from 'react-select'
import ErrorPage from './Pages/ErrorPage'
import MarketingSettingsPage from './Pages/MarketingSettingsPage'
import FlowNavigationButtons from './components/FlowNavigationButtons'
import ProgressBar from './components/ProgressBar'
import type { SportEvent } from '../../utils/types'

type MarketSelection = {
  id: string
  numerator: number
  denominator: number
}

type DropdownOption = {
  value: number
  label: string
}

type PopupContextType = {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  location: string
  marketSelections: MarketSelection[]
  // eventNames: string[]

  campaign: SingleValue<DropdownOption>
  setCampaign: React.Dispatch<React.SetStateAction<SingleValue<DropdownOption>>>

  tags: MultiValue<DropdownOption> | null
  setTags: React.Dispatch<React.SetStateAction<MultiValue<DropdownOption> | null>>

  eventData: SportEvent[]
}

const PopupContext = React.createContext<PopupContextType>({} as PopupContextType)

type GenericFlow<T> = {
  [key: string]: T
}

type Flow = GenericFlow<ReactNode>

const Popup = () => {
  const [title, setTitle] = React.useState<string>('')
  const [marketSelections, setMarketSelections] = React.useState<MarketSelection[]>([])
  const [campaign, setCampaign] = React.useState<SingleValue<DropdownOption>>({} as SingleValue<DropdownOption>)
  const [tags, setTags] = React.useState<MultiValue<DropdownOption> | null>(null)
  const [location, setLocation] = React.useState<string>('')
  const [eventData, setEventData] = React.useState<SportEvent[]>([])

  const FLOW: Flow = {
    LINK_TITLE: <LinkTitlePage />,
    MARKETING: <MarketingSettingsPage />,
    GENERATE: <GenerateLinkPage />,
  }

  const [flowIndex, setFlowIndex] = React.useState(0)

  const fetchSelections = React.useCallback(() => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      tabs => {
        if (tabs[0] && tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, { operation: 'GetMarketSelections' }, receieveMarketSelections)
        }
      },
    )
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const receieveMarketSelections = (props: any) => {
    const { location, eventData, marketSelections } = props
    setMarketSelections(marketSelections ?? [])
    setLocation(location)
    setEventData(eventData)
  }

  React.useEffect(() => {
    fetchSelections()
  }, [fetchSelections])

  const CURRENT_FLOW_PAGE = React.useMemo(() => {
    const CURRENT_FLOW_KEY = Object.keys(FLOW)[flowIndex]
    return FLOW[CURRENT_FLOW_KEY]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowIndex, marketSelections, eventData])

  const onFirstPage = flowIndex === 0
  const onLastPage = flowIndex === Object.keys(FLOW).length - 1

  const totalLegs = eventData.reduce((total: number, event: SportEvent) => total + event.legs.length, 0)
  const isErrorState = totalLegs !== marketSelections.length

  const openwindow = () => {
    chrome.tabs.create({
      url: 'new-tab/index.html',
    })
  }

  return (
    <div className="flex flex-col h-full w-full py-6 px-4">
      <div>
        <header className="flex flex-col">
          <button onClick={openwindow}>
            <img src={chrome.runtime.getURL('popup/home.svg')} className="" alt="betslip" />
          </button>
          <h1 className="font-bold text-lg mb-4">Branch Link Generator</h1>
          <ProgressBar stepCount={Object.keys(FLOW).length} currentStepIndex={flowIndex} />
        </header>

        <PopupContext.Provider
          value={{
            marketSelections,
            eventData,
            campaign,
            setCampaign,
            tags,
            setTags,
            location,
            title,
            setTitle,
          }}>
          <div className="max-h-screen">{isErrorState ? <ErrorPage /> : CURRENT_FLOW_PAGE}</div>
        </PopupContext.Provider>
      </div>

      <FlowNavigationButtons
        onFirstPage={onFirstPage}
        onLastPage={onLastPage}
        back={() => setFlowIndex(flowIndex - 1)}
        next={() => setFlowIndex(flowIndex + 1)}
      />
    </div>
  )
}

export default Popup

export { PopupContext }
