import { generateLink, getMostRecentLink } from './linksHandler'
import type { LocalStorageLink, SportEvent } from './types'

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
  const marketSelections = [
    { id: 'm1', numerator: 2, denominator: 1 },
    { id: 'm2', numerator: 3, denominator: 2 },
  ]
  const campaign = { value: 1, label: 'betting-integrations' }
  const channel = { value: 1, label: 'espn' }
  const tags = [
    { value: 1, label: 'sports' },
    { value: 2, label: 'football' },
  ]
  const eventData = [
    { eventName: 'Super Bowl', legs: [] },
    { eventName: 'Pro Bowl', legs: [] },
  ] as SportEvent[]

  it('should generate a correct URL and store it in localStorage', () => {
    generateLink({ location: mockLocation, title, marketSelections, campaign, channel, tags, eventData }, true)

    const stored = JSON.parse(localStorage.getItem('generatedLinks') || '[]')
    expect(stored.length).toBe(1)
    const storedLink: LocalStorageLink = stored[0]

    expect(storedLink.title).toBe(title)

    const url = new URL(storedLink.link)
    expect(url.origin).toBe('https://espnbet.app.link')
    expect(url.searchParams.get('$canonical_url')).toBe('/some/path')
    expect(url.searchParams.get('campaign')).toBe('betting-integrations')
    expect(url.searchParams.get('clr')).toBe('espnbettingintegration')
    expect(url.searchParams.get('$3p')).toBe('a_espn')
    expect(url.searchParams.get('~channel')).toBe('espn')
    expect(url.searchParams.get('market_selection_id[0]')).toBe('m1')
    expect(url.searchParams.get('odds_numerator[1]')).toBe('3')
    expect(url.searchParams.get('tags[0]')).toBe('sports')
  })

  it('should return the most recent link', () => {
    const mockLinks: LocalStorageLink[] = [
      {
        link: 'https://test.com/1',
        title: 'Old',
        // eventNames: ['Old Event'],
        tags: [],
        channel: { value: 1, label: 'espn' },
        campaign: { value: 1, label: 'betting-integrations' },
        location: 'https://espnbet.com/some/path',
        marketSelections: [],
        eventData: [],
      },
      {
        link: 'https://test.com/2',
        title: 'Recent',
        // eventNames: ['New Event'],
        tags: null,
        channel: null,
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
