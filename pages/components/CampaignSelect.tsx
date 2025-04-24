import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated'
import type { SingleValue } from 'react-select'

const VALID_CAMPAIGNS = [{ value: 1, label: 'betting-integrations' }]

type CamapignSelectProps = {
  campaign: SingleValue<DropdownOption> | string[]
  setCampaign: () => void
}

export default function CamapignSelect({ campaign, setCampaign }: CamapignSelectProps) {
  const animatedComponents = makeAnimated()
  return (
    <CreatableSelect
      placeholder="Type or select from dropdown"
      closeMenuOnSelect
      components={animatedComponents}
      options={VALID_CAMPAIGNS}
      value={campaign}
      className="border-brand-green"
      onChange={newValue => setCampaign(newValue)}
    />
  )
}
