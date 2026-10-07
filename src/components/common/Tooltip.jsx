import PropType from 'prop-types';
import React, { useRef } from 'react';

let nextTooltipId = 0;

const Tooltip = ({ text, children }) => {
  const tooltipId = useRef(null);
  if (!tooltipId.current) {
    nextTooltipId += 1;
    tooltipId.current = `ui-tooltip-${nextTooltipId}`;
  }

  const child = React.Children.only(children);
  const describedBy = child.props['aria-describedby'];
  const trigger = React.cloneElement(child, {
    'aria-describedby': [describedBy, tooltipId.current].filter(Boolean).join(' ')
  });

  return (
    <span className="ui-tooltip">
      {trigger}
      <span className="ui-tooltip-text" id={tooltipId.current} role="tooltip">
        {text}
      </span>
    </span>
  );
};

Tooltip.propTypes = {
  text: PropType.string.isRequired,
  children: PropType.element.isRequired
};

export default Tooltip;