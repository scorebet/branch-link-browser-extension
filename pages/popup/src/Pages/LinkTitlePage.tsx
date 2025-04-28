import { useContext } from 'react'

import { PopupContext } from '../Popup'
import FlowNavigationButtons from '@src/components/FlowNavigationButtons'

const LinkTitlePage = () => {
  const { title, setTitle, eventData } = useContext(PopupContext)

  return (
    <div className="flex items-baseline justify-start flex-col gap-12">
      <form className="flex flex-col w-full mt-5">
        <p className="text-gray-900 text-sm font-medium">Link Title</p>
        <input
          className="border-brand-green border-2 rounded-lg p-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter Title"
        />
      </form>
      <div className="w-full">
        {eventData.length === 0 ? (
          <div className="flex self-center flex-col">
            <div className="flex flex-row gap-4 self-center">
              <img src={chrome.runtime.getURL('popup/+110.svg')} className="" alt="betslip" />
              <img src={chrome.runtime.getURL('popup/union.svg')} className="" alt="betslip" />
              <img src={chrome.runtime.getURL('popup/+260.svg')} className="" alt="betslip" />
            </div>
            <p className="text-sm text-gray-700 mt-4 text-center block w-fit m-auto">
              Click on market(s) to create your link!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-y-2 max-h-52 overflow-y-scroll">
            {eventData.map(event => (
              <article
                className="bg-gray-200 rounded-lg py-2 px-4 text-center text-sm font-bold border border-black"
                key={event.eventName}>
                {event.eventName}
                <ul>
                  {event.legs.map(leg => (
                    <li className="text-xs font-light">{leg}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </div>
      <FlowNavigationButtons />
    </div>
  )
}

export default LinkTitlePage
