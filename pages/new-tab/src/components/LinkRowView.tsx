import type { LocalStorageLink } from '../../../utils/types'
import EditDeleteButtons from './EditDeleteButtons'
import Popover from './Popover'

type LinkRowViewProps = {
  link: LocalStorageLink
  campaign: string[]
  tags: string[]

  openPreview: (link: string) => void
  copyToClipboard: (link: string) => void
  deleteLink: () => void
}

export default function LinkRowView({
  link,
  campaign,
  tags,
  openPreview,
  copyToClipboard,
  deleteLink,
}: LinkRowViewProps) {
  return (
    <tr className="even:bg-white odd:bg-gray-100">
      <th className="px-6 py-4 font-medium text-black whitespace-nowrap">{link.title}</th>
      <td className="px-6 py-4">{link.eventNames}</td>
      <td className="px-6 py-4">{campaign}</td>
      <td className="px-6 py-4">
        {tags.map(tag => (
          <span className="bg-gray-200 mx-1 p-1">{tag}</span>
        ))}
      </td>
      <td className="px-6 py-4">
        <button className="text-brand-green-link font-semibold flex gap-1" onClick={() => openPreview(link.link)}>
          Preview
          <img src={chrome.runtime.getURL('new-tab/preview.svg')} alt="preview" />
        </button>
      </td>
      <td className="px-6 py-4">
        <button className="text-brand-green-link font-semibold flex gap-1" onClick={() => copyToClipboard(link.link)}>
          Copy
          <img src={chrome.runtime.getURL('new-tab/copy.svg')} alt="copy" />
        </button>
      </td>
      <td className="px-6 py-4">
        <Popover content={<EditDeleteButtons onDelete={deleteLink} />}>Children</Popover>
      </td>
    </tr>
  )
}
