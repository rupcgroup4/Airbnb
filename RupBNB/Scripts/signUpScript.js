
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
function check() {

	let password = $("#password").val();
	let cnfmPassword = $("#confirmPassword").val();
	let birthDate = $("#birthDate").val();

	if (cnfmPassword = "") {
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