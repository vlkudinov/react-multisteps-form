import React from "react";
import cn from 'classnames';
import config from "components/Form/config";

const StepOne = ({currentStep, form, errors, handleChange}) => {
  
  if (currentStep !== 1) {
    return null;
  }
  return (
    <React.Fragment>
      {Object.keys(config.stepOne).map((input, index) => {
        const label = config.stepOne[input].label;
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

export default StepOne;
