import { CircleUserRound, FilterIcon, Search } from "lucide-react";
import Plus from '../../../public/plus.webp';
import { useDisclosure } from "@chakra-ui/react";
import ContactModal from "../Modal/ContactModal";

export default function Navbar () {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
        <ContactModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} title={"Add contact"} />
        <div className="w-full flex justify-center text-black/50">
            <div className="py-2 px-12 w-full flex justify-between items-center">
                <div className="flex gap-2">
                    <CircleUserRound />
                    <span>Phonebook</span>
                </div>

                <div className="border border-black/2 rounded-lg">
                    <div className="shadow-lg rounded-lg flex justify-center p-2 gap-2">
                        <Search className="text-black/50" />
                        <input type="text" className="outline-none" placeholder="Search" />
                    </div>
                </div>

                <div className="flex gap-3 items-center" onClick={onOpen}>
                    <FilterIcon className="" />
                    <div className="border border-black/10 shadow-lg px-3 py-2 rounded-2xl flex items-center gap-1">
                        <img src={Plus} className="h-5 w-5 filter" />
                        <button className="text-black/70">
                            Create contact
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}