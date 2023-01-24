import {Modal, Button} from '@/components/bootstrap';
import {useState} from 'react';

import {useAppSelector} from '@/hooks';

import TagSelector from '@/components/common/TagSelector';

interface Props {
  visible: boolean;
  save: (selectedTagIds: number[]) => void;
  close: () => void;
}

function AddTag({visible, save, close}: Props) {
  const tagsOptions = useAppSelector(state => state.tag.options);

  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);

  function updateSelectedTagState(value: number[]) {
    const selected = tagsOptions.filter(to => {
      return value.indexOf(to.value) !== -1;
    });

    setSelectedTags(selected);
  }

  function handleSave() {
    const selectedTagIds = selectedTags.map(x => x.value);
    save(selectedTagIds);

    setSelectedTags([]);
  }

  function handleClose() {
    close();
    setSelectedTags([]);
  }

  return (
    <Modal show={visible} onHide={close} keyboard={false} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Add tag</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TagSelector
          label="Select tags"
          multi={true}
          options={tagsOptions}
          value={selectedTags}
          onChange={updateSelectedTagState}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Update</Button>
        <Button variant="light" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTag;
