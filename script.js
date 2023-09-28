
document.addEventListener('DOMContentLoaded', function () {

});


if (window.location.pathname === '/index.html') {
   
}

if (window.location.pathname === '/event.html') {
   
}


if (window.location.pathname === '/create.html') {
    document.addEventListener('DOMContentLoaded', function () {
        const eventForm = document.getElementById('eventForm');
        const successMessage = document.getElementById('successMessage');
    
        eventForm.addEventListener('submit', function (e) {
            e.preventDefault();
    
            // Coletar os dados do formulário
            const eventName = document.getElementById('eventName').value;
            const eventDate = document.getElementById('eventDate').value;
            const eventDescription = document.getElementById('eventDescription').value;
    
            // Simular uma requisição para salvar o evento (você pode ajustar isso para se adequar à sua lógica real)
            setTimeout(function () {
                // Exibir a mensagem de sucesso e ocultar o formulário
                eventForm.style.display = 'none';
                successMessage.style.display = 'block';
            }, 1000); // Tempo simulado de salvamento (1 segundo)
        });
    });
    
   
}


if (window.location.pathname === '/registration.html') {
    
}
