import useMyInput from "../hooks/use-my-input";

const BasicForm = (props) => {
  const {
    value: firstNameValue,
    isValueValid: isFirstNameValueValid,
    hasError: hasFirstNameError,
    errorMessage: firstNameErrorMessage,
    handleChangeInputValue: handleChangeFirstNameInputValue,
    handleBlurInput: handleBlurFirstNameInput,
    reset: resetFirstName,
  } = useMyInput(
    "First name must not be empty.",
    (value) => value.trim() !== ""
  );

  const {
    value: lastNameValue,
    isValueValid: isLastNameValueValid,
    hasError: hasLastNameError,
    errorMessage: lastNameErrorMessage,
    handleChangeInputValue: handleChangeLastNameInputValue,
    handleBlurInput: handleBlurLastNameInput,
    reset: resetLastName,
  } = useMyInput(
    "Last name must not be empty.",
    (value) => value.trim() !== ""
  );

  const {
    value: emailValue,
    isValueValid: isEmailValueValid,
    hasError: hasEmailError,
    errorMessage: EmailErrorMessage,
    handleChangeInputValue: handleChangeEmailInputValue,
    handleBlurInput: handleBlurEmailInput,
    reset: resetEmail,
  } = useMyInput("Please enter a valid e-mail.", (value) =>
    value.includes("@")
  );

  const isFormValid =
    isFirstNameValueValid && isLastNameValueValid && isEmailValueValid;

  const handleSubmitForm = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    resetFirstName();
    resetLastName();
    resetEmail();
  };

  const getInputFieldClassesWithOrWithoutError = (hasError) => {
    return hasError ? "form-control invalid" : "form-control";
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="control-group">
        <div
          className={getInputFieldClassesWithOrWithoutError(hasFirstNameError)}
        >
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={firstNameValue}
            onChange={handleChangeFirstNameInputValue}
            onBlur={handleBlurFirstNameInput}
          />
          {hasFirstNameError && (
            <p className="error-text">{firstNameErrorMessage}</p>
          )}
        </div>

        <div
          className={getInputFieldClassesWithOrWithoutError(hasLastNameError)}
        >
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={lastNameValue}
            onChange={handleChangeLastNameInputValue}
            onBlur={handleBlurLastNameInput}
          />
          {hasLastNameError && (
            <p className="error-text">{lastNameErrorMessage}</p>
          )}
        </div>

        <div className={getInputFieldClassesWithOrWithoutError(hasEmailError)}>
          <label htmlFor="email">E-Mail Address</label>
          <input
            type="text"
            id="email"
            value={emailValue}
            onChange={handleChangeEmailInputValue}
            onBlur={handleBlurEmailInput}
          />
          {hasEmailError && <p className="error-text">{EmailErrorMessage}</p>}
        </div>
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
