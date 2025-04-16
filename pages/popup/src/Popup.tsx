import type { Dispatch, ReactNode, SetStateAction } from 'react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
  setTitle: Dispatch<SetStateAction<string>>
  location: string
  marketSelections: MarketSelection[]
  // eventNames: string[]

  campaign: SingleValue<DropdownOption>
  setCampaign: Dispatch<React.SetStateAction<SingleValue<DropdownOption>>>

  tags: MultiValue<DropdownOption> | null
  setTags: Dispatch<SetStateAction<MultiValue<DropdownOption> | null>>

  channel: SingleValue<DropdownOption>
  setChannel: Dispatch<SetStateAction<SingleValue<DropdownOption>>>

  eventData: SportEvent[]
}

const PopupContext = React.createContext<PopupContextType>({} as PopupContextType)

type GenericFlow<T> = {
  [key: string]: T
}

type Flow = GenericFlow<ReactNode>

const Popup = () => {
  const [title, setTitle] = useState<string>('')
  const [marketSelections, setMarketSelections] = useState<MarketSelection[]>([])
  const [campaign, setCampaign] = useState<SingleValue<DropdownOption>>()
  const [channel, setChannel] = useState<SingleValue<DropdownOption>>({ value: 1, label: 'espn-content' })
  const [tags, setTags] = useState<MultiValue<DropdownOption> | null>(null)
  const [location, setLocation] = useState<string>('')
  const [eventData, setEventData] = useState<SportEvent[]>([])

  const FLOW: Flow = {
    LINK_TITLE: <LinkTitlePage />,
    MARKETING: <MarketingSettingsPage />,
    GENERATE: <GenerateLinkPage />,
  }

  const [flowIndex, setFlowIndex] = useState(0)

  const fetchSelections = useCallback(() => {
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
    console.log('props: ', props)
    const { location, eventData, marketSelections } = props
    setMarketSelections(marketSelections ?? [])
    setLocation(location)
    setEventData(eventData)
  }

  useEffect(() => {
    fetchSelections()
  }, [fetchSelections])

  const CURRENT_FLOW_PAGE = useMemo(() => {
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
    <div className="flex flex-col h-full w-full">
      <div>
        <header className="bg-brand-background-black justify-between items-center flex px-2 py-3 mb-3">
          <div className="flex items-center">
            <img src={chrome.runtime.getURL('popup/logo.svg')} alt="espn bet logo" className="w-6" />
            <h1 className="font-bold text-lg text-white">ESPN Bet Link Creator</h1>
          </div>
          <div>
            <button onClick={openwindow}>
              <img src={chrome.runtime.getURL('popup/home.svg')} className="" alt="betslip" />
            </button>
          </div>
        </header>

        <div className="max-h-screen px-4 py-2">
          <ProgressBar stepCount={Object.keys(FLOW).length} currentStepIndex={flowIndex} />
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
            {isErrorState ? <ErrorPage /> : CURRENT_FLOW_PAGE}
          </PopupContext.Provider>
        </div>
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
