document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchButton").addEventListener("click", function () {
        let query = document.getElementById("searchInput").value.trim();

        if (query) {
            fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {
                    let resultsDiv = document.getElementById("results");
                    resultsDiv.innerHTML = ""; // Limpiar resultados anteriores

                    if (data.docs.length === 0) {
                        resultsDiv.innerHTML = "<p>No se encontraron resultados.</p>";
                        return;
                    }

                    data.docs.slice(0, 30).forEach(book => { // Mostrar solo los primeros 10
                        let coverID = book.cover_i;
                        let coverURL = coverID ? `https://covers.openlibrary.org/b/id/${coverID}-M.jpg` : "https://via.placeholder.com/128x192?text=No+Image";

                        let bookTitle = book.title || "Libro desconocido";
                        let author = book.author_name ? book.author_name[0] : "Autor desconocido";

                        // Formatear título y autor para Wikipedia
                        let wikiTitle = encodeURIComponent(`${bookTitle}`.replace(/\s+/g, "_"));
                        let wikiLink = `https://es.wikipedia.org/wiki/${wikiTitle}`;

                        let bookElement = document.createElement("div");
                        bookElement.classList.add("book-item");
                        bookElement.innerHTML = `
                            <img src="${coverURL}" alt="Portada de ${bookTitle}">
                            <h3>${bookTitle}</h3>
                            <p>Autor: ${author}</p>
                        `;

                        // Redirigir a Wikipedia en una nueva pestaña
                        bookElement.onclick = function () {
                            window.open(wikiLink, "_blank");
                        };

                        resultsDiv.appendChild(bookElement);
                    });
                })
                .catch(error => console.log("Error:", error));
        }
    });
});
