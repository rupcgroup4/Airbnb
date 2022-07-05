
//if user is loged in and tries to go to login.html from url
if (window.localStorage.getItem('CGroup4_user') != null) {
	window.location.replace("index.html");
}

//on document load activate submit to login form
//and add on click to signup button to redirect to signUp page
$(document).ready(function () {

	

	$("#loginForm").submit(submitLoginForm);
	$("#signUpBTN").click(function () {
		window.location.replace('signUp.html');
	})

});

//when user submit login
//if admin logged in send the details for adminLogin function
function submitLoginForm() {
	let email = $("#email").val();
	let password = $("#password").val();

	//if admin is logged in
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

	localStorage.setItem("CGroup4_user", JSON.stringify({ Email: "admin@gmail.com" }));
	window.location.replace("adminView.html");

}

//logged in SCB
//save user details in the loacal storage
//redirect the user to index.html
function submitLoginFormSuccess(user) {
	localStorage.setItem("CGroup4_user", JSON.stringify(user));
	window.location.replace("index.html");
}

//error call back of submit login
//return satus 401 if the password was incorrect
//return status 404 if user is not found
//else return any other error satus code and redirect user to notFound.html (exception)
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