function login(){
    var username = $("#username").val();
    var password = $("#password").val();

    if(username == ""){
        demo.errorMsg('top','center','username');
        return false;
    }
    if(password == ""){
        demo.errorMsg('top','center','password');
        return false;
    }

    $.post("/auth", {

        username:username,
        password:password
    }).done(function(data) {
            if(data.status == "success"){
                window.location.href = "/dashboard"

            }else{
                demo.showNotificationDanger('top','center');
            }
    });
}
