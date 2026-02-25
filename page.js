     document.addEventListener('DOMContentLoaded', function() {
    const contact = document.getElementById('contact');
    const redes = document.getElementsByClassName('social');
    let isOpen = false;
    
    contact.addEventListener('click', function() {
        if (!isOpen) {
            for (let i = 0; i < redes.length; i++) {
                redes[i].classList.add('show');
            }
            contact.classList.add('move');
            contact.textContent = "Cerrar";
            isOpen = true;
        } else {
            for (let i = 0; i < redes.length; i++) {
                redes[i].classList.remove('show');
            }
            contact.classList.remove('move');
            contact.textContent = "Contactame";
            isOpen = false;
        }
    });
});
function mostrar(){
const selected=document.getElementById("categories");
const option=selected.options[selected.selectedIndex];
const id=option.id;
const imagenes=document.querySelectorAll('.imagen-item');
imagenes.forEach(imagen=>{
    if(id!='todas'){
if(imagen.id==id){
    imagen.classList.remove('ocult');
   }
else{ 
    imagen.classList.add('ocult');
}
}else{
     imagen.classList.remove('ocult');
}});
} 
function zoom() {
    document.querySelectorAll('.imagen-item').forEach(img => {
        img.addEventListener('click', function(e) {
            this.classList.toggle('img-zoom');
            e.stopPropagation();
        });
    });
}
