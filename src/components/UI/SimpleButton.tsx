import { Button } from "@heroui/react"

const SimpleButton: React.FC<{text:string, bgColor: string}> = ({text, bgColor}) => {
    return (
        <>
            <Button variant="solid" className={`${bgColor} text-white`}>{text}</Button>
        </>
    )
}

export default SimpleButton