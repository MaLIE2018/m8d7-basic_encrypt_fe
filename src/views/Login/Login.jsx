import React, { createRef, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import styled from "styled-components";
import token from "basic-auth-token";
import { withRouter } from "react-router-dom";
const Styles = styled.div`
  margin-top: 132px;
`;

const Login = (props) => {
  const [valid, setValid] = useState(null);

  const auth = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API_URL}/authors/login`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${token(
              user.current.value,
              pw.current.value
            )}`,
          },
        }
      );
      if (res.ok) {
        let data = await res.json();
        console.log("data:", data);
        localStorage.setItem("authorId", data._id);
        props.history.push("/");
      } else if (res.status === 401) {
        setValid(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const user = createRef();
  const pw = createRef();
  return (
    <Styles>
      <Container fluid='sm'>
        <Row>
          <Col>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  ref={user}
                  type='email'
                  placeholder='Enter email'
                  isInvalid={valid}
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  ref={pw}
                  isInvalid={valid}
                />
              </Form.Group>
              <Form.Group controlId='formBasicCheckbox'>
                <Form.Check type='checkbox' label='Check me out' />
              </Form.Group>
              <Button variant='primary' onClick={() => auth()}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Styles>
  );
};

export default withRouter(Login);
