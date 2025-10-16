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
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, editContact } from '../../context/contactSlice';
import { uploadImageToCloudinary } from '../../utils/imageUpload';

export default function ContactModal({ isOpen, onClose, title, buttonText, data }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: data?.name || '',
    phone: data?.phone || '',
    address: data?.address || '',
    avatar: data?.avatar || null,
    label: data?.label || '',
    url: data?.url || "",
  });

  const [errors, setErrors] = useState({});

  async function handleSubmit() {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!formData.phone?.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address?.trim()) newErrors.address = "Address is required";
    if (!formData.avatar) newErrors.avatar = "Avatar is required";
    if (!formData.label?.trim()) newErrors.label = "Tag is required";

    console.log(formData);
    const url = await uploadImageToCloudinary(formData.avatar);
    
    if(!url) {
      throw new Error("Url not found");
    }

    const newFormData = {...formData, url: url};
    delete newFormData['avatar'];

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted:", newFormData);

      if(data) {
        dispatch(editContact(newFormData));
      } else {
        dispatch(addContact(newFormData));
      }
      setFormData({
        name: "",
        phone: "",
        address: "",
        avatar: null,
        label: "",
        url: "",
      });
      onClose();
      setErrors({});
    }
  }

  useEffect(() => {
    setFormData({
      name: data?.name || '',
      phone: data?.phone || '',
      address: data?.address || '',
      avatar: data?.avatar || null,
      label: data?.label || '',
      url: data?.url || "",
    });
    setErrors({});
  }, [data, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl className="flex flex-col gap-4">

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
                placeholder='Enter phone number'
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
                  accept='image/*'
                  onChange={(e) => {
                    setFormData({ ...formData, avatar: e.target.files[0] })
                  }}
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
          <Button colorScheme='blue' onClick={handleSubmit}>{buttonText}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}