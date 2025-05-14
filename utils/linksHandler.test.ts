import exp from 'constants'
import { generateLink, getMostRecentLink } from './linksHandler'
import type { LocalStorageLink, SportEvent, MarketSelection } from './types'

export const mockWindowProperty = (property: keyof (Window & typeof globalThis), value: unknown) => {
  const originalProperty = window[property]

  beforeAll(() => {
    delete window[property]

    Object.defineProperty(window, property, {
      configurable: true,
      writable: true,
      value,
    })
  })

  afterAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    window[property] = originalProperty
  })
}

describe('Link Generation Module', () => {
  mockWindowProperty('location', {
    href: 'https://espnbet.com/some/path',
  })

  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  const mockLocation = 'https://espnbet.com/some/path'
  const title = 'Test Event'

  const marketSelections: MarketSelection[] = [
    { id: 'm1', numerator: '2', denominator: '1' },
    { id: 'm2', numerator: '3', denominator: '2' },
  ]

  const campaign = { value: 1, label: 'betting-integrations' }
  const customerCampaign = { value: 1, label: 'article' }
  const channel = { value: 1, label: 'espn' }
  const tags = [
    { value: 1, label: 'sports' },
    { value: 2, label: 'football' },
  ]
  const eventData = [
    { eventName: 'Super Bowl', legs: [] },
    { eventName: 'Pro Bowl', legs: [] },
  ] as SportEvent[]

  it('should generate a correct URL', () => {
    const newLink = generateLink({
      location: mockLocation,
      title,
      marketSelections,
      customerCampaign,
      campaign,
      channel,
      tags,
      eventData,
    })

    expect(newLink.title).toBe(title)

    const url = new URL(newLink.link)
    expect(url.origin).toBe('https://espnbet.app.link')
    expect(url.searchParams.get('$canonical_url')).toBe('/some/path')
    expect(url.searchParams.get('campaign')).toBe('betting-integrations')
    expect(url.searchParams.get('customer_campaign')).toBe('article')
    expect(url.searchParams.get('clr')).toBe('espnbettingintegration')
    expect(url.searchParams.get('$3p')).toBe('a_espn')
    expect(url.searchParams.get('~channel')).toBe('espn')
    expect(url.searchParams.get('market_selection_id[0]')).toBe('m1')
    expect(url.searchParams.get('odds_numerator[1]')).toBe('3')
    expect(url.searchParams.get('tags')).toBe('sports')
  })

  it('should return the most recent link', () => {
    const mockLinks: LocalStorageLink[] = [
      {
        link: 'https://test.com/1',
        title: 'Old',
        tags: [],
        channel: { value: 1, label: 'espn' },
        customerCampaign: { value: 1, label: 'article' },
        campaign: { value: 1, label: 'betting-integrations' },
        location: 'https://espnbet.com/some/path',
        marketSelections: [],
        eventData: [],
      },
      {
        link: 'https://test.com/2',
        title: 'Recent',
        tags: [],
        channel: null,
        customerCampaign: { value: 1, label: 'article' },
        campaign: null,
        location: 'https://espnbet.com/some/path',
        marketSelections: [],
        eventData: [],
      },
    ]
    localStorage.setItem('generatedLinks', JSON.stringify(mockLinks))

    const result = getMostRecentLink()
    expect(result.link).toBe('https://test.com/2')
    expect(result.title).toBe('Recent')
  })

  it('should handle empty localStorage gracefully', () => {
    expect(getMostRecentLink()).toBeUndefined()
  })
})
