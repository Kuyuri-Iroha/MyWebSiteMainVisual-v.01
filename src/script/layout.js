
$(document).ready(function() {
    $("#k-wrapper").css("opacity", 1);
    Init();
    LayoutAdjust();
});
$(window).resize(function() {
    LayoutAdjust();
});


//Layout adjustment
function LayoutAdjust()
{
    var w =window.innerWidth;
    var h =window.innerHeight;

    var mainLogo =document.getElementById("k-mainLogo");
    var topGloNav =document.getElementById("k-topGloNav");
    var hamburger =document.getElementById("k-hamburger");

    if(w < gDefLayoutWidth / 2)
    {
        if(w < 470)
        {
            mainLogo.style.width ="70%";
        }
        else
        {
            mainLogo.style.width =(459 / 1.5) + "px";
            mainLogo.style.height =(147 / 1.5) + "px";
        }
        topGloNav.style.display ="none";
        hamburger.style.display ="block";
    }
    else
    {
        mainLogo.style.width =(459) + "px";
        mainLogo.style.height =(147) + "px";
        topGloNav.style.display ="block";
        hamburger.style.display ="none";
        $("#k-topContents").css("top", (431 - 50 * (gDefLayoutHeight / h)) / gDefLayoutHeight * h + "px");
    }
}