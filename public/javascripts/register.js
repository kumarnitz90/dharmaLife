/**
 * Created by user on 11/10/2017.
 */
function register(){
    var company = $("#company").val();
    var username = $("#username").val();
    var email = $("#email").val();
    var fName = $("#fName").val();
    var lName = $("#lName").val();
    var password = $("#password").val();
    var aboutMe = $("#me").val();


    if(username == ""){
        demo.errorMsg('top','center','username');
        return false;
    }

    if(email == ""){
        demo.errorMsg('top','center','email');
        return false;
    }
    if(fName == ""){
        demo.errorMsg('top','center',' Firstname');
        return false;
    }

    if(lName == ""){
        demo.errorMsg('top','center','last name');
        return false;
    }

    if(password == ""){
        demo.errorMsg('top','center','password');
        return false;
    }








    $.post("/userSave", {
        company: company,
        username:username,
        email:email,
        fName:fName,
        lName:lName,
        password:password,
        aboutMe:aboutMe,
        role:"user"
    }).done(function(data) {

        if(data.data == "success"){


                demo.showNotification('top','center');



            setTimeout(function(){
                window.location.href = "/login";
            },3000);

              //



        }

    });
}