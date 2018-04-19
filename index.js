// Shooting Implementation
var shootingImage=document.getElementById("shootingImage");
function shooting(){
    var imageHeight=parseInt(window.getComputedStyle(shootingImage).height, 10);
    var windowHeight=window.innerHeight;
    var scrollY=window.scrollY;
    var posY=$(shootingImage).offset().top;
    var frameNumber=Math.floor((1-(posY-scrollY+imageHeight)/(imageHeight+windowHeight))*141);
    shootingImage.style.left=(-(frameNumber)*640).toString()+"px";
    console.log(frameNumber);
}
