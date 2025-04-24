import useLocalStorage from './useLocalStorage'
import type { LocalStorageLink } from '../../utils/types'
import Toast from './components/Toast'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import Popover from './components/Popover'
import EditDeleteButtons from './components/EditDeleteButtons'
import LinkRowView from './components/LinkRowView'
import LinkRowEditView from './LinkRowEditView'

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

  const editLinkAtIndex = (index: number) => {
    setEditingLink(index)
  }

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

  const onEditSave = ({ title }) => {
    const newGeneratedLinks = [...generatedLinks]
    if (editingLink) {
      newGeneratedLinks[editingLink] = {
        ...newGeneratedLinks[editingLink],
        title,
      }
      setGeneratedLinks(newGeneratedLinks)
      setEditingLink(null)
    }
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

              if (editingLink === i) {
                return <LinkRowEditView link={link} campaign={campaign} onSave={onEditSave} />
              }

              return (
                <LinkRowView
                  link={link}
                  campaign={campaign}
                  tags={tags}
                  openPreview={openPreview}
                  copyToClipboard={copyToClipboard}
                  deleteLink={() => deleteLinkAtIndex(i)}
                  editLink={() => editLinkAtIndex(i)}
                />
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
