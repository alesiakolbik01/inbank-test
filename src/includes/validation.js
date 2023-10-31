import {
    Form as VeeForm, Field as VeeField, defineRule, ErrorMessage } from 'vee-validate';
  import {
    required, length, min, max, numeric, email,
    min_value as minVal, max_value as maxVal, confirmed, not_one_of as excluded,
  } from '@vee-validate/rules';
  
  export default {
    install(app) {
      app.component('VeeForm', VeeForm);
      app.component('VeeField', VeeField);
      app.component('ErrorMessage', ErrorMessage);
  
      defineRule('required', required);
      defineRule('min', min);
      defineRule('max', max);
      defineRule('length', length);
      defineRule('numeric', numeric);
      defineRule('email', email);
      defineRule('min_value', minVal);
      defineRule('max_value', maxVal);
      defineRule('confirmed', confirmed);
      defineRule('excluded', excluded);
    },
  };