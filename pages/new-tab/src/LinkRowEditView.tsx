import { useState } from 'react'
import type { LocalStorageLink } from '../../utils/types'
import CampaignSelect from '../../components/CampaignSelect'

const EditableTextCell = ({ value, onChange }: { value: string; onChange: (e) => void }) => {
  return <input value={value} onChange={onChange} />
}

type LinkRowEditViewProps = {
  link: LocalStorageLink
  campaign: string[]
  onSave: (props: any) => void
}

export default function LinkRowEditView({ link, campaign, onSave }: LinkRowEditViewProps) {
  const [title, setLinkTitle] = useState(link.title)

  const handleSave = () => {
    onSave({ title })
  }

  return (
    <tr className="even:bg-white odd:bg-gray-100">
      <th className="px-6 py-4 font-medium text-black whitespace-nowrap">
        <EditableTextCell value={title} onChange={e => setLinkTitle(e.target.value)} />
      </th>
      <td className="px-6 py-4">{link.eventNames}</td>
      <td className="px-6 py-4">
        <CampaignSelect campaign={campaign} setCampaign={() => {}} />
      </td>
      <td className="px-6 py-4"></td>
      <td className="px-6 py-4">
        <button className="text-brand-green-link font-semibold flex gap-1">Preview</button>
      </td>
      <td className="px-6 py-4">
        <button className="text-brand-green-link font-semibold flex gap-1" onClick={() => copyToClipboard(link.link)}>
          Copy
        </button>
      </td>
      <td className="px-6 py-4">
        <button onClick={handleSave} className="text-white bg-brand-green font-bold rounded-md  px-1 py-2 w-full">
          Save
        </button>
      </td>
    </tr>
  )
}
