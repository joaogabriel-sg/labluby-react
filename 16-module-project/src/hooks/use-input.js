import { useReducer } from "react";

const defaultState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { ...state, value: action.value };
  }

  if (action.type === "BLUR") {
    return { ...state, isTouched: true };
  }

  if (action.type === "RESET") {
    return defaultState;
  }

  return defaultState;
};

const useInput = (validateValueFn) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, defaultState);

  const valueIsValid = validateValueFn(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
