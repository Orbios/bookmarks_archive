import {Modal, Button} from '@/components/bootstrap';
import {useState} from 'react';

import validationHelper from '@/helpers/validationHelper';

import TextInput from '@/components/common/TextInput';
import TextAreaInput from '@/components/common/TextAreaInput';

interface Props {
  visible: boolean;
  tag: Tag | null;
  onChange: (field: string, value: string) => void;
  save: () => void;
  close: () => void;
}

function SaveTag({tag, visible, save, close, onChange}: Props) {
  const [errors, setErrors] = useState({title: ''});

  function formIsValid() {
    const formErrors = {
      title: ''
    };

    if (!tag?.title) {
      formErrors.title = 'Title field is required.';
    }

    setErrors(formErrors);

    return validationHelper.isEmptyErrorObject(formErrors);
  }

  function saveAction() {
    if (!formIsValid()) return;

    save();
  }

  function render() {
    if (!tag) return null;

    const isNew = !tag.id;

    const title = isNew ? 'Add tag' : 'Edit tag';
    const btnText = isNew ? 'Add' : 'Update';

    return (
      <Modal show={visible} onHide={close} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextInput
            name="title"
            label="Title"
            value={tag.title}
            onChange={onChange}
            placeholder="Title"
            error={errors.title}
          />
          <TextAreaInput
            name="description"
            rows={2}
            label="Description"
            value={tag.description}
            onChange={onChange}
            placeholder="Description"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={saveAction}>
            {btnText}
          </Button>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return render();
}

export default SaveTag;
