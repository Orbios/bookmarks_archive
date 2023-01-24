import {isEmpty} from 'lodash';
import styled from 'styled-components';

import dateHelper from '@/helpers/dateHelper';

import Tooltip from '@/components/common/Tooltip';

const TooltipRow = styled.div`
  margin-bottom: 10px;
`;

const TagItem = styled.div`
  padding-left: 25px;
`;

interface Props {
  id: string;
  bookmark: Bookmark;
  children: JSX.Element;
}

function BookmarkTooltip({id, bookmark, children}: Props) {
  function renderTooltip() {
    const date = bookmark.creationDate ? dateHelper.displayDate(bookmark.creationDate) : '';

    const tags = bookmark.tags;

    return (
      <>
        <TooltipRow>Created: {date}</TooltipRow>

        {bookmark.originalPath && <div>Original path: {bookmark.originalPath}</div>}

        {!isEmpty(tags) && (
          <>
            <div>Tags:</div>
            {tags.map(tag => {
              return <TagItem key={tag.title}>- {tag.title}</TagItem>;
            })}
          </>
        )}
      </>
    );
  }

  return (
    <Tooltip id={id} title={renderTooltip()}>
      {children}
    </Tooltip>
  );
}

export default BookmarkTooltip;
