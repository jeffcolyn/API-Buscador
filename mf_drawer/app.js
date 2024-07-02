window.addEventListener('hashchange', () => {
    const content = document.getElementById('content');
    const route = window.location.hash.slice(1);

    if (route === '/videos') {
        fetch('http://localhost:3002')
            .then(response => response.text())
            .then(html => content.innerHTML = html);
    } else if (route === '/favoritos') {
        fetch('http://localhost:3000/favoritos')
            .then(response => response.json())
            .then(favorites => {
                if (Array.isArray(favorites)) {
                    content.innerHTML = favorites.map(video => `
                        <div class="video">
                            <h2>${video.title || 'Título Desconhecido'}</h2>
                            <iframe src="https://www.youtube.com/embed/${video.videoId}" frameborder="0"></iframe>
                        </div>
                    `).join('');
                } else {
                    content.innerHTML = '<p>Erro ao carregar favoritos.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                content.innerHTML = '<p>Erro ao carregar favoritos.</p>';
            });
    }
});
