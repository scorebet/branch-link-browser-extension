import useLocalStorage from './useLocalStorage'
import type { LocalStorageLink } from '../../utils/types'
import Toast from './components/Toast'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import Popover from './components/Popover'
import EditDeleteButtons from './components/EditDeleteButtons'
import LinkRowView from './components/LinkRowView'

const NewTab = () => {
  const [generatedLinks, setGeneratedLinks] = useLocalStorage('generatedLinks', []) as [
    LocalStorageLink[],
    Dispatch<SetStateAction<LocalStorageLink[]>>,
  ]

  const [showingCopyLinkToast, setShowingCopyLinkToast] = useState(false)
  const [editingLink, setEditingLink] = useState<number | null>()

  function clearGeneratedLinks() {
    setGeneratedLinks([])
  }

  const deleteLinkAtIndex = (index: number) => {
    const newGeneratedLinks = [...generatedLinks]
    newGeneratedLinks.splice(index, 1)
    setGeneratedLinks(newGeneratedLinks)
  }

  const EditAtIndex = (index: number) => {}

  const parseLink = (link: string) => {
    const urlObj = new URL(link)
    return urlObj
  }

  const extractTagsFromUrl = (link: string) => {
    const urlObj = parseLink(link)
    const params = new URLSearchParams(urlObj.search)
    const tags = []

    for (const [key, value] of params.entries()) {
      if (key.startsWith('tags')) {
        tags.push(value)
      }
    }

    return tags
  }

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link)
    setShowingCopyLinkToast(true)
  }

  const openPreview = (link: string) => {
    window.open(link, '_blank')
  }

  return (
    <div className="flex flex-col items-start w-3/4 m-auto gap-6 mt-20">
      <div className="flex justify-between w-full my-6">
        <div className="flex">
          <img src={chrome.runtime.getURL('popup/logo.svg')} alt="espn bet logo" className="w-10 mx-2" />
          <h1 className="text-4xl font-bold">Branch Link Generator</h1>
        </div>

        {generatedLinks.length > 0 && (
          <button
            onClick={clearGeneratedLinks}
            className="bg-red-500 text-white hover:bg-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
            Clear All Links
          </button>
        )}
      </div>

      {!generatedLinks.length ? (
        <div className="mt-10">
          <span className="font-bold text-lg mx-auto block w-fit">Create a branch link to get started</span>
          <img src={chrome.runtime.getURL('new-tab/no_links.svg')} className="" alt="betslip" />
        </div>
      ) : (
        <table className="text-sm text-left rtl:text-right text-black w-full">
          <thead className="text-xs text-black uppercase bg-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Markets
              </th>
              <th scope="col" className="px-6 py-3">
                Campaign
              </th>
              <th scope="col" className="px-6 py-3">
                Tags
              </th>
              <th scope="col" className="px-6 py-3">
                Branch Link
              </th>
              <th scope="col" className="px-6 py-3">
                URL
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {generatedLinks.map((link, i) => {
              const parsedLink = parseLink(link.link)
              const campaign = parsedLink.searchParams.getAll('campaign')
              const tags = extractTagsFromUrl(link.link)
              return (
                <LinkRowView
                  link={link}
                  campaign={campaign}
                  tags={tags}
                  openPreview={openPreview}
                  copyToClipboard={copyToClipboard}
                  deleteLink={() => deleteLinkAtIndex(i)}
                />
                // <tr className="even:bg-white odd:bg-gray-100">
                //   <th className="px-6 py-4 font-medium text-black whitespace-nowrap">{link.title}</th>
                //   <td className="px-6 py-4">{link.eventNames}</td>
                //   <td className="px-6 py-4">{campaign}</td>
                //   <td className="px-6 py-4">
                //     {tags.map(tag => (
                //       <span className="bg-gray-200 mx-1 p-1">{tag}</span>
                //     ))}
                //   </td>
                //   <td className="px-6 py-4">
                //     <button
                //       className="text-brand-green-link font-semibold flex gap-1"
                //       onClick={() => openPreview(link.link)}>
                //       Preview
                //       <img src={chrome.runtime.getURL('new-tab/preview.svg')} alt="preview" />
                //     </button>
                //   </td>
                //   <td className="px-6 py-4">
                //     <button
                //       className="text-brand-green-link font-semibold flex gap-1"
                //       onClick={() => copyToClipboard(link.link)}>
                //       Copy
                //       <img src={chrome.runtime.getURL('new-tab/copy.svg')} alt="copy" />
                //     </button>
                //   </td>
                //   <td className="px-6 py-4">
                //     <Popover content={<EditDeleteButtons onDelete={() => deleteLinkAtIndex(i)} />}>Children</Popover>
                //   </td>
                // </tr>
              )
            })}
          </tbody>
        </table>
      )}
      {showingCopyLinkToast && (
        <Toast message="Copied Link!" type="success" onClose={() => setShowingCopyLinkToast(false)} />
      )}
    </div>
  )
}

export default NewTab
