import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
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
import ConfirmationModal from "../Modal/ConfirmationModal";
import { BookmarkMinus, BookmarkPlus, Edit, Trash2 } from "lucide-react";
import { toggleBookmark } from "../../context/contactSlice";
import ContactDetailsModal from "../Modal/ContactDetailsModal";

export default function ContactTable() {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isConfirmationOpen, onOpen: onConfirmationOpen, onClose: onConfirmationClose } = useDisclosure();
    const { isOpen: isContactDetailsModalOpen, onOpen: onContactDetailsModalOpen, onClose: onContactDetailsModalClose } = useDisclosure();

    const data = useSelector(state => state.contacts.contacts);
    const label = useSelector(state => state.contacts.label);
    const searchQuery = useSelector(state => state.contacts.searchQuery);

    const [contact, setContact] = useState(null);

    const contacts = data.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let filteredContacts = (label !== '') ? contacts.filter(contact => contact.label === label) : contacts;

    filteredContacts.sort((a, b) => {
        if (a.bookmarked === b.bookmarked) {
            return a.name.localeCompare(b.name);
        }
        return b.bookmarked - a.bookmarked;
    });

    function handleEditFormOpen(c) {
        setContact(c);
        onOpen();
    }

    function handleDeleteFormOpen(c) {
        setContact(c);
        onConfirmationOpen();
    }

    function handleBookmark(c) {
        dispatch(toggleBookmark(c.id));
    }

    function handleContactDetails(c) {
        setContact(c);
        onContactDetailsModalOpen();
    }

    return (
        <>

        <ContactDetailsModal 
            onClose={onContactDetailsModalClose}
            isOpen={isContactDetailsModalOpen}
            data={contact}
        />

        <ContactModal
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
            title={"Edit contact form"}
            buttonText={"Edit contact"}
            data={contact}
        />
        
        <ConfirmationModal
            onClose={onConfirmationClose}
            isOpen={isConfirmationOpen}
            data={contact}
        />

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
                        filteredContacts.map((contact) => (
                            <Tr key={contact.id} className="hover:bg-gray-200 w-full flex justify-between">
                                <Td className="flex gap-2 items-center w-1/2 hover:bg-gray-300 cursor-pointer" onClick={() => handleContactDetails(contact)}>
                                    {
                                        contact?.url
                                            ? <img src={contact.url} className="w-8 h-8 rounded-full bg-amber-600" />
                                            : <img src={`https://robohash.org/${contact.name}`} className="w-8 h-8 rounded-full bg-amber-600" />
                                    }
                                    <p>{contact.name}</p>
                                    <Tag className="mx-6" colorScheme='teal'>{contact.label}</Tag>
                                </Td>

                                <Td className="w-1/2 flex justify-between">
                                    <p className="w-full">{contact.phone}</p>
                                    <div className="w-full flex gap-2 justify-around items-center">
                                        {
                                            contact.bookmarked
                                                ? <BookmarkMinus size={25} className="text-red-500 cursor-pointer" onClick={() => handleBookmark(contact)} />
                                                : <BookmarkPlus size={25} className="text-blue-500 cursor-pointer" onClick={() => handleBookmark(contact)} />
                                        }
                                        <div className="flex gap-2">
                                            <Edit size={20} onClick={() => handleEditFormOpen(contact)} className="cursor-pointer" />
                                            <Trash2 size={20} onClick={() => handleDeleteFormOpen(contact)} className="cursor-pointer" />
                                        </div>
                                    </div>
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
        </>
    );
}