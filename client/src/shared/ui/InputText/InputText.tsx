import { useState } from "react";
import "./InputText.css";

interface InputTextProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
  required?: boolean;
}

function InputText({
  value,
  onChange,
  placeholder,
  disabled = false,
  multiline = false,
  required = false,
}: InputTextProps) {
  const [touched, setTouched] = useState(false);

  const showError = required && touched && !value.trim();

  const className = `input-text ${
    disabled ? "input-text--disabled" : ""
  } ${showError ? "input-text--error" : ""}`;

  const handleChange = (value: string) => {
    setTouched(true);
    onChange(value);
  };

  if (multiline) {
    return (
      <div className="input-text__wrapper">
        <textarea
          className={`${className} input-text__textarea`}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
        />

        {showError && (
          <span className="input-text__error">Обязательное поле</span>
        )}
      </div>
    );
  }

  return (
    <div className="input-text__wrapper">
      <input
        className={className}
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />

      {showError && (
        <span className="input-text__error">Обязательное поле</span>
      )}
    </div>
  );
}

export default InputText;
