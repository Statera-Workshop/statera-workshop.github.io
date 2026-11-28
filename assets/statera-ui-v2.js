(function(){
  var KEY="statera-lang";
  function setLang(l){
    var root=document.documentElement;
    root.setAttribute("data-lang",l);
    root.setAttribute("lang",l==="ko"?"ko":"en");
    try{localStorage.setItem(KEY,l);}catch(e){}
    var btns=document.querySelectorAll("[data-set-lang]");
    for(var i=0;i<btns.length;i++){btns[i].setAttribute("aria-pressed",btns[i].getAttribute("data-set-lang")===l?"true":"false");}
  }
  var saved=null;try{saved=localStorage.getItem(KEY);}catch(e){}
  setLang(saved||((navigator.language||"").toLowerCase().indexOf("ko")===0?"ko":"en"));
  var btns=document.querySelectorAll("[data-set-lang]");
  for(var i=0;i<btns.length;i++){btns[i].addEventListener("click",function(){setLang(this.getAttribute("data-set-lang"));});}
  var table=document.getElementById("catalog-table");
  if(!table){return;}
  var q=document.getElementById("catalog-search"),f=document.getElementById("catalog-filter"),out=document.getElementById("catalog-count");
  var rows=Array.prototype.slice.call(table.tBodies[0].rows);
  function apply(){
    var s=(q.value||"").toLowerCase().trim(),g=f?f.value:"",n=0;
    rows.forEach(function(r){
      var ok=(!s||r.getAttribute("data-search").indexOf(s)>=0)&&(!g||r.getAttribute("data-group")===g);
      r.hidden=!ok;if(ok){n++;}
    });
    out.textContent=n+" / "+rows.length;
  }
  q.addEventListener("input",apply);if(f){f.addEventListener("change",apply);}apply();
})();
