import React from "react";

const FormErrorText: React.FC<{errors: string[]}> = ({errors}) => {
    return (
        <div className="p-1 text-sm text-red-600 rounded">
            {errors.join(', ')}
        </div>
    )
}

export default FormErrorText;