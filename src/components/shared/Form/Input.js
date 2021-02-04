import React, { useContext } from 'react';
import T from 'prop-types';
import { FormContext } from './FormContext';

function Input({ type, name, ...props }) {
  const { values, setValues } = useContext(FormContext);

  const handleChange = event => {
    const valueChanging =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setValues({ ...values, [name]: valueChanging });
  };

  return (
    <input type={type} name={name} onChange={handleChange} placeholder={name} />
  );
}
Input.propTypes = {
  type: T.string.isRequired,
  name: T.string.isRequired,
};

export default Input;
