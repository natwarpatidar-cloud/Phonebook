import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { removeContact } from '../../context/contactSlice';

export default function ConfirmationModal ({ isOpen, onClose, data }) {
    const dispatch = useDispatch();

    function confirmDelete() {
        dispatch(removeContact(data.id));
        onClose();
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Warning</ModalHeader>
                <ModalCloseButton />
        
                <ModalBody>
                    <p>
                        Are you sure? you wanna delete this contact?
                    </p>
                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' colorScheme='blue' mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' onClick={confirmDelete}>Delete</Button>
                </ModalFooter>

            </ModalContent>
        </Modal>
    )
}