
$(document).ready(function() {

	$("#signUpForm").submit(submitSignUpForm);
	
	
	//$("#loginBTN").click(function () {
	//	window.location.replace('login.html');
	//})

});


//submit sign up form function
//fetch the data of the user input and send api call to store the user data in DB
function submitSignUpForm() {

	let email = $("#email").val();
	let userName = $("#userName").val();
	let password = $("#password").val();
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

function submitSignUpFormSuccess(user)
{
	localStorage.setItem("CGroup4_user", JSON.stringify(user));
	window.location.replace("index.html");

	Swal.fire({
		icon: 'success',
		title: 'Sign Up successful',
		text: 'Welcome ' + user.UserName
	})
}

function submitSignUpFormError(err) {
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: 'Email already in our system'
	})
}