import { getMostRecentLink } from '@src/utils/generateLink'

const GenerateLinkPage = () => {
  const copyLink = () => {
    const link = getMostRecentLink()
    navigator.clipboard.writeText(link.link)
  }

  const seeAllLinks = () => {
    chrome.tabs.create({
      url: 'new-tab/index.html',
    })
  }

  return (
    <div className="flex flex-col align-middle justify-between h-full py-4">
      <div className="flex flex-col align-middle">
        <span className="text-brand-subdued-primary text-xs text-center font-medium">
          Your branch link has been successfully created!
        </span>
        <button
          onClick={copyLink}
          className="text-brand-link-default text-md font-medium mt-2 flex justify-center gap-1">
          Copy Branch Link
          <img src={chrome.runtime.getURL('new-tab/copy.svg')} alt="copy" />
        </button>
        <img src={chrome.runtime.getURL('popup/celebration.svg')} className="w-40 mt-6 mx-auto" alt="celebration" />
      </div>
      <button
        onClick={seeAllLinks}
        className="font-bold border-brand-green text-brand-green border-2 py-2 rounded-md flex justify-center gap-1">
        See All Links
        <img src={chrome.runtime.getURL('new-tab/preview.svg')} alt="preview" />
      </button>
    </div>
  )
}
export default GenerateLinkPage
