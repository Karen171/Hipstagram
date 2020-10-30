export const loginValidationData = {
    required: {
        value: true,
        message: "Login can't be empty"
    },
    pattern: {
        value: /^[a-zA-Z]+$/,
        message: 'Invalid login. Login must consists of only alphabetic characters'
    }
}
export const emailValidationData = {
    required: {
        value: true,
        message: "Email can't be empty"
    },
    pattern: {
        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Invalid Email. Email must be type "email@gmail.com"'
    }
}
export const passwordValidationData = {
    required: {
        value: true,
        message: "Password can't be empty"
    },
    minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
    },
    maxLength: {
        value: 16,
        message: "Password must have at least 16 characters"
    },
    pattern: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        message: 'Invalid Password'
    }
}
export const nameValidationData = {
    maxLength: {
      value: 50,
      message: 'Name must be no more than 50 characters'
    },
    pattern: {
      value: /^[a-zA-Z ]+$/,
      message: 'Name can contain large and small latin characters'
    }
}