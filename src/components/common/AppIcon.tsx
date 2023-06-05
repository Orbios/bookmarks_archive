import {FontAwesomeIcon as FaIcon} from '@fortawesome/react-fontawesome';
import {SizeProp, FlipProp} from '@fortawesome/fontawesome-svg-core';

//reduce bundle size by importing required icons only
import {
  faPlus,
  faPencilAlt,
  faHome,
  faDownload,
  faInfoCircle,
  faTags,
  faCircleCheck,
  faArrowDown,
  faArrowUp,
  faTag,
  faMinus,
  faCircleExclamation,
  faRotateLeft,
  faMagnifyingGlass,
  faGear,
  faCaretDown,
  faCaretUp
} from '@fortawesome/free-solid-svg-icons';
import {faQuestionCircle, faCircle, faTrashCan} from '@fortawesome/free-regular-svg-icons';

const unknownIcon = faQuestionCircle;

const map = {
  plus: faPlus,
  delete: faTrashCan,
  edit: faPencilAlt,
  home: faHome,
  tags: faTags,
  download: faDownload,
  help: faInfoCircle,
  circleChecked: faCircleCheck,
  circleEmpty: faCircle,
  arrowDown: faArrowDown,
  arrowUp: faArrowUp,
  tag: faTag,
  minus: faMinus,
  exclamation: faCircleExclamation,
  undo: faRotateLeft,
  search: faMagnifyingGlass,
  preferences: faGear,
  caretDown: faCaretDown,
  caretUp: faCaretUp
};

export type IconName =
  | 'plus'
  | 'delete'
  | 'edit'
  | 'home'
  | 'tags'
  | 'download'
  | 'help'
  | 'circleChecked'
  | 'circleEmpty'
  | 'arrowDown'
  | 'arrowUp'
  | 'tag'
  | 'minus'
  | 'exclamation'
  | 'undo'
  | 'search'
  | 'preferences'
  | 'caretDown'
  | 'caretUp';

interface Props {
  icon: IconName;
  size?: SizeProp;
  color?: string;
  flip?: FlipProp;
}

function AppIcon(props: Props) {
  let icon = unknownIcon;

  if (map[props.icon]) {
    icon = map[props.icon];
  }

  return <FaIcon {...props} icon={icon} />;
}

export default AppIcon;
