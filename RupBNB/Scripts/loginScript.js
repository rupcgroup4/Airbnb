$(document).ready(function () {

	$("#loginForm").submit(submitLoginForm);


	$("#signUpBTN").click(function () {
		window.location.replace('signUp.html');
	})

});

function submitLoginForm() {
	let email = $("#email").val();
	let password = $("#password").val();

	let emailAndPassword = {
		Email: email,
		Password: password,
	}

	ajaxCall("POST", "../api/Users/userlogin", JSON.stringify(emailAndPassword), submitLoginFormSuccess, submitLoginFormError);
	return false;

}

function submitLoginFormSuccess(user) {

	localStorage.setItem("CGroup4_user", JSON.stringify(user));
	console.log(user);
}

function submitLoginFormError(err) {

	//password not correct (Unauthrized)
	if (err.status == 401) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Password incorrect'
		})
	}
	else {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'user not found'
		})
	}
}