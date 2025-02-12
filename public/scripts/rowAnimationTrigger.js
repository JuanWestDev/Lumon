document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('.lumon-watch tbody tr.row-data');

    function revealRows() {
        rows.forEach((row, index) => {
      
            setTimeout(() => {
                row.classList.remove('hidden');
            }, index * 60); 
        });
    }
    
    revealRows();
});