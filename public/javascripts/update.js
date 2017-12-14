/**
 * Created by user on 11/10/2017.
 */
function updateProfile(){
    var company = $("#company").val();
    var username = $("#username").val();
    var email = $("#email").val();
    var fName = $("#fName").val();
    var lName = $("#lName").val();
    var password = $("#password").val();
    var aboutMe = $("#me").val();
    var oldPas = $("#password").attr("name");

    $.post("/updateUser", {
        company: company,
        username:username,
        email:email,
        fName:fName,
        lName:lName,
        password:password,
        aboutMe:aboutMe,
        role:"user",
        oldPas : oldPas
    }).done(function(data) {

        if(data == "success"){

            demo.showNotificationSuccessUpdate('top','center');



            setTimeout(function(){
                window.location.href = "/dashboard";
            },2000);

        }else{
            window.location.href = "/logout";
        }

    });


}

function deleteUser(){
    $("#accountAlert").click();
}

function deleteConfirm(){
    $.post("/deleteProfile", {

    }).done(function(data) {
        if(data == "success"){
            window.location.href = "/"
        }
    });
}

//function loadDash(){
//    $.get("/dashboard", {
//
//    }).done(function(data) {
//        //console.log(data.result.profilePic.$binary);
//    });
//}