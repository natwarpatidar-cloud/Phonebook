import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'

export default function ContactModal({ isOpen, onOpen, onClose, title}) {

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <FormControl className='flex flex-col gap-2'>
              <div>
                <FormLabel>Name</FormLabel>
                <Input type='text' />
              </div>
              <div>
                <FormLabel>Phone no.</FormLabel>
                <Input type='tel' />
              </div>
              <div>
                <FormLabel>Address</FormLabel>
                <Input type='text' />
              </div>
              <div>
                <FormLabel>Avatar</FormLabel>
                <Input type='file' />
              </div>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Cancle
            </Button>
            <Button variant='ghost' colorScheme='blue'>Add contact</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}