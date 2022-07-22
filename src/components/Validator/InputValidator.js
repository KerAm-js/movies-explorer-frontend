import { useState } from "react";

export function useInputValidator({pattern, initialValue = '', errorMessage = 'Некорректные данные'}) {

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(initialValue ? true : false);

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
    
    if (valid && !message && pattern && !pattern.test(value)) {
      setError(errorMessage);
      setIsValid(false);
    }
  }

  return [value, error, isValid, onChange, setDefaults];
}