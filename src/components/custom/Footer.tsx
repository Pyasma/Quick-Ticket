import { FaTicketAlt } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex items-center justify-between border-t px-6 py-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
                <FaTicketAlt className="text-2xl" />
                <span className="font-semibold text-black">Quick Ticket</span>
            </div>

            <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                <span>All systems operational</span>
            </div>

            <div>© {currentYear} Quick Ticket</div>
        </div>
    );
};

export default Footer;
