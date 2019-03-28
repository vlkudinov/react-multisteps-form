import React from "react";
import PropTypes from "prop-types";

const prevButton = ({ currentStep, handlePrev }) =>
  currentStep !== 1 ? (
    <button type="button" className="button-group__button button-group__button_prev" onClick={handlePrev}>
      Back
    </button>
  ) : null;

prevButton.propTypes = {
  currentStep: PropTypes.number.isRequired,
  handlePrev: PropTypes.func.isRequired
};

export default prevButton;
