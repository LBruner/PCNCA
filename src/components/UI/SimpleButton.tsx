import { Button } from "@heroui/react"

const SimpleButton: React.FC<{text:string, bgColor: string, onClick: () => void}> = ({text, bgColor, onClick}) => {
    return (
        <>
            <Button onPress={onClick} variant="solid" className={`${bgColor} text-white`}>{text}</Button>
        </>
    )
}

export default SimpleButton