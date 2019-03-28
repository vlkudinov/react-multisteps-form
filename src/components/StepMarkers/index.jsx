import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

const StepMarkers = ({ currentStep, steps = 3 }) => (
    <div className="form__step-markers step-markers">
      <ul className="step-markers__list">
        {Array.from(Array(steps).keys()).map((_, index) => {
          const itemClass = cn({
            "step-markers__item": true,
            "step-markers__item_active": index + 1 <= currentStep
          });

          return (
            <li key={index} className={itemClass}>
              <span className="step-markers__number">{index + 1}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );

StepMarkers.propTypes = {
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.number
};

export default StepMarkers;
