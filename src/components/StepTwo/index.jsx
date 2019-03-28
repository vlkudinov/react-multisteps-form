import React from "react";
import config from "components/Form/config";
import cn from "classnames";

const StepTwo = ({ currentStep, form, errors, handleChange }) => {
  
  if (currentStep !== 2) {
    return null;
  }
  return (
    <React.Fragment>
      {Object.keys(config.stepTwo).map((input, index) => {
        const label = config.stepTwo[input].label;
        const fieldClass = cn({
          field: true,
          form__field: true,
          field_error: errors[input],
          field_typing: form[input]
        });
    
        return (
          <div className={fieldClass} key={index}>
            <input
              type="text"
              className="field__input"
              value={form[input]}
              onChange={e => handleChange(input, e)}
            />
            <label className="field__label">{label}</label>
            <span className="field__message">{`*${label} is reqiured!`}</span>
          </div>
        )
      })}
    </React.Fragment>
  );
};

export default StepTwo;
