
export function blockStack(){
  return `let elements=document.getElementsByTagName("div");
   for (var i = 0; i < elements.length; i++) {
    if (elements[i].innerText == "Go to Blockstack") {
        elements[i].click();
      return;
    }
  }
  throw new Error("not found");`
}