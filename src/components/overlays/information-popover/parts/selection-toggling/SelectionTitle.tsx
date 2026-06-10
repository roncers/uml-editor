import { useState } from "react"

export default function SelectionTitle({ children, startValue }: { children: React.ReactNode, startValue?: boolean }) {
    const [isSelected, setIsSelected] = useState(startValue ?? false)

    function toggleSelection(e: React.MouseEvent) {
        if (e.ctrlKey) {
            setIsSelected(!isSelected)
        }
    }

    return (
        <div>
            <h4 onClick={toggleSelection} className={`g-mimic-text ${isSelected ? "g-mimic-selected" : ""}`}>
                {children}
            </h4>
        </div>
    )
}