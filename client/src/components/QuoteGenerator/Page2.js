// Page2.js
import React from 'react';
import { TextField } from '@mui/material';

const Page2 = ({ formik }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Field 1"
        fullWidth
        margin="normal"
        variant="outlined"
        name="field1"
        value={formik.values.field1}
        onChange={formik.handleChange}
        error={formik.touched.field1 && Boolean(formik.errors.field1)}
        helperText={formik.touched.field1 && formik.errors.field1}
      />
    </form>
  );
};

Page2.label = 'Page 2';
Page2.component = Page2;

export default Page2;
