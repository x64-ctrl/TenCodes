document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const totalPages = Object.keys(codes).length;

    function generateContent(page) {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = ''; // Clear previous content
        const pageKey = `page${page}`;
        if (codes[pageKey]) {
            codes[pageKey].forEach(item => {
                const div = document.createElement('div');
                div.className = pageKey;
                div.innerHTML = `<span class="code-number">${item.code}</span> = ${item.description}`;
                contentDiv.appendChild(div);
            });
            document.getElementById('pageDisplay').textContent = `${page}`;
        } else {
            contentDiv.innerHTML = '<p>No content available for this page.</p>';
        }
        updateButtons();
    }

    function updateButtons() {
        document.getElementById('prevPage').disabled = currentPage === 1;
        document.getElementById('nextPage').disabled = currentPage === totalPages;
    }

    function handleKeydown(event) {
        const contentDiv = document.getElementById('content');
        if (event.key === 'ArrowLeft' && currentPage > 1) {
            currentPage--;
            generateContent(currentPage);
        } else if (event.key === 'ArrowRight' && currentPage < totalPages) {
            currentPage++;
            generateContent(currentPage);
        } else if (event.key === 'ArrowUp') {
            contentDiv.scrollTop -= 20; // Scroll up by 20 pixels
        } else if (event.key === 'ArrowDown') {
            contentDiv.scrollTop += 20; // Scroll down by 20 pixels
        }
    }

    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            generateContent(currentPage);
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            generateContent(currentPage);
        }
    });

    document.addEventListener('keydown', handleKeydown);

    generateContent(currentPage);
});