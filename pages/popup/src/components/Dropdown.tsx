type DropdownProps = {
  options: string[]
  selected: string[]
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
  inputType?: 'checkbox' | 'select'
}

const Dropdown = ({ options, selected, setSelected, inputType = 'select' }: DropdownProps) => {
  const CheckboxOption = ({ name }: { name: string }) => {
    const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked
      if (checked) setSelected(Array.from(new Set([...selected, name])))
      else setSelected(selected.filter(i => i !== name))
    }

    return (
      <li>
        <label>
          <input type="checkbox" onChange={e => handleSelect(e)} checked={selected.includes(name)} />
          {name}
        </label>
      </li>
    )
  }

  const DefaultOption = ({ name }: { name: string }) => {
    const handleSelect = () => {
      if (!selected.length || !selected.includes(name)) setSelected([name])
      else setSelected([])
    }
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    return <li onClick={handleSelect}>{name}</li>
  }

  return (
    <details className="dropdown">
      <summary>{selected ? selected.join(' | ') : 'Select'}</summary>
      <ul>
        {options.map(i => {
          if (inputType === 'checkbox') return <CheckboxOption name={i} />
          else return <DefaultOption name={i} />
        })}
      </ul>
    </details>
  )
}

export default Dropdown
