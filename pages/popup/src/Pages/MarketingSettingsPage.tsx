import FlowNavigationButtons from '@src/components/FlowNavigationButtons'
import { useContext } from 'react'
import makeAnimated from 'react-select/animated'
import CreatableSelect from 'react-select/creatable'
import { PopupContext } from '../Popup'
import { generateLink, addGeneratedLink } from '../../../../utils/linksHandler'
import { VALID_CAMPAIGNS, VALID_TAGS, VALID_CHANNELS, VALID_CUSTOMER_CAMPAIGNS } from '../../../../utils/consts'

const MarketingSettingsPage = () => {
  const animatedComponents = makeAnimated()

  const {
    marketSelections,
    setCampaign,
    campaign,
    customerCampaign,
    setCustomerCampaign,
    setTags,
    tags,
    setChannel,
    channel,
    location,
    title,
    eventData,
  } = useContext(PopupContext)
  const createLink = () => {
    console.log('createLink()')
    const newLink = generateLink({
      location,
      title,
      marketSelections,
      customerCampaign,
      campaign,
      channel,
      tags,
      eventData,
    })
    addGeneratedLink(newLink)
  }

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
        <p className="font-bold text-xs">Campaign</p>
        <CreatableSelect
          placeholder="Type or select from dropdown"
          closeMenuOnSelect
          components={animatedComponents}
          options={VALID_CAMPAIGNS}
          value={campaign}
          isMulti={false}
          className="border-brand-green"
          onChange={newValue => setCampaign(newValue)}
        />
      </div>
      <div>
        <p className="font-bold text-xs">Customer Campaign</p>
        <CreatableSelect
          placeholder="Type or select from dropdown"
          closeMenuOnSelect
          components={animatedComponents}
          options={VALID_CUSTOMER_CAMPAIGNS}
          value={customerCampaign}
          className="border-brand-green"
          isMulti={false}
          onChange={newValue => setCustomerCampaign(newValue)}
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
      <FlowNavigationButtons nextTitle="Create Link" next={createLink} />
    </div>
  )
}

export default MarketingSettingsPage
