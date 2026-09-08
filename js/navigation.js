const home = document.getElementById("view-home");
const cofig = document.getElementById("view-cofig");
const game = document.getElementById("view-game");
const result = document.getElementById("view-result");
const history = document.getElementById("view-history");



const views = document.querySelectorAll("section[id^= 'view-']")
 export function showView(viewName) {
    views.forEach(view => { 
        view.hidden = true ;
});


const targetview = document.getElementById(`view-${viewName}`);
if(targetview){
    targetview.hidden = false;
}
}
