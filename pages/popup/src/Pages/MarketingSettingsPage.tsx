import { useContext } from 'react'
import { PopupContext } from '../Popup'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated'
import CreatableSelect from 'react-select/creatable'

const MarketingSettingsPage = () => {
  const VALID_CAMPAIGNS = [{ value: 1, label: 'betting-integrations' }]

  const VALID_TAGS = [
    { value: 1, label: 'Tag 1' },
    { value: 2, label: 'Tag 2' },
    { value: 3, label: 'Tag 3' },
  ]

  const VALID_CHANNELS = [
    { value: 1, label: 'espn-content' },
    { value: 2, label: 'espn-app' },
    { value: 3, label: 'espn-web' },
    { value: 4, label: 'espn-fantasy-app' },
    { value: 5, label: 'espn-fantasy-web' },
  ]

  const animatedComponents = makeAnimated()

  const { campaign, setCampaign, tags, setTags, channel, setChannel } = useContext(PopupContext)

  console.log('channel: ', channel)

  return (
    <div className="w-full mt-6 flex flex-col gap-y-7">
      <div>
        <p className="font-bold text-xs">Channel</p>
        <CreatableSelect
          placeholder="Type or select from dropdown"
          closeMenuOnSelect
          components={animatedComponents}
          isMulti={false}
          value={channel}
          options={VALID_CHANNELS}
          onChange={newValue => setChannel(newValue)}
        />
      </div>
      <div>
        <p className="font-bold text-xs">Customer Campaign</p>
        <CreatableSelect
          placeholder="Type or select from dropdown"
          closeMenuOnSelect
          components={animatedComponents}
          options={VALID_CAMPAIGNS}
          value={campaign}
          onChange={newValue => setCampaign(newValue)}
        />
      </div>
      <div className="font-bold text-xs">
        <p>Tags</p>
        <CreatableSelect
          placeholder="Type or select from dropdown"
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          value={tags}
          options={VALID_TAGS}
          onChange={newValue => setTags(newValue)}
        />
      </div>
    </div>
  )
}

export default MarketingSettingsPage
