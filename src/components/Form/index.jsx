import React from "react";
import axios from "axios";
import StepOne from "components/StepOne";
import StepTwo from "components/StepTwo";
import StepThree from "components/StepThree";
import StepMarkers from "components/StepMarkers";
import NextButton from "components/NextButton";
import PrevButton from "components/PrevButton";
import config from "components/Form/config";
import "./style.scss";

export default class FeedBackForm extends React.Component {
  state = {
    currentStep: 1,
    form: {
      name: "",
      surname: "",
      email: "",
      password: "",
      nickname: "",
      phone: "",
      country: "",
      city: "",
      images: []
    },
    submittedMessage: "",
    errors: {}
  };
  
  nextStep = () => {
    let currentStep = this.state.currentStep;
    
    if (this.validateStep()) {
      currentStep = currentStep < 3 ? currentStep + 1 : currentStep;
      this.setState({currentStep});
    }
  };
  
  prevStep = () => {
    let currentStep = this.state.currentStep;
    
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({currentStep});
  };
  
  validateImages = (images) => {
    let errors = {};
    
    !images.length ? errors['images'] = "noImages" : errors['images'] = null;
    
    return errors;
  };
  
  validateField = (fieldName, value) => {
    let errors = {};
    
    !value ? errors[fieldName] = "noValue" : errors[fieldName] = null;
    
    return errors;
  };
  
  handleImageDelete = index => {
    const {form} = this.state;
    const updatedImages = form.images.filter((item, i) => i !== index);
    const errors = this.validateImages(updatedImages);
    
    this.setState({
      form: {...form, images: updatedImages},
      errors: {...this.state.errors, ...errors}
    });
  };
  
  handleChangeField = (fieldName, {target: {value}}) => {
    const {form} = this.state;
    
    const errors = this.validateField(fieldName, value);
    this.setState({
      form: {...form, [fieldName]: value},
      errors: {...this.state.errors, ...errors}
    });
  };
  
  handleChangeImages = (e) => {
    const {form} = this.state;
    const {target: {files}} = e;
    
    const newImages = [...files].map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    const updatedImages = [...form.images, ...newImages];
    const errors = this.validateImages(updatedImages);
    e.target.value = null;
    
    return this.setState({
      form: {...form, images: updatedImages},
      errors: {...this.state.errors, ...errors}
    });
  };
  
  
  validateStep() {
    const {form, currentStep} = this.state;
    const {stepOne, stepTwo} = config;
    let errors = {};
    let stepValid;
    
    if (currentStep === 1) {
      Object.keys(stepOne).map(field => {
        errors = {...errors, ...this.validateField(field, form[field])};
      });
    }
    if (currentStep === 2) {
      Object.keys(stepTwo).map(field => {
        errors = {...errors, ...this.validateField(field, form[field])};
      });
    }
    this.setState({errors: {...this.state.errors, ...errors}});
    stepValid = !Object.values(errors).filter(value => value).length;
    
    return stepValid;
  }
  
  handleSubmitForm = e => {
    e.preventDefault();
    
    const {form} = this.state;
    const formData = new FormData();
    
    Object.keys(form).map(key => formData.append(`${key}`, form[key]));
    form.images.map((image, index) =>
      formData.append(`file${index}`, image.file)
    );
    
    this.setState({sending: true});
    axios
    .post("/form", formData)
    .then(response => {
      this.setState({
        submittedMessage: response.data
      });
    })
    .catch(() =>
      this.setState({
        submittedMessage: 'Error'
      })
    );
  };
  
  renderForm() {
    const {currentStep, form, errors} = this.state;
    return (
      <form
        onSubmit={this.handleSubmitForm}
        className="form"
        encType="multipart/form-data"
      >
        <StepMarkers currentStep={currentStep}/>
        <StepOne
          currentStep={currentStep}
          form={form}
          errors={errors}
          handleChange={this.handleChangeField}
        />
        <StepTwo
          currentStep={currentStep}
          form={form}
          errors={errors}
          handleChange={this.handleChangeField}
        />
        <StepThree
          currentStep={currentStep}
          error={errors["images"]}
          images={form.images}
          handleChange={this.handleChangeImages}
          handleDelete={this.handleImageDelete}
        />
        <div className="form__button-group button-group">
          <PrevButton
            currentStep={this.state.currentStep}
            handlePrev={this.prevStep}
          />
          <NextButton
            currentStep={this.state.currentStep}
            handleNext={this.nextStep}
          />
        </div>
      </form>
    );
  }
  
  render() {
    return this.renderForm();
  }
}
