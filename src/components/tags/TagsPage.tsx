import {useState, useEffect} from 'react';
import {isEmpty} from 'lodash';
import {Button} from '@/components/bootstrap';

import {useAppDispatch, useAppSelector} from '@/hooks';
import {confirmAction} from '@/reducers/commonSlice';
import {setSortOrder} from '@/reducers/tagSlice';

import tagActions from '@/actions/tagActions';

import uiHelper from '@/helpers/uiHelper';

import ListAction from '@/components/common/ListAction';
import SaveTag from '@/components/common/SaveTag';
import AppIcon, {IconName} from '@/components/common/AppIcon';

import TagItem from './components/TagItem';

import {colors} from '@/styles/shared';

import * as styled from './TagsPage.styled';

function TagsPage() {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(state => state.tag.list);
  const sortOrder = useAppSelector(state => state.tag.sortOrder);

  const [tagToEdit, setTagToEdit] = useState<Tag | null>(null);

  useEffect(() => {
    loadTags();
  }, []);

  async function loadTags() {
    await dispatch(tagActions.loadTags());
  }

  function addTag() {
    setTagToEdit({id: 0, title: '', description: ''});
  }

  function editTag(tag: Tag) {
    setTagToEdit({...tag});
  }

  function cancelEditTag() {
    setTagToEdit(null);
  }

  function updateTagState(field: string, value: string) {
    if (!tagToEdit) return;

    setTagToEdit({...tagToEdit, [field]: value});
  }

  async function saveTag() {
    if (!tagToEdit) return;

    await dispatch(tagActions.saveTag(tagToEdit));

    uiHelper.showMessage('Tag was saved');

    await loadTags();

    cancelEditTag();
  }

  function confirmDeleteTag(id: number) {
    dispatch(
      confirmAction({
        title: 'Delete tag',
        action: async () => {
          await deleteTag(id);
        }
      })
    );
  }

  async function deleteTag(id: number) {
    await dispatch(tagActions.deleteTag(id));

    uiHelper.showMessage('Tag was deleted');

    await loadTags();
  }

  async function updateSortOrder(field: styled.tagField) {
    const sortAsc = sortOrder.sortBy === field ? !sortOrder.sortAsc : true;

    const updatedSortOrder = {
      sortBy: field,
      sortAsc
    };

    await dispatch(setSortOrder(updatedSortOrder));
  }

  function renderColumnSortHeader(field: styled.tagField, label: string) {
    const icon: IconName = sortOrder.sortAsc ? 'caretDown' : 'caretUp';
    const isActiveOrder = sortOrder.sortBy === field;

    return (
      <styled.tableCell field={field}>
        <styled.sortContainer onClick={() => updateSortOrder(field)}>
          <Button variant="link">{label}</Button>

          {isActiveOrder && (
            <styled.sortIconContainer isAscending={sortOrder.sortAsc}>
              <AppIcon icon={icon} size="xl" color="gray" />
            </styled.sortIconContainer>
          )}
        </styled.sortContainer>
      </styled.tableCell>
    );
  }

  function render() {
    const anyTags = !isEmpty(tags);

    const editTagVisible = tagToEdit ? true : false;

    return (
      <styled.wrapper>
        <styled.header>
          <ListAction action={addTag} tooltip="Add new tag." icon="plus" color={colors.greenLight} />
        </styled.header>

        {anyTags ? (
          <>
            <styled.tableHeader>
              <styled.tableRow>
                {renderColumnSortHeader('title', 'Title')}
                {renderColumnSortHeader('bookmarkCount', 'Number of bookmarks')}
                {renderColumnSortHeader('description', 'Description')}
                <styled.tableCell field="tools" />
              </styled.tableRow>
            </styled.tableHeader>

            <styled.tableBody>
              {tags.map(tag => {
                return <TagItem key={tag.id} tag={tag} editTagAction={editTag} deleteTagAction={confirmDeleteTag} />;
              })}
            </styled.tableBody>
          </>
        ) : (
          <styled.noTagsMessage>You do not have any tags.</styled.noTagsMessage>
        )}

        {editTagVisible && (
          <SaveTag
            visible={editTagVisible}
            tag={tagToEdit}
            save={saveTag}
            close={cancelEditTag}
            onChange={updateTagState}
          />
        )}
      </styled.wrapper>
    );
  }

  return render();
}

export default TagsPage;
