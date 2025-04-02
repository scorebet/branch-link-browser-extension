type LocalStorageLink = {
  eventNames: string[]
  link: string
  title: string
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

export type { LocalStorageLink, SportEvent, MarketSelection }
