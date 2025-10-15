import ContactTable from "../components/ContactTable/ContactTable";
import Navbar from "../components/Navbar/Navbar";

export default function Contacts () {
    return (
        <div className="space-y-4 px-12">
            <Navbar />
            <ContactTable />
        </div>
    )
}