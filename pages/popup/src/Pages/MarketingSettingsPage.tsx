import { useContext } from 'react'
import { PopupContext } from '../Popup'
import Dropdown from '@src/components/Dropdown'

const MarketingSettingsPage = () => {
  const VALID_CAMPAIGNS = ['campaign_1', 'campaign_2', 'campaign_3']
  const VALID_TAGS = ['tag_1', 'tag_2', 'tag_3']

  const { campaign, setCampaign, tags, setTags } = useContext(PopupContext)

  return (
    <div style={{ width: '100%' }}>
      <div>
        <p>Customer Campaign</p>
        <Dropdown options={VALID_CAMPAIGNS} selected={campaign} setSelected={setCampaign} />
      </div>
      <div>
        <p>Tags</p>
        <Dropdown options={VALID_TAGS} selected={tags} setSelected={setTags} inputType="checkbox" />
      </div>
    </div>
  )
}

export default MarketingSettingsPage
