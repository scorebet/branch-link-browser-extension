const EditSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.16683 4.16667H5.00016C4.55814 4.16667 4.13421 4.34226 3.82165 4.65482C3.50909 4.96739 3.3335 5.39131 3.3335 5.83334V15C3.3335 15.442 3.50909 15.866 3.82165 16.1785C4.13421 16.4911 4.55814 16.6667 5.00016 16.6667H14.1668C14.6089 16.6667 15.0328 16.4911 15.3453 16.1785C15.6579 15.866 15.8335 15.442 15.8335 15V10.8333M14.6552 2.98834C14.8089 2.82915 14.9928 2.70218 15.1962 2.61483C15.3995 2.52749 15.6182 2.48151 15.8395 2.47959C16.0608 2.47766 16.2803 2.51983 16.4851 2.60363C16.6899 2.68744 16.876 2.81119 17.0325 2.96768C17.189 3.12417 17.3127 3.31025 17.3965 3.51508C17.4803 3.71991 17.5225 3.93937 17.5206 4.16067C17.5187 4.38197 17.4727 4.60067 17.3853 4.80401C17.298 5.00735 17.171 5.19126 17.0118 5.345L9.85683 12.5H7.50016V10.1433L14.6552 2.98834Z"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

const DeleteSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.3335 9.16667V14.1667M11.6668 9.16667V14.1667M3.3335 5.83333H16.6668M15.8335 5.83333L15.111 15.9517C15.0811 16.3722 14.8929 16.7657 14.5844 17.053C14.2759 17.3403 13.87 17.5 13.4485 17.5H6.55183C6.13028 17.5 5.72439 17.3403 5.4159 17.053C5.10742 16.7657 4.91926 16.3722 4.88933 15.9517L4.16683 5.83333H15.8335ZM12.5002 5.83333V3.33333C12.5002 3.11232 12.4124 2.90036 12.2561 2.74408C12.0998 2.5878 11.8878 2.5 11.6668 2.5H8.3335C8.11248 2.5 7.90052 2.5878 7.74424 2.74408C7.58796 2.90036 7.50016 3.11232 7.50016 3.33333V5.83333H12.5002Z"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

type EditDeleteButtonsProps = {
  onDelete: () => void
  onEdit: () => void
}

export default function EditDeleteButtons({ onDelete, onEdit }: EditDeleteButtonsProps) {
  return (
    <div className="flex flex-col align-baseline m-0">
      <button
        onClick={onEdit}
        className="flex gap-2 font-medium text-sm py-2 hover:bg-brand-background-green hover:stroke-brand-green-link stroke-slate-600">
        <EditSvg />
        Edit
      </button>
      <button
        onClick={onDelete}
        className="flex gap-2 font-medium text-sm py-2 hover:bg-brand-background-green hover:stroke-brand-green-link stroke-slate-600">
        <DeleteSvg />
        Delete
      </button>
    </div>
  )
}
