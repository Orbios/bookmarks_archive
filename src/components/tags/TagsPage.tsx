import {useState, useEffect} from 'react';
import {isEmpty} from 'lodash';

import {useAppDispatch, useAppSelector} from '@/hooks';
import {confirmAction} from '@/reducers/commonSlice';

import tagActions from '@/actions/tagActions';

import uiHelper from '@/helpers/uiHelper';

import ListAction from '@/components/common/ListAction';
import SaveTag from '@/components/common/SaveTag';

import TagItem from './components/TagItem';

import {colors} from '@/styles/shared';

import * as styled from './TagsPage.styled';

function TagsPage() {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(state => state.tag.list);

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
                <styled.tableCell field="title">Title</styled.tableCell>
                <styled.tableCell field="description">Description</styled.tableCell>
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
