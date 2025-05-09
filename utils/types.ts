import type { MultiValue, SingleValue } from 'react-select'

type DropdownOption = {
  value: number
  label: string
}

type LocalStorageLink = {
  // eventNames: string[]
  link: string
  title: string

  tags: MultiValue<DropdownOption> | null
  channel: SingleValue<DropdownOption>
  customerCampaign: SingleValue<DropdownOption>
  campaign: SingleValue<DropdownOption>
  location: string
  marketSelections: MarketSelection[]
  eventData: SportEvent[]
}

type SportEvent = {
  eventName: string
  legs: string[]
}

type MarketSelection = {
  id: string
  numerator: string
  denominator: string
}

export type { LocalStorageLink, SportEvent, MarketSelection, DropdownOption }
