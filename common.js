var md=new showdown.Converter();
var docSet=document.getElementsByClassName("markdown");
for(var i=0;i<docSet.length;i++){
    var temp=docSet[i];
    $.get("https://wuetal.github.io/EuroCuration/md/"+temp.id+".md",function(data){
        temp.innerHTML=md.makeHtml(data);
    });
}

var pSetWithImg=$('.markdown p:has(img)');
for(var i=0;i<pSetWithImg.length;i++){
    var left=window.getComputedStyle(pSetWithImg[i]).left;
    pSetWithImg[i].style={
        width:'100vw',
        position: "relative",
        left:-left
    };
}


// var md = new Remarkable({html: true});
// var docSet=document.getElementsByClassName("markdown");
// for(var i=0;i<docSet.length;i++){
//     var temp=docSet[i];
//     $.get("./md/"+temp.id+".md",function(data){
//         temp.innerHTML=md.render(data);
//     });
// }