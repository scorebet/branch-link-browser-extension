import type { LocalStorageLink } from '../../../utils/types'
import ActionButton from './components/ActionButton'
import Popover from './components/Popover'

type LinkRowViewProps = {
  link: LocalStorageLink

  openPreview: (link: string) => void
  copyToClipboard: (link: string) => void
  deleteLink: () => void
  editLink: () => void
}

export default function LinkRowView({ link, openPreview, copyToClipboard, deleteLink, editLink }: LinkRowViewProps) {
  return (
    <tr className="even:bg-white odd:bg-gray-100">
      <th className="px-6 py-4 font-medium text-black whitespace-nowrap">{link.title}</th>
      <td className="px-6 py-4">{link.eventData.map(i => i.eventName).join(' | ')}</td>
      <td className="px-6 py-4">{link.customerCampaign?.label}</td>
      <td className="px-6 py-4">{link.campaign?.label}</td>
      <td className="px-6 py-4">
        {link.tags && link.tags.length > 0
          ? link.tags.map(tag => (
              <span key={tag.value} className="bg-gray-200 mx-1 p-1">
                {tag.label}
              </span>
            ))
          : null}
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
        <Popover>
          <Popover.target>
            <img src={chrome.runtime.getURL('new-tab/ellipsis.svg')} alt="ellipsis" />
          </Popover.target>
          <Popover.content>
            <div>
              <ActionButton onClick={editLink} variant="edit">
                Edit
              </ActionButton>
              <ActionButton onClick={deleteLink} variant="delete">
                Delete
              </ActionButton>
            </div>
          </Popover.content>
        </Popover>
      </td>
    </tr>
  )
}
