import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const SearchBox = () => 
{
  const [keyword, setKeyword] = useState('');
  let history = useHistory();

  const submitHandler = (e) => 
  {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };
  
  return (
    <Form onSubmit={submitHandler} className="d-flex" inline>
      <Form.Control
        type="text"
        placeholder="Search for products"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="me-sm-2"></Form.Control>

      <Button type="submit" variant="outline-success" className="my-2 my-sm-0">
        <i className='fas fa-search'></i>
      </Button>
    </Form>
  );
}

export default SearchBox;
