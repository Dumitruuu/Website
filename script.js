let secret = "3e864120fd4db31422dc8ac14250b77a";
let dropDowns = document.getElementsByClassName("dropdown");
let overlay = document.getElementById("overlay-contact")
let contactForm = document.getElementById("form-contact");

document.getElementById("overlay-contact-close").addEventListener("click", () => {
    overlay.style.transform = "translate(-100%)";
    document.getElementsByTagName("body")[0].style.overflowY = "scroll";
});

for(let el of dropDowns) {
    el.addEventListener("mouseenter", () => {
        verticalSlide(el.childNodes[1], true);
        el.children[1].style.visibility = "hidden";
    });
    el.addEventListener("mouseleave", () => {
        verticalSlide(el.childNodes[1], false);
        el.children[1].style.visibility = "visible";
    });
    el.addEventListener("click", () => {
        overlay.style.transform = "translate(0%)";
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";
        validate(contactForm.getElementsByTagName("input"));
    });
}

overlay.addEventListener("click", () => {
    overlay.style.transform = "translate(-100%)";
});

overlay.childNodes[1].addEventListener("click", (event) => {
    event.stopPropagation();
});

function verticalSlide(over, on) {
    if(on) {
        over.style.transform = "translateY(0%)";
    } else {
        over.style.transform = "translateY(-100%)";
    }
}

/*
if(el.type == "text") {
                    if(/\W/.test(el.value)) {
                        displayFormError("The name can only contain latin characters, digits and underscore.", 30);
                        errors++;
                    } else {
                        !errors || (errors = errors - 1);
                        console.log(errors, "_1_");
                    }
                } else if(el.type == "email") {
                    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(el.value)) {
                        displayFormError("Please enter a valid email adress.");
                        errors++;
                    } else {
                        !errors || (errors = errors - 1);
                        console.log(errors, "_2_");
                    }
                }
*/

function validate(fields) {
    // 1,2 - Names // 3 - Email
    for(let el of fields) {
        el.addEventListener("keyup", () => {
            clearTimeout(el.timeout);
            el.timeout = setTimeout(() => {
                for(let i=0; i<fields.length; i++) {
                    if(fields[i].type == "text") {
                        if(/[a-z]+|[A-Z]+\W/.test(fields[i].value)) {
                            displayFormError("The name can only contain latin characters, digits and underscore and start with a letter.", 30);
                            for(let j=i+1; j<fields.length; j++) {
                                fields[j].disabled = true;
                            }
                            break;
                        } else {
                            for(let j=i+1; j<fields.length; j++) {
                                fields[j].disabled = false;
                            }
                            console.log("GOod");
                        }
                    } else if(fields[i].type == "email") {
                        if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(el.value)) {
                            displayFormError("Please enter a valid email adress.");
                            for(let j=i+1; j<fields.length; j++) {
                                fields[j].disabled = true;
                            }
                            break;
                        } else {
                            
                        }
                    }
                }
            }, 500);
        });
    }
}

function displayFormError(err, newHeight) {
    let target = document.getElementById("overlay-contact-message");
    target.innerText = err;
    target.style.height = newHeight + "px";
}
