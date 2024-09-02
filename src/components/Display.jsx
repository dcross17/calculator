export default function Display({ currentNumber, expression}) {
    return (
        <div className="my-3">
            <p className = "text-md text-gray-500 text-right px-6">
                {expression}
            </p>
            <p className = "text-5xl text-right px-4">
                {currentNumber}
            </p>
        </div>
    )
}