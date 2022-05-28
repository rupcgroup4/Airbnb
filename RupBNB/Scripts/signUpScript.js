
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
	let password = $("#password").val();
	let firstName = $("#firstName").val();
	let lastName = $("#lastName").val();
	let birthDate = $("#birthDate").val();

	let newUser = {
		Email: email,
		Password: password,
		FirstName: firstName,
		LastName: lastName,
		BirthDate: birthDate,
	}

	ajaxCall("POST", "../api/Users", JSON.stringify(newUser), submitSignUpFormSuccess, submitSignUpFormError);

	return false;
}

function submitSignUpFormSuccess(result)
{
	consol.log(result);
}

function submitSignUpFormError(err) {
	alert(err);
}