const ListItemButton = ({ iconUrl, title, onClick }: { iconUrl: string; title: string; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 font-medium text-sm py-2 hover:bg-brand-background-green hover:text-brand-green-link">
      <img src={chrome.runtime.getURL(iconUrl)} className="text-inherit" alt="preview" />
      {title}
    </button>
  )
}

type EditDeleteButtonsProps = {
  onDelete: () => void
  onEdit: () => void
}

export default function EditDeleteButtons({ onDelete, onEdit }: EditDeleteButtonsProps) {
  return (
    <div className="flex flex-col align-baseline m-0">
      <ListItemButton onClick={onEdit} title="Edit" iconUrl="new-tab/edit.svg" />
      <ListItemButton onClick={onDelete} title="Delete" iconUrl="new-tab/delete.svg" />
    </div>
  )
}
