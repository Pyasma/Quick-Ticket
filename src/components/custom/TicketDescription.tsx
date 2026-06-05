"use client";


import {useState} from "react";

const TicketDescription = ({
    description,
}: {
    description: string
}) => {
    const [readMore, setReadMore] = useState(false)

    return (
        <div>
            <p className={readMore ? "" : "line-clamp-3"}>
                {description}
            </p>
            <button onClick={() =>  setReadMore(!readMore)} className="mt-2 text-blue-500 underline">
                {readMore ? "Show Less" : "Read More"}
            </button>
        </div>
    )
}

export default TicketDescription






