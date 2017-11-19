let forms = {
  "form1": {
    formName: "form1",
    pristine: true,
    formValidate: (values) => { return errors },
    values: {
      "username": "John Doe",
      "email": "john@gmail.com"
    },
    touched: {
      "username": true,
      "email": true
    },
    errors: {
      "username": "",
      "email": "Invalid email"
    },
  }
};