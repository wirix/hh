import * as Yup from 'yup';

export const signInSchema = Yup.object().shape({
  email: Yup.string().email(`Неверно указан email`).required('Поле обязательно!'),
  password: Yup.string().required('Поле обязательно!').min(8, 'Минимум 8 символов'),
});
