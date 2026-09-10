

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
