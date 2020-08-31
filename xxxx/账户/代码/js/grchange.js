   
  function   grchange(objName)   
  {   
  var   oObj   =   event.srcElement;   
  if(oObj.tagName.toLowerCase()   ==   "td")   
  {   
  var   oTr   =   oObj.parentNode;   
  for(var   i=1;   i<document.all.table1.rows.length;   i++)   
  {   
  document.all.table1.rows[i].style.backgroundColor   =   "#ebe5e5";   
  document.all.table1.rows[i].tag   =   false;   
  }   
  oTr.style.backgroundColor   =   "#f8e3e3";   
  oTr.tag   =   true;   
  }   
  }   
    
  function   out()   
  {   
  var   oObj   =   event.srcElement;   
  if(oObj.tagName.toLowerCase()   ==   "td")   
  {   
  var   oTr   =   oObj.parentNode;   
  if(!oTr.tag)   
  oTr.style.backgroundColor   =   "#f8f3f3";   
  }   
  }   
    
  function   over()   
  {   
  var   oObj   =   event.srcElement;   
  if(oObj.tagName.toLowerCase()   ==   "td")   
  {   
  var   oTr   =   oObj.parentNode;   
  if(!oTr.tag)   
  oTr.style.backgroundColor   =   "#f8e3e3";   
  }   
  }   
