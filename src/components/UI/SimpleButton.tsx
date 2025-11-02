import { Button } from "@heroui/react"

interface SimpleButtonProps {
  text: string;
  bgColor: string;
  onClick: () => void;
  disabled?: boolean;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({text, bgColor, onClick, disabled}) => {
    return (
        <>
            <Button onPress={onClick} variant="solid" className={`${bgColor} text-white`} isDisabled={disabled}>
                {text}
            </Button>
        </>
    )
}

export default SimpleButton
