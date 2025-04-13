import { useContext } from 'react'
import { PopupContext } from '../Popup'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated'

const MarketingSettingsPage = () => {
  const VALID_CAMPAIGNS = [
    { value: 1, label: 'Campaign 1' },
    { value: 2, label: 'Campaign 2' },
    { value: 3, label: 'Campaign 3' },
  ]

  const VALID_TAGS = [
    { value: 1, label: 'Tag 1' },
    { value: 2, label: 'Tag 2' },
    { value: 3, label: 'Tag 3' },
  ]

  const animatedComponents = makeAnimated()

  const { campaign, setCampaign, tags, setTags, channel, setChannel } = useContext(PopupContext)

  return (
    <div className="w-full mt-6 flex flex-col gap-y-7">
      <div>
        <p className="font-bold text-xs">Channel</p>
        <input
          value={channel ?? ''}
          onChange={e => setChannel(e.target.value)}
          type="text"
          placeholder="Enter text..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>
      <div>
        <p className="font-bold text-xs">Customer Campaign</p>
        <Select
          placeholder="Select"
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
