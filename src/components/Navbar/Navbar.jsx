import { CircleUserRound, FilterIcon, Search } from "lucide-react";
import Plus from '../../../public/plus.webp';
import { useDisclosure } from "@chakra-ui/react";
import ContactModal from "../Modal/ContactModal";
import { useEffect, useState } from "react";
import { useDebounce } from '../../hooks/useDebounce';
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../context/contactSlice";

export default function Navbar () {

    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [search, setSearch] = useState("");
    const debounceVal = useDebounce(search, 1000);

    function onSearch (value) {
        dispatch(setSearchQuery(value));  
    }

    useEffect(() => {
        if(debounceVal) {
            onSearch(debounceVal);
        }
    }, [onSearch, debounceVal]);

    return (
        <>
        <ContactModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} title={"Add contact form"} buttonText={"Add contact"}/>
        <div className="w-full flex justify-center text-black/70 font-semibold text-lg">
            <div className="py-2 px-12 w-full flex justify-between items-center">
                <div className="flex gap-2">
                    <CircleUserRound />
                    <span>Phonebook</span>
                </div>

                <div className="border border-black/2 rounded-lg">
                    <div className="shadow-lg rounded-lg flex justify-center p-2 gap-2">
                        <Search className="text-black/50" />
                        <input type="text" value={search} name="searchQuery" onChange={(e) => setSearch(e.target.value)} className="outline-none" placeholder="Search" />
                    </div>
                </div>

                <div className="flex gap-3 items-center">
                    <FilterIcon className="cursor-pointer" />
                    <div className="border border-black/10 shadow-lg px-3 py-2 cursor-pointer rounded-2xl flex items-center gap-1" onClick={onOpen}>
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