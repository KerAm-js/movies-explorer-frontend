import { useState } from "react";

export function useInputValidator(pattern, errorMessage = 'Некорректные данные') {

    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    const onChange = evt => {
        const target = evt.target;
        const text = target.value;
        const message = target.validationMessage;
        const valid = target.validity.valid;

        setValue(text);
        setError(target.validationMessage);
        setIsValid(target.validity.valid);
        
        if (valid && !message && pattern && !pattern.test(text) ) {
            setError(errorMessage);
            setIsValid(false);
        }
    }

    return [value, error, isValid, onChange];
}