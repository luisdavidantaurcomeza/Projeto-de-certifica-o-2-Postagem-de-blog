       //javascript criado com base no curso Devstart
        const postForm = document.getElementById('post-form');
        const postTitle = document.getElementById('post-title');
        const postBody = document.getElementById('post-body');
        const titlePreview = document.getElementById('post-title-preview');
        const bodyPreview = document.getElementById('post-body-preview');
        const loading = document.querySelector('.loading');
        const successMessage = document.querySelector('.post-success');
        
        // Evento para enviar o post - selecionou o formulário pelo ID "post-form"
        // e adicionou um evento de escuta para o evento de envio (submit) do formulário.
        // Quando o formulário é enviado, a função de callback é executada.
        postForm.addEventListener('submit', function(prevenir) {
            prevenir.preventDefault(); // Previne o comportamento padrão do formulário
            
            // Verifica se os campos estão preenchidos
            if (!postTitle.value || !postBody.value) {
                alert('Por favor, preencha todos os campos!');
                return;
            }
            
            // Mostra o indicador de carregamento
            loading.style.display = 'block';
            
            // Cria o objeto de dados para enviar na requisição
            const data = {
                title: postTitle.value,
                body: postBody.value,
                userId: 1
            };
            
            // Faz a requisição POST para a API iniciando o fetch
            // O fetch é uma função JavaScript que permite fazer requisições HTTP de forma assíncrona.
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                // Esconde o indicador de carregamento
                loading.style.display = 'none';
                
                // Exibe mensagem de sucesso
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
                
                // Renderiza o post na prévia
                titlePreview.innerHTML = data.title;
                bodyPreview.innerHTML = data.body;
                
                // Rola a tela até a prévia do post
                document.getElementById('preview').scrollIntoView({ behavior: 'smooth' });
            })
            .catch(error => {
                // Esconde o indicador de carregamento
                loading.style.display = 'none';
                
                // Exibe mensagem de erro
                alert('Ocorreu um erro ao publicar o post: ' + error.message);
            });
        });
        
        // Script para rolagem suave ao clicar nos links de navegação
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });