$(document).ready(function() {

    $("#MainHeader")
    .append(
        `
            <nav id="NavBar" class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Airbnb</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="apartments.html">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Search</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Something</a>
                            </li>
                        </ul>
                        <div class="dropdown" id="profileBTN">
                            <a class="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fas fa-user"></i>
                            </a>
                        
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                            <li><a class="dropdown-item" href="profilePage.html">Profile</a></li>
                            <li><a class="dropdown-item" href="#">Become Host</a></li>
                            <li><a class="dropdown-item" href="#">Log Out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        `
  )


})

