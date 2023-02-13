import {useNavigate} from 'react-router-dom';
import {Button} from '@/components/bootstrap';

import {useAppDispatch} from '@/hooks';

import {setSearchParams} from '@/reducers/bookmarkSlice';

import SEARCH_MODE from '@/constants/searchMode';

import AppIcon from '@/components/common/AppIcon';
import Tooltip from '@/components/common/Tooltip';

import {colors} from '@/styles/shared';

import * as styled from './TagItem.styled';
import * as styledCommon from '../TagsPage.styled';

interface Props {
  tag: Tag;
  editTagAction: (tag: Tag) => void;
  deleteTagAction: (id: number) => void;
}

function TagItem({tag, editTagAction, deleteTagAction}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function editClick() {
    editTagAction(tag);
  }

  function deleteClick() {
    deleteTagAction(tag.id);
  }

  function redirectToHomePage() {
    const selectedTags = [{value: tag.id, label: tag.title}];

    dispatch(setSearchParams({searchStr: '', searchMode: SEARCH_MODE.ALL, searchTags: selectedTags}));
    navigate('/');
  }

  return (
    <styledCommon.tableRow>
      <styledCommon.tableCell field="title">
        <Button variant="link" onClick={redirectToHomePage}>
          {tag.title}
        </Button>
      </styledCommon.tableCell>

      <styledCommon.tableCell field="description">{tag.description}</styledCommon.tableCell>

      <styledCommon.tableCell field="tools">
        <styled.actionIconsListContainer>
          <Tooltip id={`edit-tag-tooltip-${tag.id}`} title="Edit tag">
            <Button variant="link" onClick={editClick}>
              <AppIcon icon="edit" color={colors.gold} />
            </Button>
          </Tooltip>

          <Tooltip id={`delete-tag-tooltip-${tag.id}`} title="Delete tag">
            <Button variant="link" onClick={deleteClick}>
              <AppIcon icon="delete" color={colors.red} />
            </Button>
          </Tooltip>
        </styled.actionIconsListContainer>
      </styledCommon.tableCell>
    </styledCommon.tableRow>
  );
}

export default TagItem;
