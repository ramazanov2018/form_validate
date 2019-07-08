function formControl(formId) {

    this.formElement = document.getElementById(formId);
    this.btnForm = document.getElementById("btn_register");

    this.phoneValide = false;
    this.emailValide = false;
    this.passwordValide = false;

    this.phoneValidatePattern = /^\+7\d{10}$/;
    this.emailValidatePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    this.passwordValidatePattern = /^.{6,16}$/;

    //Метод срабатывает при не прохождении валидации
    this.FormValidateError = function (element) {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid")
        this.btnForm.disabled = true;
    };

    //Метод срабатывает при  прохождении валидации
    this.FormValidateTrue = function (element) {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        if (this.phoneValide && this.emailValide && this.passwordValide)
        {
            this.btnForm.disabled = false;
        }
        console.log(this.passwordValide);
        console.log(this.emailValide);
    };

    //Валидация телефона
    this.PhoneValidate = function() {
        let self = this;
        let PhoneInput = self.formElement.querySelector('input[name="phone"]');
        let PhoneValidate = false;

        PhoneInput.onfocus = function(){
            let PhoneValue = PhoneInput.value;
            if (PhoneValue === "")
            {
                PhoneInput.value = "+7";
                self.FormValidateError(PhoneInput);
            }
        };

        PhoneInput.oninput = function() {
            let PhoneValue = PhoneInput.value;
            PhoneValidate = self.phoneValidatePattern.test(String(PhoneValue).toLowerCase());
            if (PhoneValidate)
            {
                self.phoneValide = true;
                self.FormValidateTrue(PhoneInput);
            }else
            {
                self.phoneValide = false;
                self.FormValidateError(PhoneInput);
            }
        };
    };

    //Валидация email
    this.EmailValidate = function() {
        let self = this;
        let EmailInput = self.formElement.querySelector('input[name="email"]');
        let EmailValidate = false;

        EmailInput.onfocus = function(){
            let EmailValue = EmailInput.value;
            if (EmailValue === "")
            {
                self.FormValidateError(EmailInput);
            }
        };

        EmailInput.oninput = function() {
            let EmailValue = EmailInput.value;
            EmailValidate = self.emailValidatePattern.test(String(EmailValue).toLowerCase());
            if (EmailValidate)
            {
                self.emailValide = true;
                self.FormValidateTrue(EmailInput);
            }else
            {
                self.emailValide = false;
                self.FormValidateError(EmailInput);
            }
        };
    };

    //Валидация пароля
    this.PasswordValidate = function() {
        let self = this;
        let PasswordInput = self.formElement.querySelector('input[name="password"]');
        let PasswordValidate = false;

        PasswordInput.onfocus = function(){
            let PasswordValue = PasswordInput.value;
            if (PasswordValue === "")
            {
                self.passwordValide = false;
                self.FormValidateError(PasswordInput);
            }
        };

        PasswordInput.oninput = function() {
            let PasswordValue = PasswordInput.value;
            PasswordValidate = self.passwordValidatePattern.test(String(PasswordValue).toLowerCase());
            if (PasswordValidate)
            {
                self.passwordValide = true;
                self.FormValidateTrue(PasswordInput);
            }else
            {
                self.passwordValide = false;
                self.FormValidateError(PasswordInput);
            }
        };
    };

    this.Validate = function () {
        this.PhoneValidate();
        this.EmailValidate();
        this.PasswordValidate();
    }
}

window.onload = function () {
    let userRegControl = new formControl("user_registration");
    userRegControl.Validate();
};