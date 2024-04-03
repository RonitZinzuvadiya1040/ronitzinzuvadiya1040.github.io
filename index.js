document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('ftco-navbar');
    const toggleBtn = document.getElementById('nav-button');

    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && event.target !== toggleBtn) {
            const navCollapse = nav.querySelector('.navbar-collapse');
            if (navCollapse.classList.contains('show')) {
                toggleBtn.click(); // Simulate a click to close the navbar
            }
        }
    });
});

function sendmail(){
    var params = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        subject: document.getElementById("subject"),
        message: document.getElementById("message")
    };
    
    const serviceID = "service_4bf1ic3";
    const templateID = "template_tkczt5r";

    let hasError = false;

    const errorValidation = (id) => {
        let error = document.getElementById(`${id}Error`);
        error.classList.remove('error');
        hasError = true;
    }

    const addClass = (id) =>{
        let error = document.getElementById(`${id}Error`);
        error.classList.add('error');
    }
    
    // Name Validation Error
    if (params?.name?.value?.length < 2) 
        errorValidation(params?.name?.id); 
    else 
        addClass(params?.name?.id);

    // Email Validation Error
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!params?.email?.value || !emailRegex.test(params?.email?.value)) {
        errorValidation(params?.email?.id);
    } else {
        addClass(params?.email?.id);
    }


    // Subject Validation Error
    if (params?.subject?.value?.length <= 3) 
        errorValidation(params?.subject?.id); 
    else 
        addClass(params?.subject?.id);

    // Message Validation Error
    if(params?.message?.value?.length > 200 || params?.message?.value?.length == 0) 
        errorValidation(params?.message?.id); 
    else 
        addClass(params?.message?.id);

    
    if(!hasError){
        params.name = params.name.value;
        params.email = params.email.value;
        params.subject = params.subject.value;
        params.message = params.message.value;
    
        emailjs.send(serviceID, templateID,params)
        .then(
            res => {
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("subject").value = "";
                document.getElementById("message").value = "";
    
                showAlert(); // Show the alert box
            }
        )
        .catch((err) => console.log(err));
    }
}

// Custom alert message on form submit
function showAlert() {
    var alertBox = document.getElementById("alertBox");
    alertBox.style.display = "block";
}
  
function closeAlert() {
    var alertBox = document.getElementById("alertBox");
    alertBox.style.display = "none";
}

function updateNavbarToggle() {
    var navbarToggler = document.querySelector('.navbar-toggler');
    var currentWidth = window.innerWidth;
    var previousWidth = updateNavbarToggle.previousWidth || currentWidth; // Initialize previousWidth if not set

    if (Math.abs(currentWidth - previousWidth) > 1) {
        if (navbarToggler) {
            if (currentWidth <= 768) { // Adjust the width as needed
                navbarToggler.classList.remove('navbar-toggler');
            } else {
                navbarToggler.classList.add('navbar-toggler');
            }
        }

        updateNavbarToggle.previousWidth = currentWidth; // Update previousWidth
    }
}

// Call the function initially and add an event listener for window resize
updateNavbarToggle();

// Call the function initially and on window resize
window.addEventListener('load', updateNavbarToggle);
window.addEventListener('resize', updateNavbarToggle);