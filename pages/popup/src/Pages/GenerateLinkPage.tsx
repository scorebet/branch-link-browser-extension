import React, { useContext } from 'react'
import { PopupContext } from '../Popup'
import type { LocalStorageLink } from '../../../utils/types'

type GenericEnvironmentMapping<T> = {
  [key: string]: T
}

type EnvironmentMapping = GenericEnvironmentMapping<string>

const ENVIRONMENT_MAPPINGS: EnvironmentMapping = {
  'https://espnbet.com': 'https://espnbet.app.link',
  'https://staging.endzonebet.com': 'https://espnbet.test-app.link/Kf3yzFBkVRb',
  'https://uat.endzonebet.com': 'https://espnbet.test-app.link/aayushUAT',
  'http://localhost:3000': 'https://espnbet.test-app.link/testLocal',
}

function getGeneratedLinks() {
  const generatedLinks = localStorage.getItem('generatedLinks')
  if (generatedLinks) {
    return JSON.parse(generatedLinks)
  }

  return []
}
function addGeneratedLink({ link, eventNames, title }: LocalStorageLink) {
  const links = getGeneratedLinks()
  const newItem = {
    link,
    eventNames,
    title,
  }
  localStorage.setItem('generatedLinks', JSON.stringify([...links, newItem]))
}

function extractBaseAndPath(url: string) {
  const urlObj = new URL(url)
  const baseUrl = `${urlObj.protocol}//${urlObj.host}` // This gives us the base URL (protocol + host)
  const relativePath = urlObj.pathname // This gives us the path after the host

  return {
    baseUrl,
    relativePath,
  }
}

const GenerateLinkPage = () => {
  const { marketSelections, campaign, tags, channel, location, title, eventData } = useContext(PopupContext)

  const [showFlash, setShowFlash] = React.useState(false)

  const flashConfirmationMessage = () => {
    setShowFlash(true)
    setTimeout(() => setShowFlash(false), 3000)
  }

  const generateLink = () => {
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
    }

    if (channel && channel !== '') {
      url.searchParams.append('~channel', channel)
    }

    tags?.forEach((item, index) => {
      url.searchParams.append(`tags[${index}]`, item.label)
    })

    navigator.clipboard.writeText(url.toString())
    flashConfirmationMessage()
    addGeneratedLink({
      link: url.toString(),
      title,
      eventNames: eventData.map(event => event.eventName),
    })
  }

  return (
    <>
      {showFlash && <p className="font-semibold text-sm w-fit mx-auto mt-6">Link Copied!</p>}
      <button
        onClick={generateLink}
        className="absolute left-0 right-0 mx-auto top-1/2 max-w-36 bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded">
        Copy Link
      </button>
    </>
  )
}
export default GenerateLinkPage
