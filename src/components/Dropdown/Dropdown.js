import React, {
  memo,
  useState,
} from 'react'

function Dropdown({ component }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleToggleDropdown = () => {
    setIsOpen(prevState => !prevState)
  }

  return(
    <div>
      {component({ isOpen, onToggle: handleToggleDropdown })}
    </div>
  )
}

export default memo(Dropdown)