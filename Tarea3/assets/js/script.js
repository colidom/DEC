function fadeWindow() {
    const scaryImage = document.getElementById("scaryImage");
    scaryImage.style.width = "999px";
    scaryImage.style.height = "800px";
    scaryImage.removeAttribute("hidden");

    setTimeout(function () {
        scaryImage.style.width = "0px";
        scaryImage.style.height = "0px";
    }, 3000);
}
