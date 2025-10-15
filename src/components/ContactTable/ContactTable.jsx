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
import { Edit2 } from "lucide-react";


export default function ContactTable() {
    const [contacts, setContacts] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
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

    return (
        <>
        <ContactModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} title={"Edit contact form"} buttonText={"Edit contact"} data={contact} />
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Phone Number</Th>
                        <Th></Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        contacts?.map((contact) => {
                            return (
                                <Tr key={contact.id}>
                                    <Td className="flex gap-2">
                                        <img src={`https://robohash.org/${contact.name}`} className="w-5 h-5 rounded-full bg-amber-600" />
                                        {contact.name}
                                    </Td>
                                    <Td>{contact.phone}</Td>
                                    <Td>
                                        <Edit2 onClick={() => handleEditFormOpen(contact)} />
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