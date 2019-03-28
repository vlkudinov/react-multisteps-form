import React from "react";
import deleteButton from 'components/Form/images/delete.svg'
import cn from "classnames";

const StepThree = ({currentStep, images, error, handleChange, handleDelete}) => {
  const inputClass = cn({
    form__upload: true,
    upload: true,
    upload_error: error
  });

  if (currentStep !== 3) {
    return null;
  }
  return (
    <div className={inputClass}>
      <div className="upload__button">
        <input
          type="file"
          className="upload__input"
          onChange={e => handleChange(e)}
          multiple
          accept="image/*"
        />
      </div>
      <span className="upload__message">{`*No images selected!`}</span>
      <div className="upload__preview preview">
        <ul className="preview__list">
          {images.map((image, index) => (
            <li key={index} className="preview__item">
              <img className="preview__img" src={image.preview} alt="" />
              <img src={deleteButton} className="preview__icon" onClick={() => handleDelete(index)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StepThree;
