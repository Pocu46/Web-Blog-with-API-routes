import React from 'react';

type ToggleProps = {
  action: () => void
}

const Checkbox: React.FC<ToggleProps> = ({action}) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <span>Enable full Summary text</span>
      <input type="checkbox" onClick={action} />
    </div>
  )
}

export default Checkbox;