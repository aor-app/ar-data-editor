function paddingZero(value){
    return  ('00' + value ).slice(-2);
}
function showLoadingAnimation(message){
    $.mobile.loading("show", {
        text: message,
        textVisible: true
    });
}
function hideLoadingAnimation(){
    $.mobile.loading("hide");
}
