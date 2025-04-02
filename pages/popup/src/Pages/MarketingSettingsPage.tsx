import { useContext } from 'react'
import { PopupContext } from '../Popup'
import Select from 'react-select'
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

  const { campaign, setCampaign, tags, setTags } = useContext(PopupContext)

  return (
    <div className="w-full mt-6 flex flex-col gap-y-7">
      <div>
        <p className="font-bold text-xs">Customer Campaign</p>
        <Select
          closeMenuOnSelect
          components={animatedComponents}
          options={VALID_CAMPAIGNS}
          value={campaign}
          onChange={newValue => setCampaign(newValue)}
        />
      </div>
      <div className="font-bold text-xs">
        <p>Tags</p>
        <Select
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
