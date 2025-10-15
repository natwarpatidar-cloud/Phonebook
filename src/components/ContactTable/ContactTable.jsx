import { useEffect, useState } from "react"
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
} from '@chakra-ui/react'
import ContactModal from "../Modal/ContactModal";
import { Edit2, Trash } from "lucide-react";
import ConfirmationModal from "../Modal/ConfirmationModal";


export default function ContactTable() {
    const [contacts, setContacts] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isConfirmationOpen, onOpen: onConfirmationOpen, onClose: onConfirmationClose } = useDisclosure();
    const data = useSelector(state => state.contacts.contacts);

    const [contact, setContact] = useState(null);
    
    useEffect(() => {
        if(data) {
            setContacts(data);
        }
    }, [data]);

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
                    <Tr>
                        <Th>Name</Th>
                        <Th>Phone Number</Th>
                        <Th></Th>
                    </Tr>
                </Thead>

                <Tr>
                    <Td className="text-sm text-gray-500">CONTACTS ({contacts.length})</Td>
                </Tr>
                <Tbody>
                    {
                        contacts?.map((contact) => {
                            return (
                                <Tr key={contact.id} className="hover:bg-gray-300">
                                    <Td className="flex gap-2 items-center">
                                        <img src={`https://robohash.org/${contact.name}`} className="w-8 h-8 rounded-full bg-amber-600" />
                                        {contact.name}
                                    </Td>
                                    <Td>{contact.phone}</Td>

                                    <Td className="flex gap-2">
                                        <Edit2 size={18} onClick={() => handleEditFormOpen(contact)} />
                                        <Trash size={18} className="text-red-300" onClick={() => handleDeleteFormOpen(contact)} />
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