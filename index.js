const formSwitchToIn = document.querySelector(".form-switch-to-in");
const formSwitchToUp = document.querySelector(".form-switch-to-up");
const formSignUp = document.querySelector(".form-sign-up");
const formSignIn = document.querySelector(".form-sign-in");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const phoneInput = document.getElementById("phone");
const signUpBtn = document.querySelector(".sign-up-btn");
const userEmailInput = document.getElementById("user-email");
const userPasswordInput = document.getElementById("user-password");
const signInBtn = document.querySelector(".sign-in-btn");
const passwordEye = document.getElementById("password-eye");
const confirmPasswordEye = document.getElementById("confirm-password-eye");
const userPasswordEye = document.getElementById("user-password-eye");

let users = JSON.parse(localStorage.getItem('users')) || [];

const saveLocalStorage = (usersList) => {
  localStorage.setItem('users', JSON.stringify(usersList));
}

const registerToggleForm = () => {
  formSignUp.classList.remove("active")
  formSignIn.classList.add("active")
}
const signInToggleForm = () => {
  formSignIn.classList.remove("active")
  formSignUp.classList.add("active")
}

const toggleEye = (selectedEye, selectedInput) => {
  if(selectedInput.type == 'password'){
    selectedInput.type = 'text';
    selectedEye.classList.remove("unsee")
    selectedEye.classList.add("see")
    return
  }else if(selectedInput.type == 'text'){
    selectedInput.type = 'password';
    selectedEye.classList.remove("see")
    selectedEye.classList.add("unsee")
    return
  }
}

passwordEye.addEventListener("click", () => { toggleEye(passwordEye,passwordInput)});

confirmPasswordEye.addEventListener("click", () => {toggleEye(confirmPasswordEye, confirmPasswordInput)});

userPasswordEye.addEventListener("click", () => {toggleEye(userPasswordEye,userPasswordInput)});

const checkUsername = () => {
  let valid = false;
  const username = nameInput.value.trim();
  if(!username.length){
    showError(nameInput, "This field is required")
  }else{
    showSuccess(nameInput);
    valid = true;
  }
  return valid
}

const checkEmail = () => {
  let valid = false;
  const emailValue = emailInput.value.trim();
  if(!emailValue.length){
    showError(emailInput, "This field is required")
  }else if(!isEmailValid(emailValue)){
    showError(emailInput, "The email is not valid")
  }else{
    showSuccess(emailInput);
    valid = true;
  }
  return valid
}

const checkPassword = () => {
  let valid = false;
  const passwordValue = passwordInput.value.trim();
  if(!passwordValue.length){
    showError(passwordInput, "This field is required")
  }else if(!isPasswordValid(passwordValue)){
    showError(passwordInput, "Password must be between 4 and 8 digits long and include at least one number.")
  }else{
    showSuccess(passwordInput);
    valid = true;
  }
  return valid
}

const checkConfirmPassword = () => {
  let valid = false;
  const confirmPasswordValue = confirmPasswordInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  if(!confirmPasswordValue.length){
    showError(confirmPasswordInput, "This field is required")
  }else if(confirmPasswordValue !== passwordValue){
    showError(confirmPasswordInput, "Passwords do not match")
  }else{
    showSuccess(confirmPasswordInput);
    valid = true;
  }
  return valid
}

const checkPhone = () => {
  let valid = false;
  const phoneValue = phoneInput.value.trim();
  if(!phoneValue.length){
    showSuccess(phoneInput);
    valid = true;
  }else if(!isPhoneValid(phoneValue)){
    showError(phoneInput, "The phone number is not valid")
  }else{
    showSuccess(phoneInput);
    valid = true;
  }
  return valid
}

const checkUserEmail = () => {
  let valid = false;
  const userEmailValue = userEmailInput.value.trim();
  if(!userEmailValue.length){
    showError(userEmailInput, "This field is required")
  }else if(!isEmailValid(userEmailValue)){
    showError(userEmailInput, "The email is not valid")
  }else if(users.some(user => userEmailValue !== user.email)){
    showError(userEmailInput, "The email does not correspond to a registered user")
  }else{
    showSuccess(userEmailInput);
    valid = true;
  }
  return valid
}

const checkUserPassword = () => {
  let valid = false;
  const userPasswordValue = userPasswordInput.value.trim();
  const userEmailValue = userEmailInput.value.trim();

  if(!userPasswordValue.length){
    showError(userPasswordInput, "This field is required")
  }else if(users.some(user => userPasswordValue !== user.password)){
    showError(userPasswordInput, "The password is incorrect.")
  }else{
    showSuccess(userPasswordInput);
    valid = true;
  }
  return valid
}

const isEmailValid = (email) => {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  return re.test(email)
}

const isPasswordValid = (password) => {
  const re = /^(?=.*\d).{4,8}$/;

  return re.test(password)
}

const isPhoneValid = (phone) => {
  const re = /^[0-9]{10}$/;

  return re.test(phone)
}

const showError = (input, message) => {
  const formField = input.parentElement;
  input.classList.add("input-error");
  const placeError = formField.querySelector("span");
  placeError.classList.add("place-error");
  const textError = formField.querySelector("small");
  textError.textContent = message;
}

const showSuccess = (input) => {
  const formField = input.parentElement;
  input.classList.remove("input-error");
  const placeError = formField.querySelector("span");
  placeError.classList.remove("place-error");
  const textError = formField.querySelector("small");
  textError.textContent = "";
}

const submitSignUpForm = (e) => {
  e.preventDefault();

  let isUsernameValid = checkUsername()
  let isEmailValid = checkEmail()
  let isPasswordValid = checkPassword()
  let isConfirmPasswordValid = checkConfirmPassword()
  let isPhoneValid = checkPhone()

  let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isPhoneValid

  if(isFormValid){
    //    formSignUp.submit()
    users = [...users, {name:nameInput.value, email: emailInput.value, password: passwordInput.value, phone:phoneInput.value, userId: users.length}]
    
    console.log(users)
    saveLocalStorage(users)

    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    phoneInput.value = '';
  }
}

const submitSignInForm = (e) => {
  e.preventDefault();

  let isEmailValid = checkUserEmail()
  let isPasswordValid = checkUserPassword()

  let isFormValid = isEmailValid && isPasswordValid

  if(isFormValid){
    //    formSignIn.submit();
    console.log(users)
    userEmailInput.value = '';
    userPasswordInput.value = '';
  }
}

const init = () => {
  formSwitchToIn.addEventListener("click", registerToggleForm);
  formSwitchToUp.addEventListener("click", signInToggleForm);
  formSignUp.addEventListener("submit",submitSignUpForm)
  formSignIn.addEventListener("submit",submitSignInForm)
}

init();

