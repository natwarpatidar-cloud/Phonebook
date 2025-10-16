import { useState } from "react";
import { useSelector } from 'react-redux';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
  Tag,
} from '@chakra-ui/react';
import ContactModal from "../Modal/ContactModal";
import { Edit, Trash2 } from "lucide-react";
import ConfirmationModal from "../Modal/ConfirmationModal";

export default function ContactTable() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isConfirmationOpen, onOpen: onConfirmationOpen, onClose: onConfirmationClose } = useDisclosure();

    const data = useSelector(state => state.contacts.contacts);
    const label = useSelector(state => state.contacts.label);
    const searchQuery = useSelector(state => state.contacts.searchQuery);

    const [contact, setContact] = useState(null);

    const contacts = data.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let filteredContacts = (label !== '') ? contacts.filter(contact => contact.label === label) : contacts;

    function handleEditFormOpen(c) {
        setContact(c);
        onOpen();
    }

    function handleDeleteFormOpen(c) {
        setContact(c);
        onConfirmationOpen();
    }

    return (
        <>
        <ContactModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} title={"Edit contact form"} buttonText={"Edit contact"} data={contact} />
        <ConfirmationModal onClose={onConfirmationClose} isOpen={isConfirmationOpen} data={contact} />

        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr className="w-full flex justify-between">
                        <Th className="w-full">Name</Th>
                        <Th className="w-full">Phone Number</Th>
                    </Tr>
                </Thead>

                <Tbody>
                    <Tr>
                        <Td className="text-xs text-gray-500">CONTACTS ({filteredContacts?.length})</Td>
                    </Tr>
                    {
                        filteredContacts.map((contact) => {
                            return (
                                <Tr key={contact.id} className="hover:bg-gray-200 w-full flex justify-between">
                                    <Td className="flex gap-2 items-center w-1/2">
                                        {
                                            contact?.url ? <img src={contact?.url} className="w-8 h-8 rounded-full bg-amber-600" /> : <img src={`https://robohash.org/${contact.name}`} className="w-8 h-8 rounded-full bg-amber-600" />
                                        }
                                        {contact.name}
                                    </Td>

                                    <Td className="w-1/2 flex justify-between">
                                        <p>{contact.phone}</p>
                                        <div className="flex gap-2">
                                            <Edit size={18} onClick={() => handleEditFormOpen(contact)} className="cursor-pointer" />
                                            <Trash2 size={18} onClick={() => handleDeleteFormOpen(contact)} className="cursor-pointer" />
                                        </div>
                                        <div>
                                            <Tag colorScheme='teal'>{contact.label}</Tag>
                                        </div>
                                    </Td>

                                </Tr>
                            );
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
        </>
    )
}