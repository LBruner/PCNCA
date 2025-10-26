import Image from "next/image"

interface PlantDetailsProps {
    label: string;
    description: string;
    imageSrc: string;
}

const PlantDetails: React.FC<PlantDetailsProps> = ({ label, description, imageSrc }) => {
    return (
        <div className="w-56 py-16 flex flex-col items-center bg-gray-100 p-3 rounded-lg gap-2">
            <Image alt="plant" src={imageSrc} width={50} height={50} />
            <div className="flex flex-col gap-2">
                <p className="text-center font-semibold mt-2">{label}</p>
                <p className="text-center text-sm mt-auto">{description}</p>
            </div>
        </div>
    );
};


export default PlantDetails