import {isEmpty} from 'lodash';

import Tooltip from '@/components/common/Tooltip';

interface Props {
  id: string;
  tags: Tag[];
  children: JSX.Element;
}

function TagsTooltip({id, tags, children}: Props) {
  function renderTooltip() {
    return (
      <>
        {!isEmpty(tags) &&
          tags.map(tag => {
            return <div key={tag.title}>- {tag.title}</div>;
          })}
      </>
    );
  }

  return (
    <Tooltip id={id} title={renderTooltip()}>
      {children}
    </Tooltip>
  );
}

export default TagsTooltip;
