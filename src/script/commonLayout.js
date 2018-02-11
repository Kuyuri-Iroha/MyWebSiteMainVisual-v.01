const gDefLayoutWidth =1920;
const gDefLayoutHeight =1080;


function Init()
{
    document.getElementById("k-hamburger").addEventListener('click', ClickedHamburger);
    document.getElementById("k-globalNavM").style.left ="100%";
}

function LayoutAdjust()
{
    var gloNav =document.getElementById("k-globalNav");
    var hamburger =document.getElementById("k-hamburger");

    if(window.innerWidth <= gDefLayoutWidth / 2)
    {
        gloNav.style.display ="none";
        hamburger.style.display ="inline-block";
    }
    else
    {
        gloNav.style.display ="inline-block";
        hamburger.style.display ="none";
    }
}

function ClickedHamburger()
{
    var gloNavM =document.getElementById("k-globalNavM");

    gloNavPos =parseInt(gloNavM.style.left);
    if(gloNavPos == 100)
    {
        gloNavM.style.left ="0%";
    }
    else
    {
        gloNavM.style.left ="100%";
    }
}