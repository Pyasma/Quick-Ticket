import Link from "next/link"
import { Button } from "../ui/button"

const Body = () => {
 return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <div>
            <h1 className="text-4xl font-bold">
                Welcome to Quick Ticket
            </h1>

            <p className="mt-2 text-lg text-muted-foreground">
                Best and Fast Alternate to Linear
            </p>
        </div>

        <div className="mt-8 flex gap-4">
            <Button className="px-6 py-4">
                <Link href="/tickets/new">
                    Submit Ticket
                </Link>
            </Button>

            <Button className="px-6 py-4">
                <Link href="/tickets">
                    View Tickets
                </Link>
            </Button>
        </div>
    </div>
 )
}

export default Body