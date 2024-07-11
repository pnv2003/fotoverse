export const validator = {
    required: {
        check: (field) => field.value,
        message: "This field is required"
    },
    length: (min, max) => { return {
        check: (field) => field.value.length >= min && field.value.length <= max,
        message: `Length must be between ${min} and ${max}`
    }},
    email: {
        check: (field) => field.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        message: "Invalid email pattern"
    },
    file: {
        check: (field) => field.files.length,
        message: "Please select a file"
    },
    fileSize: (max) => { return {
        check: (field) => field.files[0].size / 1024 / 1024 <= max,
        message: `File size must be less than ${max} MB`
    }},
    fileExtension: (extensions) => { return {
        check: (field) => extensions.includes(field.files[0].name.split('.').pop()),
        message: `File must be of type ${extensions.join(', ')}`
    }}
};

export function validate(fcon, error, validator) {
    if (fcon) {
        if (!validator.check(fcon)) {
            fcon.classList.add('is-invalid');
            error.textContent = validator.message;
            return false;
        } else {
            if (fcon.classList.contains('is-invalid')) {
                fcon.classList.remove('is-invalid');
            }
            error.textContent = "";
            return true;
        }
    } else {
        if (!validator.check()) {
            error.textContent = validator.message;
            return false;
        } else {
            error.textContent = "";
            return true;
        }
    }
}