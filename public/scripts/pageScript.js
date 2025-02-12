let currentPage = 0;

function increasePageNumber(element){
    currentPage++;

    element.href = `http://localhost:3000/page-${currentPage}`;
}

function decreasePageNumber(element){
    currentPage--;

    element.href = `http://localhost:3000/page-${currentPage}`;
}

document.addEventListener('DOMContentLoaded', function() {
    let url = new URL(window.location.href);
    let pageMatch = url.pathname.match(/page-(\d+)$/);

    if(pageMatch) {
        currentPage = parseInt(pageMatch[1], 10);
    }

});