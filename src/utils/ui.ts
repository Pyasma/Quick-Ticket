const getPriorityClass = (priority: string) => {
    switch(priority) {
        case 'high':
            return 'text-red-600 font-bold'
        case 'medium':
            return 'text-yellow-600 font-bold'
        case 'low':
            return 'text-green-600 font-bold'
    }
}



const getStatus = (status: string) => {
    switch(status) {
        case 'Open':
            return 'h-3 w-3 rounded-full bg-green-500'
        case 'Close':
            return 'bg-red-500 h-3 w-3 rounded-full'
        default:
            return 'bg-gray-400 h-3 w-3 rounded-full'
    }
}

export {getPriorityClass, getStatus};