import { useContext } from 'react'

import { PopupContext } from '../Popup'

const LinkTitlePage = () => {
  const { eventNames, title, setTitle } = useContext(PopupContext)

  return (
    <div className="flex items-center flex-col gap-12">
      <form className="flex flex-col w-full gap-2">
        <p style={{ fontWeight: 'bold' }}>Link Title</p>
        <input
          style={{ borderRadius: '8px', height: '24px' }}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter Title"
        />
      </form>
      <div>
        {eventNames.length === 0 ? (
          <div className="flex flex-row gap-4 mb-8">
            <img src={chrome.runtime.getURL('popup/+110.svg')} className="" alt="betslip" />
            <img src={chrome.runtime.getURL('popup/union.svg')} className="" alt="betslip" />
            <img src={chrome.runtime.getURL('popup/+260.svg')} className="" alt="betslip" />
          </div>
        ) : (
          <>
            {eventNames.map(eventName => (
              <article key={eventName}>{eventName}</article>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default LinkTitlePage
