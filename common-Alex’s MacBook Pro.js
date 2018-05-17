var md = new showdown.Converter();
var docSet = document.getElementsByClassName("markdown");
for (var i = 0; i < docSet.length; i++) {
    var temp = docSet[i];
    $.get("https://wuetal.github.io/EuroCuration/md/" + temp.id + ".md", function (data) {
        temp.innerHTML = md.makeHtml(data);
    });
}

var pSetWithImg = $('.markdown p:has(img)');
for (var i = 0; i < pSetWithImg.length; i++) {
    var left = window.getComputedStyle(pSetWithImg[i]).left;
    pSetWithImg[i].style = {
        width: '100vw',
        position: "relative",
        left: -left
    };
}

var container = document.getElementById("contentContainer");
var allImg = $(".image .label");
var allText = $(".text .label");
var allVideo = $(".video .label");

addLabelAll(allImg, "image");
addLabelAll(allText, "text");
addLabelAll(allVideo, "video");

function addLabelAll(all, type) {
    for (var i = 0; i < all.length; i++) {
        all[i].innerHTML = "<em>" + raiseFirst(type) + " " + (i + 1) + ".</em> ";
    }
}

function raiseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


//Image Set Display

//Insert Initial Image
var currentImg = {};
var allImgSet = document.getElementsByClassName("imageSet");
for (var i = 0; i < allImgSet.length; i++) {
    var tempDiv = allImgSet[i];
    var nodeName = tempDiv.dataset.folder;
    var tempImg = document.getElementById(nodeName);
    tempImg.src = imgSetUrlSynth(nodeName, 1);
    currentImg[nodeName] = 1;
    addCaption(tempImg.parentNode, 1);
}

//image Url Synthesis
function imgSetUrlSynth(nodeName, number) {
    return "/EuroCuration/src/" + nodeName + "/" + number + ".jpg";
}

//Handling image switching
var allForwardOverlay = document.getElementsByClassName("backwardOverlay");
var allBackwardOverlay = document.getElementsByClassName("forwardOverlay");
var allCaptionOverlay = document.getElementsByClassName("captionOverlay");

function imageSwitch(element, direction) {
    var node = element.parentElement;
    var nodeName = node.dataset.folder;
    var nextNum = currentImg[nodeName] + direction;
    var max = parseInt(node.dataset.max);
    if (nextNum > max) {
        nextNum = 1;
    } else if (nextNum < 1) {
        nextNum = max;
    }
    var tempImg = document.getElementById(nodeName);
    tempImg.src = imgSetUrlSynth(nodeName, nextNum);
    currentImg[nodeName] = nextNum;
    addCaption(node, nextNum);
}

function addCaption(node, number) {
    var caption = $(node).find('.captionOverlay')[0];
    caption.style.height = "30px";
    caption.style.width =
        $(caption.parentNode).find('img')[0].width;
    $(caption).find('.num')[0].innerHTML =
        "<em>" + node.dataset.caption + ". " + number + "</em>. ";
}

for (var i = 0; i < allForwardOverlay.length; i++) {
    var element = allForwardOverlay[i];
    element.addEventListener("click", function (event) {
        var targetElement = event.target || event.srcElement;
        imageSwitch(targetElement, -1);
    })
}
for (var i = 0; i < allBackwardOverlay.length; i++) {
    var element = allBackwardOverlay[i];
    element.addEventListener("click", function (event) {
        var targetElement = event.target || event.srcElement;
        imageSwitch(targetElement, 1);
    })
}