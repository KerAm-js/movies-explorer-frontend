import { useState } from "react";

export function useInputValidator(pattern, errorMessage = 'Некорректные данные') {

    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    const setDefaults = () => {
        setValue('');
        setError('');
        setIsValid('');
    }

    const onChange = evt => {
        const target = evt.target;
        const value = target.value;
        const message = target.validationMessage;
        const valid = target.validity.valid;

        setValue(value);
        setError(message);
        setIsValid(valid);
        
        if (valid && !message && pattern && !pattern.test(value) ) {
            console.log('ok')
            setError(errorMessage);
            setIsValid(false);
        }
    }

    return [value, error, isValid, onChange, setDefaults];
}