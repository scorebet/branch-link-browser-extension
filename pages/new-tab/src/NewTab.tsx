import useLocalStorage from './useLocalStorage'
import type { LocalStorageLink } from '../../utils/types'
import Toast from './components/Toast'
import { useState } from 'react'

const NewTab = () => {
  const [generatedLinks, setGeneratedLinks] = useLocalStorage('generatedLinks', []) as [
    LocalStorageLink[],
    React.Dispatch<React.SetStateAction<never[]>>,
  ]

  const [showingCopyLinkToast, setShowingCopyLinkToast] = useState(false)

  function clearGeneratedLinks() {
    setGeneratedLinks([])
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

  return (
    <div className="flex flex-col items-start w-3/4 m-auto gap-6 mt-20">
      <h1 className="text-4xl font-bold">Branch Link Generator</h1>

      {generatedLinks.length > 0 && (
        <button
          onClick={clearGeneratedLinks}
          className="bg-red-500 text-white hover:bg-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
          Clear All Links
        </button>
      )}

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
            </tr>
          </thead>
          <tbody>
            {generatedLinks.map(link => {
              const parsedLink = parseLink(link.link)

              const campaign = parsedLink.searchParams.getAll('campaign')
              const tags = extractTagsFromUrl(link.link)
              console.log('tags: ', tags)
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
                    <button className="text-blue-600 font-bold" onClick={() => openPreview(link.link)}>
                      Preview
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 font-bold" onClick={() => copyToClipboard(link.link)}>
                      Copy Link
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
      {showingCopyLinkToast && <Toast message="Copied Link!" onClose={() => setShowingCopyLinkToast(false)} />}
    </div>
  )
}

export default NewTab
