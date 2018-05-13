var md=new showdown.Converter();
var docSet=document.getElementsByClassName("markdown");
for(var i=0;i<docSet.length;i++){
    var temp=docSet[i];
    $.get("./md/"+temp.id+".md",function(data){
        temp.innerHTML=md.makeHtml(data);
    });
};

// var md = new Remarkable({html: true});
// var docSet=document.getElementsByClassName("markdown");
// for(var i=0;i<docSet.length;i++){
//     var temp=docSet[i];
//     $.get("./md/"+temp.id+".md",function(data){
//         temp.innerHTML=md.render(data);
//     });
// }