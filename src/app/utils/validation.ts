import * as yup from 'yup';

export const stepOneSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  interest: yup.string().oneOf(['Cars', 'Music', 'Sport', ''], 'Select a valid interest').required('Interest is required')
});

export const stepTwoSchema = yup.object({
  terms: yup.boolean().oneOf([true], 'You must accept the terms').required(),
  favorite: yup.string().required('This field is required')
})