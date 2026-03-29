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
    setupImageZoom();
    setupCommentFormAnimations();
});

function setupCommentFormAnimations(){
    if (window._commentFormInit) return;
    window._commentFormInit = true;

    const forms = document.querySelectorAll('.comentarios-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e){
            e.preventDefault();
            if (form._sending) return;
            form._sending = true;

            const overlay = document.createElement('div');
            overlay.className = 'send-overlay';

            const card = document.createElement('div');
            card.className = 'send-card';

            const spinner = document.createElement('div');
            spinner.className = 'spinner';

            const text = document.createElement('div');
            text.className = 'send-text';
            text.textContent = 'Preparando correo...';

            card.appendChild(spinner);
            card.appendChild(text);
            overlay.appendChild(card);
            document.body.appendChild(overlay);

      
            requestAnimationFrame(()=> overlay.classList.add('visible'));

 
            setTimeout(()=>{
       
                spinner.style.animation = 'none';
                spinner.innerHTML = '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent)"><path d="M20 6L9 17l-5-5"/></svg>';
                text.textContent = 'Listo — abriendo correo...';
            }, 900);

           
            setTimeout(()=>{
                overlay.classList.remove('visible');
                setTimeout(()=>{
                    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                  
                    form._sending = false;
                    form.submit();
                }, 260);
            }, 1600);
        });
    });
}

function setupImageZoom(){
    if (window._imageZoomInitialized) return;
    window._imageZoomInitialized = true;

    document.querySelectorAll('.imagen-item').forEach(srcImg => {
        srcImg.style.cursor = 'zoom-in';
        srcImg.addEventListener('click', function(e){
            e.stopPropagation();
            const overlay = document.createElement('div');
            overlay.className = 'zoom-overlay';

            const img = document.createElement('img');
            img.className = 'zoom-img';
            img.src = srcImg.currentSrc || srcImg.src;
            img.alt = srcImg.alt || '';

            overlay.appendChild(img);
            document.body.appendChild(overlay);


            requestAnimationFrame(()=> overlay.classList.add('visible'));

            function removeOverlay(){
                overlay.classList.remove('visible');
   
                setTimeout(()=>{ if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 260);
                document.removeEventListener('keydown', onKey);
            }

            function onKey(ev){ if (ev.key === 'Escape') removeOverlay(); }

            overlay.addEventListener('click', removeOverlay);
            document.addEventListener('keydown', onKey);
        });
    });
}

const panelButton = document.getElementById('toggleComentarios');
const panel = document.getElementById('comentariosContainer');
if (panelButton && panel) {
    panelButton.addEventListener('click', function() {
        panel.classList.toggle('collapsed');
        panelButton.textContent = panel.classList.contains('collapsed') ? 'Enviar comentarios' : 'Ocultar comentarios';
    });
}

const categoriesSelect = document.getElementById('categories');
if (categoriesSelect) {
    categoriesSelect.addEventListener('click', handleCategoryClick);
    categoriesSelect.addEventListener('change', handleCategoryClick);
}

function handleCategoryClick(e){
    const sel = e.currentTarget || document.getElementById('categories');
    if (!sel) return;
    const opt = sel.options[sel.selectedIndex];
    const value = opt ? (opt.value || opt.id) : '';
    const boxes = document.querySelectorAll('.image-box');
    boxes.forEach(box => {
        const img = box.querySelector('.imagen-item');
        const cat = img && img.dataset && img.dataset.category ? img.dataset.category : (img && img.id ? img.id : '');
        if (!value || value === 'todas' || cat === value) {
            box.classList.remove('ocult');
        } else {
            box.classList.add('ocult');
        }
    });
}
