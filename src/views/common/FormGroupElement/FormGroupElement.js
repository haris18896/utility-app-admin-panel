import classNames from 'classnames'
import React from 'react'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'

function FormGroupElement({
  labelClassName,
  label,
  autoFocus,
  inputType,
  inputName,
  placeholder,
  formikTouched,
  formikError,
  defaultValue,
  style,
  formGroupClassName,
  formikTouchedClass,
  formikErrorClass,
  children,
  onChange,
  accept,
  ...props
}) {
  return (
    <FormGroup className={formGroupClassName}>
      <Label className={labelClassName} htmlFor={inputName}>
        {label}
      </Label>
      <Input
        autoFocus={autoFocus}
        type={inputType}
        name={inputName || ''}
        style={style}
        id={inputName || ''}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        accept={accept}
        className={classNames({
          'is-invalid': `${formikTouched || formikTouchedClass || ''}` && `${formikError || formikErrorClass || ''}`
        })}
        {...props}
      >
        {children}
      </Input>
      {`${formikTouched || ''}` && `${formikError || ''}` ? <FormFeedback>{formikError}</FormFeedback> : null}
    </FormGroup>
  )
}

export default FormGroupElement
