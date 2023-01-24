import {Button} from '@/components/bootstrap';

import AppIcon, {IconName} from './AppIcon';
import Tooltip from './Tooltip';

interface Props {
  icon: IconName;
  action: () => void;
  disabled?: boolean;
  tooltip: string;
  color?: string;
}

function ListAction({action, disabled, icon, tooltip, color}: Props) {
  const tooltipDisplay = disabled ? 'Select some bookmarks' : tooltip;

  const click = () => {
    if (disabled) return;

    if (action) action();
  };

  return (
    <Tooltip id={icon} title={tooltipDisplay}>
      <span className="d-inline-block">
        <Button variant="link" disabled={disabled} onClick={click}>
          <AppIcon icon={icon} size="xl" color={color} />
        </Button>
      </span>
    </Tooltip>
  );
}

export default ListAction;
