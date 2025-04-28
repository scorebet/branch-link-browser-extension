import { useState } from 'react'
import type { DropdownOption, LocalStorageLink } from '../../../utils/types'
import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated'
import type { MultiValue, SingleValue } from 'react-select'

interface EditableTextCellProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const EditableTextCell = ({ value, onChange }: EditableTextCellProps) => {
  return <input className="border-brand-green border-2 rounded-md p-1" value={value} onChange={onChange} />
}

type LinkRowEditViewProps = {
  link: LocalStorageLink
  onSave: (props: { title: string; campaign: DropdownOption; tags: MultiValue<DropdownOption> }) => void
}

const VALID_CAMPAIGNS = [{ value: 1, label: 'betting-integrations' }]
const VALID_TAGS = [
  { value: 1, label: 'Tag 1' },
  { value: 2, label: 'Tag 2' },
  { value: 3, label: 'Tag 3' },
]

export default function LinkRowEditView({ link, onSave }: LinkRowEditViewProps) {
  const [title, setLinkTitle] = useState(link.title)
  const [campaignValue, setCampaignValue] = useState(link.campaign)
  const [tagsValue, setTagsValue] = useState(link.tags)

  const handleSave = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newLink: any = {
      title,
    }
    if (campaignValue) {
      newLink.campaign = campaignValue
    }
    if (tagsValue) {
      newLink.tags = tagsValue
    }
    onSave(newLink)
  }

  const animatedComponents = makeAnimated()

  return (
    <tr className="even:bg-white odd:bg-gray-100">
      <th className="px-6 py-4 font-medium text-black whitespace-nowrap">
        <EditableTextCell value={title} onChange={e => setLinkTitle(e.target.value)} />
      </th>
      <td className="px-6 py-4">{link.eventData.map(i => i.eventName).join(' | ')}</td>
      <td className="px-6 py-4">
        <CreatableSelect
          placeholder="Type or select from dropdown"
          closeMenuOnSelect
          components={animatedComponents}
          options={VALID_CAMPAIGNS}
          value={campaignValue}
          className="border-brand-green"
          onChange={newValue => setCampaignValue(newValue as SingleValue<DropdownOption>)}
        />
      </td>
      <td className="px-6 py-4">
        <CreatableSelect
          placeholder="Type or select from dropdown"
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          value={tagsValue}
          options={VALID_TAGS}
          onChange={newValue => setTagsValue(newValue)}
        />
      </td>
      <td className="px-6 py-4"></td>
      <td className="px-6 py-4"></td>
      <td className="px-6 py-4">
        <button onClick={handleSave} className="text-white bg-brand-green font-bold rounded-md  px-1 py-2 w-full">
          Save
        </button>
      </td>
    </tr>
  )
}
