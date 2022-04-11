console.log(
    "Hola estoy aqui, soy el Frontend"
);

document.addEventListener("click", e => {
 if(e.target.dataset.short) {
     const url = `${window.location.origin}/${e.target.dataset.short}`;


     navigator.clipboard
     .writeText(url)
     .then(()=>{
         console.log("El texto ha sido copiado")
     })
     .catch((error)=>{
         console.log("algo no funiono bien", error)
     })
 }
 
})


