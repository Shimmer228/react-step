import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './CheckoutForm.scss'; //закоментувати для проходження тесту(???)
import { NumericFormat } from 'react-number-format';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/slices/cartSlice';

const CheckoutForm = ({ onFormSubmit }) => {
    const dispatch = useDispatch();
  
    const initialValues = {
      firstName: '',
      lastName: '',
      age: '',
      address: '',
      phone: '',
    };
  
    const validationSchema = Yup.object({
      firstName: Yup.string().required('Ім’я обов’язкове'),
      lastName: Yup.string().required('Прізвище обов’язкове'),
      age: Yup.number().required('Вік обов’язковий').min(18, 'Мінімальний вік 18 років'),
      address: Yup.string().required('Адреса обов’язкова'),
      phone: Yup.string().required('Мобільний телефон обов’язковий'),
    });
  
    const handleSubmit = (values, { resetForm }) => {
      console.log('Оформлення замовлення:', values);
      // Виклик дії для очищення кошика
      dispatch(clearCart());
      localStorage.removeItem('cart');
  
      // Виклик зовнішнього callback для дій після замовлення
      if (onFormSubmit) {
        onFormSubmit();
      }
  
      // Очистити форму
      resetForm();
    };
  
    return (
      <div className="checkout-form">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          
          {({ touched, errors }) => (
            
            <Form>
              <div>
                <label htmlFor="firstName">Ім’я</label>
                <Field name="firstName" type="text" />
                <ErrorMessage name="firstName" component="div" className="error" />
              </div>
  
              <div>
                <label htmlFor="lastName">Прізвище</label>
                <Field name="lastName" type="text" />
                <ErrorMessage name="lastName" component="div" className="error" />
              </div>
  
              <div>
                <label htmlFor="age">Вік</label>
                <Field name="age" type="number" />
                <ErrorMessage name="age" component="div" className="error" />
              </div>
  
              <div>
                <label htmlFor="address">Адреса</label>
                <Field name="address" type="text" />
                <ErrorMessage name="address" component="div" className="error" />
              </div>
  
              <div>
                <label htmlFor="phone">Мобільний телефон</label>
                <Field name="phone">
                         {/*не вийшло, але я старався*/}
                  {({ field }) => (
                    <NumericFormat
                      {...field}
                      format="(###) ###-##-##"
                      mask="_"
                      className="phone-input"
                    />
                  )}
                </Field>
                <ErrorMessage name="phone" component="div" className="error" />
              </div>
  
              <button type="submit">Оформити замовлення</button>
            </Form>
          )}
        </Formik>
      </div>
    );
  };
  
  export default CheckoutForm;