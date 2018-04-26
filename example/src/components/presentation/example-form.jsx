import React from 'react'
import {
  Button,
  Checkbox,
  CurrencyInput,
  DateInput,
  Dropzone,
  FileInput,
  RadioGroup,
  RadioButtonGroup,
  SelectInput,
  TextArea,
  TextInput,
  ToggleSwitch
} from 'bloom-inputs'

let selectOptions = [
  { label: 'Muffins', value: 'muffins' },
  { label: 'Cookies', value: 'cookies' },
  { label: 'Cakes', value: 'birthday cakes' }
]

function updateOptions(value) {
  selectOptions = selectOptions.map(opt => {
    return opt.value === value
      ? { ...opt, label: `${opt.label}!` }
      : { ...opt, label: opt.label.replace(/!/g, '') }
  })
}

const ExampleForm = props => {
  // I am a reference form
  const formData = props.formData || {
    textinput: null,
    password: null,
    checkbox: null,
    radio: null,
    select: null,
    toggle: null,
    'file-simple': null,
    'file-simple-2': null,
    'file-droppable': null,
    textarea: null
  }
  const radioOptions = [
    { label: 'Radio 1', id: 'radio-1' },
    { label: 'Radio 2', id: 'radio-2' },
    { label: 'Radio 3', id: 'radio-3' }
  ]
  const radioOptions2 = [
    { label: 'RadioButton 1', id: 'radio-button-1' },
    { label: 'RadioButton 2', id: 'radio-button-2' },
    { label: 'RadioButton 3', id: 'radio-button-3' }
  ]

  const toggleClick = e => {
    e.preventDefault()
    props.manualFieldUpdate(
      props.formId,
      'toggle',
      formData && formData.toggle && !formData.toggle.value
    )
  }

  return (
    <form
      id='example-form'
      className='Form AuthForm'
      noValidate
      style={{ padding: '0 50px' }}
    >
      <h3 className='AuthForm-header'>Example Form</h3>
      <TextInput
        id='textinput'
        name='textinput'
        label='Text Input'
        showLabel
        value={formData.textinput ? formData.textinput.value : ''}
        onChange={props.updateForm}
        placeholder='Regular old Text Input'
      />
      <TextInput
        error={formData.password ? formData.password.error : ''}
        id='password'
        name='password'
        label='Password'
        showLabel
        isPassword
        required
        value={formData.password ? formData.password.value : ''}
        onChange={props.updateForm}
        validateAs='not-empty'
      />
      <TextInput
        id='onlyBloop'
        name='onlyBloop'
        label='Must equal &quot;bloop&quot;'
        showLabel
        required
        value={formData.onlyBloop ? formData.onlyBloop.value : ''}
        onChange={props.updateForm}
        validateAs='must-equal-bloop'
        onBlur={props.checkField}
        error={
          formData.onlyBloop && formData.onlyBloop.error
            ? formData.onlyBloop.error
            : ''
        }
      />
      <Button
        contents='Trigger Multiple check'
        id='multiple-check-button'
        onClick={e => {
          e.preventDefault()
          props.checkMultipleFields('example-form', ['onlyBloop', 'password'])
        }}
      />
      <Button
        contents='Trigger Visible check'
        id='visible-check-button'
        onClick={e => {
          e.preventDefault()
          props.checkForVisibleFields(props.formId)
        }}
      />
      <Checkbox
        label='Checkbox'
        checked={(formData.checkbox && formData.checkbox.value) || ''}
        id='checkbox'
        name='checkbox'
        onChange={props.updateForm}
        showLabel
      />
      <RadioGroup
        options={radioOptions}
        onChange={props.updateForm}
        name='radio'
        value={formData.radio ? formData.radio.value : ''}
      />
      <RadioButtonGroup
        options={radioOptions2}
        onChange={props.updateForm}
        name='radio2'
        value={formData.radio2 ? formData.radio2.value : ''}
      />
      <DateInput
        id='date'
        name='date'
        label='Date Input'
        showLabel
        value={formData.date ? formData.date.value : ''}
        onChange={props.updateForm}
      />
      <CurrencyInput
        label='Currency Input'
        showLabel
        required
        coinIcon={
          <img src='http://www.freeiconspng.com/uploads/bitcoin-coin-currency-digital-currency-digital-walet-money-icon-30.png' />
        }
        onChange={props.updateForm}
        id='currency'
        name='currency'
        currency='BTC'
        value={
          formData.currency && formData.currency.value
            ? formData.currency.value
            : '0'
        }
      />
      <div style={{ zIndex: 7 }}>
        {/* notice the z-indices to help make sure select inputs overlap properly */}
        <SelectInput
          options={selectOptions}
          name='select'
          formId='example-form'
          value={
            formData.select && formData.select.value
              ? formData.select.value
              : ''
          }
          onBlur={props.checkField}
          onChange={props.manualFieldUpdate}
          required
          showLabel
          label='Select Input'
          validateAs='not-empty'
          error={
            formData.select && formData.select.error
              ? formData.select.error
              : ''
          }
        />
      </div>
      <div style={{ zIndex: 6 }}>
        <SelectInput
          options={selectOptions}
          name='select2'
          formId='example-form'
          typeAhead={false}
          value={
            formData.select2 && formData.select2.value
              ? formData.select2.value
              : ''
          }
          onChange={(
            formId = this.props.formId,
            name,
            value,
            type = 'text'
          ) => {
            console.log(formId, name, value, type)
            props.manualFieldUpdate(formId, name, value, type)
            updateOptions(value)
          }}
          showLabel
          label='Select Input -- No TypeAhead'
          error={
            formData.select2 && formData.select2.error
              ? formData.select2.error
              : ''
          }
        />
      </div>
      <div style={{ zIndex: 5 }}>
        <SelectInput
          error={
            formData.select4 && formData.select4.error
              ? formData.select4.error
              : ''
          }
          formId='example-form'
          label='Select Input -- Multiple'
          multiple
          name='select4'
          onChange={props.manualFieldUpdate}
          options={selectOptions}
          showLabel
          typeAhead={false}
          value={
            formData.select4 && formData.select4.value
              ? formData.select4.value
              : ''
          }
        />
      </div>
      <div style={{ zIndex: 4 }}>
        <SelectInput
          options={selectOptions}
          clearable
          name='select3'
          formId='example-form'
          typeAhead={false}
          value={
            formData.select3 && formData.select3.value
              ? formData.select3.value
              : ''
          }
          onChange={props.manualFieldUpdate}
          showLabel
          label='Select Input -- Clearable'
          error={
            formData.select3 && formData.select3.error
              ? formData.select3.error
              : ''
          }
        />
      </div>
      <div style={{ zIndex: 3 }}>
        <ToggleSwitch
          labelText='Toggle Switch'
          name='toggle'
          onClick={toggleClick}
          isActive={
            formData.toggle && formData.toggle.value
              ? formData.toggle.value
              : false
          }
          innerLabels={{ on: 'On', off: 'Off' }}
        />
      </div>
      <div style={{ zIndex: 2 }}>
        <FileInput
          name='file-simple'
          label='Basic File Input'
          id='file-simple'
          onChange={props.manualFieldUpdate}
          formId='example-form'
          multiple={false}
        />
        <FileInput
          clearable
          name='file-simple-2'
          label='Multi File Input'
          id='file-simple-2'
          onChange={props.manualFieldUpdate}
          formId='example-form'
          multiple
        />
      </div>
      <Dropzone
        name='file-droppable'
        label='Droppable File Input'
        id='file-droppable'
        onChange={props.manualFieldUpdate}
        formId='example-form'
        files={
          (formData['file-droppable'] && formData['file-droppable'].value) || []
        }
      />
      <TextArea
        formData={formData || { message: 'why am i undefined?' }}
        name='textarea'
        label='Large Text Area'
        onChange={props.updateForm}
        showLabel
      />
      <Button
        className='Btn AuthForm-submit-button u-justify-center'
        contents='Submit Button'
        id='example-form-submit-button'
        onClick={props.submitForm}
      />
    </form>
  )
}

export default ExampleForm
