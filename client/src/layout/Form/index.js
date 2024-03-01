// MultiPageForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';

// Import your form pages
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

const pages = [Page1, Page2, Page3];

const MultiPageForm = ({title}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const totalSteps = pages.length;

   const validationSchema = Yup.object({
    companyName: Yup.string().required('Company Name is required'),
    companyAddress: Yup.string().required('Company Address is required'),
    companyEmail: Yup.string().email('Invalid email address').required('Email ID is required'),
    companyPhone: Yup.string().required('Phone Number is required'),
  });

  const formik = useFormik({
    initialValues: {
      // Your form fields here
      companyName: null,
      companyAddress: '',
      companyPhone: '',
      companyEmail: '',
      companyGST: '',
      companyContactPerson: ''
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      // Handle form submission
      console.log('Form submitted with values:', values);
      // Add your form submission logic here
    }
  });

  const handleNext = () => {
      // Manually trigger validation before proceeding to the next step
      formik.validateForm().then((errors) => {
          if (Object.keys(errors).length === 0) {
              // If there are no validation errors, proceed to the next step
              setActiveStep((prevStep) => prevStep + 1);
          }
      });
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const currentPage = pages[activeStep];
  const CurrentPageComponent = currentPage.component;

  return (
    <Container component="main" >
        <Box
      sx={{
        backgroundColor: theme => theme.palette.primary.main,
        color: theme => theme.palette.primary.contrastText,
        width: '100%',
        padding: 2,
        paddingBottom: "80px"
      }}
       
    >
      <Container>
      {/* Your content goes here */}
      <Typography variant="h4" p={3}>
        {title}
      </Typography>
       <Typography variant="subtitle" p={3}>
        Enter the detials to generate the quote
      </Typography>
      </Container>
    </Box>
    <Container  maxWidth="md" sx={{marginTop: "-50px"}}>
      <Paper elevation={2} sx={{ padding: 4, display: 'flex', flexDirection: 'column' }}>
        <Box my={4} sx={{width: '100%'}}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {pages.map((page, index) => (
            <Step key={index}>
              <StepLabel>{page.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        </Box>

        <CurrentPageComponent formik={formik} validationSchema={validationSchema}/>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          {activeStep > 0 && (
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
          )}
          {activeStep < totalSteps - 1 && (
            <Button variant="contained" onClick={handleNext} sx={{ marginLeft: 2 }}>
              Next
            </Button>
          )}
          {activeStep === totalSteps - 1 && (
            <Button variant="contained" color="primary" onClick={formik.submitForm} sx={{ marginLeft: 2 }}>
              Submit
            </Button>
          )}
        </div>
      </Paper>
      </Container>
    </Container>
  );
};

export default MultiPageForm;
