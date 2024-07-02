document.getElementById('searchButton').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchTerm').value;

    fetch(`http://localhost:3000/search?query=${searchTerm}`)
        .then(response => response.json())
        .then(videos => {
            const videosContainer = document.getElementById('videos');
            if (Array.isArray(videos)) {
                videosContainer.innerHTML = videos.map(video => `
                    <div class="video">
                        <h2>${video.title}</h2>
                        <iframe src="https://www.youtube.com/embed/${video.videoId}" frameborder="0"></iframe>
                        <button class="favoriteButton" data-id="${video.videoId}" data-title="${video.title}">⭐</button>
                    </div>
                `).join('');

                document.querySelectorAll('.favoriteButton').forEach(button => {
                    button.addEventListener('click', () => {
                        const videoId = button.dataset.id;
                        const title = button.dataset.title;
                        fetch(`http://localhost:3000/favorites`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ videoId, title })
                        });
                    });
                });
            } else {
                console.error('Expected an array of videos', videos);
                videosContainer.innerHTML = '<p>Erro ao buscar vídeos. Tente novamente mais tarde.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('videos').innerHTML = '<p>Erro ao buscar vídeos. Tente novamente mais tarde.</p>';
        });
});
