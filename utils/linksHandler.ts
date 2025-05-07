import type { MultiValue, SingleValue } from 'react-select'
import type { DropdownOption, LocalStorageLink, MarketSelection, SportEvent } from './types'

type GenericEnvironmentMapping<T> = {
  [key: string]: T
}

type EnvironmentMapping = GenericEnvironmentMapping<string>

const ENVIRONMENT_MAPPINGS: EnvironmentMapping = {
  'https://espnbet.com': 'https://espnbet.app.link/integrations',
  'https://staging.endzonebet.com': 'https://espnbet.test-app.link/Kf3yzFBkVRb',
  'https://uat.endzonebet.com': 'https://espnbet.test-app.link/aayushUAT',
  'http://localhost:3000': 'https://espnbet.test-app.link/testLocal',
}

function extractBaseAndPath(url: string) {
  const urlObj = new URL(url)
  const baseUrl = urlObj.origin // This gives us the base URL (protocol + host)
  const relativePath = urlObj.pathname // This gives us the path after the host

  return {
    baseUrl,
    relativePath,
  }
}

function getMostRecentLink() {
  const links = getGeneratedLinks()
  return links[links.length - 1]
}

function getGeneratedLinks() {
  const generatedLinks = localStorage.getItem('generatedLinks')
  if (generatedLinks) {
    return JSON.parse(generatedLinks)
  }

  return []
}
export function addGeneratedLink({
  link,
  // eventNames,
  title,
  tags,
  campaign,
  channel,
  location,
  eventData,
}: LocalStorageLink) {
  const links = getGeneratedLinks()
  const newItem = {
    link,
    // eventNames,
    title,

    tags,
    campaign,
    channel,
    location,
    eventData,
  }
  localStorage.setItem('generatedLinks', JSON.stringify([...links, newItem]))
}

type GenerateLinkParams = {
  location: string
  title: string
  marketSelections: MarketSelection[]
  campaign: SingleValue<DropdownOption> | null
  channel: SingleValue<DropdownOption> | null
  tags: MultiValue<DropdownOption> | null
  eventData: SportEvent[]
}

function generateLink({ location, title, marketSelections, campaign, channel, tags, eventData }: GenerateLinkParams) {
  console.log('generateLink()')
  const { baseUrl, relativePath } = extractBaseAndPath(location)

  const urlString = ENVIRONMENT_MAPPINGS[baseUrl]
  const url = new URL(urlString)

  console.log('marketSelections: ', marketSelections)

  marketSelections?.forEach((item, index) => {
    url.searchParams.append(`market_selection_id[${index}]`, item.id)
    url.searchParams.append(`odds_numerator[${index}]`, item.numerator.toString())
    url.searchParams.append(`odds_denominator[${index}]`, item.denominator.toString())
  })

  if (relativePath) {
    url.searchParams.append('$canonical_url', relativePath)
  }

  if (campaign && campaign?.label) {
    url.searchParams.append('campaign', campaign.label)

    if (campaign.label === 'betting-integrations') {
      url.searchParams.append('clr', 'espnbettingintegration')
      url.searchParams.append('$3p', 'a_espn')
    }
  }

  if (channel) {
    url.searchParams.append('~channel', channel.label)
  }

  tags?.forEach((item, index) => {
    url.searchParams.append(`tags[${index}]`, item.label)
  })

  const generatedLink = {
    link: url.toString(),
    title,
    tags,
    campaign,
    channel,
    location,
    marketSelections,
    eventData,
  }

  return generatedLink
}

export { generateLink, getMostRecentLink }
