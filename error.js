var validator = require('validator');

function Error() {
  this.errArr = [];
}

Error.prototype.validateEmail = function (email) {
  if (email.length === 0) {
    this.errArr.push('please enter an email')
  }
  else if (!validator.isEmail(email)) {
    this.errArr.push('invalid email')
  }
}

Error.prototype.validatePassword = function (password, confirmation) {
  if (password.length === 0) {
    this.errArr.push('please enter a password')
  }
  else if (password !== confirmation) {
    this.errArr.push('passwords must match')
  }
  else if (password.length < 7 || password.length > 21) {
    this.errArr.push('password needs to be 8-20 characters long')
  }
}

Error.prototype.validateInput = function (input, title) {
  if (input.length === 0) {
    this.errArr.push('please enter a ' + title)
  }
  else if (input.length < 3 || input.length > 21) {
    this.errArr.push(title + ' needs to be 4-20 characters long')
  }
}

module.exports = Error;
