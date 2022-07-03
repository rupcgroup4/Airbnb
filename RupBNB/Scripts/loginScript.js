$(document).ready(function () {

	$("#loginForm").submit(submitLoginForm);


	$("#signUpBTN").click(function () {
		window.location.replace('signUp.html');
	})

});

function submitLoginForm() {
	let email = $("#email").val();
	let password = $("#password").val();

	if (email == 'admin@gmail.com') {
		adminLogIn(password);
		return false;
	}

	
	let emailAndPassword = {
		Email: email,
		Password: password,
	}

	ajaxCall("POST", "../api/Users/userlogin", JSON.stringify(emailAndPassword), submitLoginFormSuccess, submitLoginFormError);
	return false;

}


//this function get call if log in with admin email
function adminLogIn(password) {
	
	if (password != '123') {
		Swal.fire({
			icon: 'error',
			title: 'Admin Log In',
			text: 'Password incorrect'
		});
	}

	let isAdmin = true;

	localStorage.setItem("CGroup4_manager", JSON.stringify(isAdmin));
	window.location.replace("adminView.html");

}


function submitLoginFormSuccess(user) {

	localStorage.setItem("CGroup4_user", JSON.stringify(user));
	console.log(user);
	//move to new page and dosent allow to move back
	window.location.replace("index.html");
}

function submitLoginFormError(err) {

	//password not correct (Unauthrized)
	if (err.status == 401) {

		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Password incorrect'
		});
	}
	else if (err.status == 404) {

		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'user not found'
		});
	}
	else
	{
		sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
		window.location.replace("notFound.html");
    }
}