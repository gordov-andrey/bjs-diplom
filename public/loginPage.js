"use strict";
const userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login(data, response => {
      response.success ? location.reload() : user.setLoginErrorMessage(response.data);
      console.log(response);
    });
  }

  userForm.registerFormCallback = data => {
    ApiConnector.register(data, response => {
      response.success ? location.reload() : user.setRegisterErrorMessage(response.data);
      console.log(response);
    });
  }