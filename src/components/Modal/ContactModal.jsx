import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../context/contactReducer';

export default function ContactModal({ isOpen, onOpen, onClose, title }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    avatar: null,
    label: ""
  });

  const [errors, setErrors] = useState({});

  function handleAddContact() {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.avatar) newErrors.avatar = "Avatar is required";
    if (!formData.label.trim()) newErrors.label = "Tag is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted:", formData);
      dispatch(addContact(formData));
      setFormData({
        name: "",
        phone: "",
        address: "",
        avatar: null,
        label: ""
      })
      onClose(); 
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl className='flex flex-col gap-2'>

            <FormControl isInvalid={errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                type='text'
                placeholder='Enter your name'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errors.phone}>
              <FormLabel>Phone no.</FormLabel>
              <Input
                type='tel'
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <FormErrorMessage>{errors.phone}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errors.address}>
              <FormLabel>Address</FormLabel>
              <Input
                type='text'
                placeholder='Enter city/address'
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              {errors.address && <FormErrorMessage>{errors.address}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errors.avatar}>
              <FormLabel>Avatar</FormLabel>
              <Input
                type='file'
                onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
              />
              {errors.avatar && <FormErrorMessage>{errors.avatar}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errors.label}>
              <FormLabel>Select Tag</FormLabel>
              <Select
                placeholder='Tag'
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              >
                <option value='work'>Work</option>
                <option value='school'>School</option>
                <option value='friends'>Friends</option>
                <option value='family'>Family</option>
              </Select>
              {errors.label && <FormErrorMessage>{errors.label}</FormErrorMessage>}
            </FormControl>

          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' colorScheme='red' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue' onClick={handleAddContact}>Add contact</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
