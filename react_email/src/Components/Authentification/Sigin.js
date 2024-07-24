import React from 'react'
import { Heading } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Button, Input } from '@chakra-ui/react';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useDispatch} from 'react-redux';
import { setUser } from '../../Redux/UserSlice';
export default function Sigin(props) {
  //const user = useSelector((state) => state.user.user);
  const dispatch=useDispatch();

  const SigninRequest = async (email, password) => {
    const response = await axios.post('http://localhost:8080/api/v1/auth/signin', {
        email,
        password
      });
      console.log(response);
      if(response.status===200){
        dispatch(setUser(response.data));
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('username',response.data.name);
        localStorage.setItem('imageBas64',response.data.imageBas64);
        localStorage.setItem('user_id',response.data.id);
        console.log(localStorage);

        props.HandleLogin(true);


      }else{
        alert("error");
      }
     
  }
  const validateEmail = email => {
    let error;
    if (email === '') {
      error = 'Email is required';
    } else if (!email.includes('@')) {
      error = 'Email must include @';
    }
    return error;
  };

  const validatePassword = password => {
    let error;
    if (!password) {
      error = 'Password is required';
    }
    return error;
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        
        SigninRequest(values.email, values.password);
        setTimeout(() => {
          //lert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Form
          style={{
            display: 'flex',
            position: 'relative',
            top: '160px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '400px',
            margin: 'auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <Heading
            as="h1"
            size="xl"
            color="green"
            fontWeight="bold"
            fontFamily="Arial"
            textAlign="center"
            marginBottom="20px"
          >
            Sign In
          </Heading>
          <Field name="email" validate={validateEmail}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  {...field}
                  type="email"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email"
                  style={{
                    textAlign: 'center',
                  }}
                />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </FormControl>
            )}
          </Field>
          <Field name="password" validate={validatePassword}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.password && form.touched.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  {...field}
                  type="password"
                  id="exampleInputPassword1"
                  placeholder="Enter your password"
                  style={{
                    textAlign: 'center',
                  }}
                />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme='teal'
            isLoading={props.isSubmitting}
            type='submit'
          >
            Sign In
          </Button>
        </Form>
      )}
    </Formik>
  );
}
