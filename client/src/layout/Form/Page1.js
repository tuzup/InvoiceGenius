import React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { Autocomplete, Grid, TextField, Button } from '@mui/material';
import { clientNames } from '../../config';

const Page1 = ({ formik }) => {

    const { errors, touched, getFieldProps } = formik;

    const handleAutocompleteChange = (event, newValue) => {
        formik.setFieldValue('companyName', newValue ? newValue.label : '');
        formik.setFieldValue('companyContactPerson', newValue ? newValue.clientContactPerson : '');
        formik.setFieldValue('companyAddress', newValue ? newValue.clientAddress : '');
        formik.setFieldValue('companyEmail', newValue ? newValue.clientEmail : '');
        formik.setFieldValue('companyGST', newValue ? newValue.clientGST : '');
        formik.setFieldValue('companyPhone', newValue ? newValue.clientPhone : '');
    };

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Autocomplete
                            freeSolo
                            variant="outlined"
                            name="companyName"
                            {...getFieldProps('companyName')}
                            onChange={handleAutocompleteChange}
                            options={clientNames}
                            renderInput={(params) => (
                                <TextField {...params} label="*Company Name"
                                    {...getFieldProps('companyName')}
                                    value={formik.values.companyName}
                                    error={Boolean(touched.companyName && errors.companyName)}
                                    helperText={touched.companyName && errors.companyName}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Contact Person"
                            name="companyContactPerson"
                            {...getFieldProps('companyContactPerson')}
                            error={Boolean(touched.companyContactPerson && errors.companyContactPerson)}
                            helperText={touched.companyContactPerson && errors.companyContactPerson}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="*Company Address"
                            name="companyAddress"
                            {...getFieldProps('companyAddress')}
                            error={formik.touched.companyAddress && Boolean(formik.errors.companyAddress)}
                            helperText={formik.touched.companyAddress && formik.errors.companyAddress}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Company GST"
                            name="companyGST"
                            {...getFieldProps('companyGST')}

                            error={formik.touched.companyGST && Boolean(formik.errors.companyGST)}
                            helperText={formik.touched.companyGST && formik.errors.companyGST}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="*Email ID"
                            name="companyEmail"
                            {...getFieldProps('companyEmail')}
                            error={formik.touched.companyEmail && Boolean(formik.errors.companyEmail)}
                            helperText={formik.touched.companyEmail && formik.errors.companyEmail}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="*Phone Number"
                            name="companyPhone"
                            {...getFieldProps('companyPhone')}
                            error={formik.touched.companyPhone && Boolean(formik.errors.companyPhone)}
                            helperText={formik.touched.companyPhone && formik.errors.companyPhone}
                        />
                    </Grid>

                </Grid>
            </Form>
        </FormikProvider>
    );
};

Page1.label = 'Customer Details';
Page1.component = Page1;

export default Page1;
