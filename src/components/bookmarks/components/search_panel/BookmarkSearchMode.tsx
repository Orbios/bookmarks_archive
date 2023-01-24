import AppIcon, {IconName} from '@/components/common/AppIcon';

import * as styled from './BookmarkSearchMode.styled';

interface Props {
  id: string;
  title: string;
  searchMode: string;
  onToggle: (id: string) => void;
  children: any;
}

function BookmarkSearchMode({id, title, searchMode, onToggle, children}: Props) {
  function handleOnToggle() {
    onToggle(id);
  }

  function render() {
    const active = searchMode === id;

    const iconName: IconName = active ? 'circleChecked' : 'circleEmpty';

    return (
      <styled.wrapper active={active}>
        <AppIcon icon={iconName} />

        <styled.title onClick={handleOnToggle}>{title}</styled.title>

        {active ? <styled.contentContainer>{children}</styled.contentContainer> : null}
      </styled.wrapper>
    );
  }

  return render();
}

export default BookmarkSearchMode;
