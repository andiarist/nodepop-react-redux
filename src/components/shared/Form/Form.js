import React, { useState } from 'react';
import T from 'prop-types';

import { FormContext } from './FormContext';

function Form({ initialValues, onSubmit, children }) {
  const [values, setValues] = useState(initialValues);
  const handleSubmit = ev => {
    ev.preventDefault();
    onSubmit(values);
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormContext.Provider value={{ values, setValues }}>
        {children}
      </FormContext.Provider>
    </form>
  );
}

Form.propTypes = {
  onSubmit: T.func.isRequired,
  initialValues: T.object.isRequired,
  children: T.node.isRequired,
};

export default Form;
