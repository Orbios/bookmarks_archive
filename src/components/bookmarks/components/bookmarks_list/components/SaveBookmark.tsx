import {Modal, Button} from '@/components/bootstrap';
import {useState} from 'react';

import {useAppSelector, useAppDispatch} from '@/hooks';

import tagActions from '@/actions/tagActions';

import validationHelper from '@/helpers/validationHelper';
import uiHelper from '@/helpers/uiHelper';

import SaveTag from '@/components/common/SaveTag';
import TextInput from '@/components/common/TextInput';
import TextAreaInput from '@/components/common/TextAreaInput';
import TagSelector from '@/components/common/TagSelector';

interface Props {
  visible: boolean;
  bookmark: Bookmark | null;
  save: () => void;
  close: () => void;
  onChange: (field: string, value: any) => void;
  onLoad: () => void;
}

function SaveBookmark({visible, bookmark, save, close, onChange, onLoad}: Props) {
  const dispatch = useAppDispatch();

  const tagsOptions = useAppSelector(state => state.tag.options);

  const [tagToEdit, setTagToEdit] = useState<Tag | null>(null);
  const [errors, setErrors] = useState({title: '', url: ''});

  function formIsValid() {
    if (!bookmark) return false;

    const formErrors = {
      title: '',
      url: ''
    };

    if (!bookmark.title) {
      formErrors.title = 'Title field is required.';
    }

    if (!bookmark.url) {
      formErrors.url = 'Url field is required.';
    }

    if (!validationHelper.isValidUrl(bookmark.url)) {
      formErrors.url = 'Url is not valid.';
    }

    setErrors(formErrors);

    return validationHelper.isEmptyErrorObject(formErrors);
  }

  async function handleSave() {
    if (!formIsValid()) return;
    save();
  }

  function showTagModal() {
    setTagToEdit({id: 0, title: '', description: ''});
  }

  async function saveTag() {
    if (!tagToEdit) return;

    await dispatch(tagActions.saveTag(tagToEdit));

    uiHelper.showMessage('Tag was saved');

    await onLoad();

    cancelEditTag();
  }

  function cancelEditTag() {
    setTagToEdit(null);
  }

  function updateTagState(field: string, value: string) {
    if (!tagToEdit) return;
    setTagToEdit({...tagToEdit, [field]: value});
  }

  function render() {
    if (!bookmark) return null;

    const editTagVisible = tagToEdit ? true : false;

    const isNew = !bookmark.id;

    const title = isNew ? 'Add bookmark' : 'Edit bookmark';
    const btnText = isNew ? 'Add' : 'Update';

    const selectedTags = tagsOptions.filter(tagOption => {
      return bookmark.tags.find(tag => tag.id === tagOption.value);
    });

    return (
      <>
        <Modal show={visible} onHide={close} keyboard={false} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextAreaInput
              name="title"
              rows={2}
              label="Title"
              value={bookmark.title}
              onChange={onChange}
              placeholder="Title"
              error={errors.title}
            />

            <TextInput
              name="url"
              label="Url"
              value={bookmark.url}
              onChange={onChange}
              placeholder="Url"
              error={errors.url}
            />

            <TagSelector
              label="Tags"
              multi={true}
              options={tagsOptions}
              value={selectedTags}
              onChange={value => onChange('tags', value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={showTagModal}>
              Add new tag
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {btnText}
            </Button>
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <SaveTag
          visible={editTagVisible}
          tag={tagToEdit}
          save={saveTag}
          close={cancelEditTag}
          onChange={updateTagState}
        />
      </>
    );
  }

  return render();
}

export default SaveBookmark;
