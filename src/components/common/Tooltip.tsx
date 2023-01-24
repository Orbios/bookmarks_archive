import Tooltip from 'rc-tooltip';

interface Props {
  id: string;
  title: string | JSX.Element;
  children: JSX.Element;
}

function TooltipComponent({id, title, children}: Props) {
  return (
    <Tooltip id={id} placement="bottom" overlay={<span>{title}</span>}>
      {children}
    </Tooltip>
  );
}

export default TooltipComponent;
