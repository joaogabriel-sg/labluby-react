import { useState } from "react";

const useMyInput = (errorMessage, validateValue) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValueValid = validateValue(value);
  const hasError = !isValueValid && isTouched;

  const handleChangeInputValue = (event) => {
    if (!isTouched) setIsTouched(true);
    setValue(event.target.value);
  };

  const handleBlurInput = () => {
    if (!isTouched) setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    isValueValid,
    hasError,
    errorMessage,
    handleChangeInputValue,
    handleBlurInput,
    reset,
  };
};

export default useMyInput;
