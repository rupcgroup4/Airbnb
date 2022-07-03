//on document activate submit function to the signUp form
$(document).ready(function() {
	$("#signUpForm").submit(submitSignUpForm);
});

//submit sign up form function
//fetch the data of the user input and send api call to store the user data in DB
function submitSignUpForm() {

	let email = $("#email").val();
	let userName = $("#userName").val();
	let password = $("#password").val();
	let cnfmPassword = $("#confirmPassword").val();
	let firstName = $("#firstName").val();
	let lastName = $("#lastName").val();
	let birthDate = $("#birthDate").val();
	
	let newUser = {
		Email: email,
		UserName: userName,
		Password: password,
		FirstName: firstName,
		LastName: lastName,
		BirthDate: birthDate,
	}

	ajaxCall("POST", "../api/Users", JSON.stringify(newUser), submitSignUpFormSuccess, submitSignUpFormError);

	return false;
}

//add custom validators for passwords and age
//check age is 18+
//check confim password is not empty and is match  to the password
function check() {

	let password = $("#password").val();
	let cnfmPassword = $("#confirmPassword").val();
	let birthDate = $("#birthDate").val();

	if (cnfmPassword == "") {
		document.getElementById("confirmPassword").setCustomValidity("Confirm your password");
		return false;
	}

	if(password != cnfmPassword) {
		document.getElementById("confirmPassword").setCustomValidity("Those passwords didn’t match. Try again");
		return false;
	}

	if(!check18Age(birthDate)) {
		document.getElementById("birthDate").setCustomValidity("Not 18 yet");
		return false;
	}
}

//this functionreturn true if the age of the user is 18+
//return flase otherwise
function check18Age() {
    var today = new Date();
    var birthDate = new Date($("#birthDate").val());
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

	if(age < 18) {
		return false;
	}
	return true;
}

//sign up SCB, save the user details to local storage
//redirect to index.html
function submitSignUpFormSuccess(user)
{
	localStorage.setItem("CGroup4_user", JSON.stringify(user));
	window.location.replace("index.html");
}

//error call back function of submitSignUpFormError
//if there wa an exception redirect the user to notFound page
//else the user was already in the system and was not created
function submitSignUpFormError(err) {

	if (err.status == 500) {
		sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
		window.location.replace("notFound.html");
	}

	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: 'Email already in our system'
	})
}