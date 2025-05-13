import type { MarketSelection, SportEvent } from '../../../utils/types'
let marketSelections: MarketSelection[] = []
let eventData: SportEvent[] = []

console.log('content script injected')

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('recieved: ', message)

  if (message.operation === 'BetslipAddMarketSelection') {
    marketSelections.push(message.data)
    setTimeout(() => {
      parseBetslip()
    }, 1000)
  }

  if (message.operation === 'BetslipRemoveMarketSelection') {
    marketSelections = marketSelections.filter(i => i.id !== message.data.id)
    setTimeout(() => {
      parseBetslip()
    }, 1000)
  }

  if (message.operation === 'BetslipClear') {
    marketSelections = []
    setTimeout(() => {
      parseBetslip()
    }, 1000)
  }

  if (message.operation === 'GetMarketSelections') {
    console.log('window.location.href: ', window.location.href)
    parseBetslip()

    return sendResponse({
      eventData,
      marketSelections,
      location: window.location.href,
    })
  }
})

function parseBetslip() {
  const betslipSelectionList = document.getElementsByClassName('betslip-selection-list').item(0)
  const events = betslipSelectionList?.querySelectorAll('[data-testid^="event"]')

  const eventsAndLegs: SportEvent[] = []

  events?.forEach(event => {
    const marketSelectionLink = event.firstChild?.firstChild as HTMLElement
    const marketSelectionEventName = marketSelectionLink
      ?.getElementsByClassName('text-sm text-betslip-primary')
      .item(0)?.innerHTML

    const legElements = (event.firstChild as HTMLElement).getElementsByClassName('text-style-m-medium')
    const legNames = new Set()

    for (let i = 0; i < legElements.length; i++) {
      const leg = legElements[i]
      if (leg.tagName === 'SPAN') {
        legNames.add(leg.innerHTML)
      }
    }

    if (marketSelectionEventName && legNames) {
      eventsAndLegs.push({
        eventName: marketSelectionEventName,
        legs: legNames.values().toArray() as string[],
      })
    }
  })

  eventData = eventsAndLegs
}
