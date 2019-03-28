import React from "react";
import PropTypes from "prop-types";

const NextButton = ({ currentStep, handleNext }) =>
  currentStep < 3 ? (
    <button type="button" className="button-group__button button-group__button_next" onClick={handleNext}>
      Next
    </button>
  ) : null;

NextButton.propTypes = {
  currentStep: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired
};

export default NextButton;
