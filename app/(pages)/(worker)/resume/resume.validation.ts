import * as Yup from 'yup';

export const ResumeSchema = Yup.object().shape({
  text: Yup.string().required('Поле обязательно!'),
  country: Yup.string().required('Поле обязательно!'),
  city: Yup.string().required('Поле обязательно!'),
  namePosition: Yup.string().required('Поле обязательно!'),
  age: Yup.number().required('Поле обязательно!'),
});
