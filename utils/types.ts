import type { MultiValue, SingleValue } from 'react-select'

type DropdownOption = {
  value: number
  label: string
}

type GenericCampaign = SingleValue<DropdownOption> | undefined

type LocalStorageLink = {
  link: string
  title: string

  tags: MultiValue<DropdownOption> | undefined
  channel: SingleValue<DropdownOption> | undefined
  customerCampaign: GenericCampaign
  campaign: GenericCampaign
  location: string
  marketSelections: MarketSelection[]
  eventData: SportEvent[]
}

type NewLink = Pick<LocalStorageLink, 'title' | 'campaign' | 'tags' | 'customerCampaign' | 'channel'>

type SportEvent = {
  eventName: string
  legs: string[]
}

type MarketSelection = {
  id: string
  numerator: string
  denominator: string
}

export type { LocalStorageLink, GenericCampaign, SportEvent, MarketSelection, DropdownOption, NewLink }
