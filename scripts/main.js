var c = document.getElementById("canvas");
var ctx = c.getContext("2d");



WindowResized();
window.onresize = WindowResized;
function WindowResized(){
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}