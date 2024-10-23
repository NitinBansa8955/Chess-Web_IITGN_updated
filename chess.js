document.getElementById('marquee').addEventListener('click', function() {
    window.location.href = "updates.html";
    
  });
document.getElementById('btn-contact').addEventListener('click', function() {
    window.location.href = "contact.html";
    
  });


function highlightText(event) {
    event.preventDefault(); // Prevent form submission

    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value.trim().toLowerCase();

    // Remove any existing highlights if the search input is cleared
    if (!searchValue) {
        removeHighlights();
        return;
    }

    // Remove previous highlights before applying new ones
    removeHighlights();

    // Highlight matches in the text content
    highlightMatches(searchValue);
}

function removeHighlights() {
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach((highlight) => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

function highlightMatches(searchValue) {
    const elements = document.querySelectorAll('body *:not(.navbar-brand):not(.navbar):not(.navbar *)');
    elements.forEach(element => {
        if (element.children.length === 0 && element.textContent.trim() !== '') {
            const textContent = element.textContent.toLowerCase();
            if (textContent.includes(searchValue)) {
                const regex = new RegExp(`(${searchValue})`, 'gi');
                const highlightedText = element.textContent.replace(regex, '<span class="highlight">$1</span>');
                element.innerHTML = highlightedText;
            }
        }
    });
}

// Listen for input changes in the search bar
document.getElementById('searchInput').addEventListener('input', (event) => {
    const searchValue = event.target.value.trim().toLowerCase();
    if (!searchValue) {
        document.getElementById('searchForm').submit(); // Automatically submit the form if input is cleared
    }
});

