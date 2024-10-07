import React from 'react';

type ToggleProps = {
  action: () => void;
  text: string;
}

const Checkbox: React.FC<ToggleProps> = ({action, text}) => {
  return (
    <div className="flex justify-center items-center gap-2" data-cy="post-summary-toggler">
      <span>{text}</span>
      <input type="checkbox" onClick={action} />
    </div>
  )
}

export default Checkbox;