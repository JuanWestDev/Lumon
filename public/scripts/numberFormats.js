document.addEventListener("DOMContentLoaded", function() {

    let prices = document.querySelectorAll(".price");
    let marketCaps = document.querySelectorAll(".mc");
    let changes = document.querySelectorAll(".change");

    function formatPrice(numStr){
        let number = parseFloat(numStr);
        let formattedNumber = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        return '$' + formattedNumber;
    }

    function formatMarketCap(numStr) {
        let number = parseFloat(numStr);
        let formattedNumber = Math.floor(number).toLocaleString('en-US');
        return '$' + formattedNumber;
    }


    function formatChange(numStr) {
        // Convert string to number, considering the sign
        let number = parseFloat(numStr);
        
        // Determine if it's positive, negative, or zero
        let sign = number > 0 ? '+' : (number < 0 ? '-' : '');
        
        // Format the number to 2 decimal places and add appropriate sign
        let formattedNumber = sign + Math.abs(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '%';
        
        // Create a span to hold the formatted volume with appropriate color
        let volumeSpan = document.createElement('span');
        volumeSpan.textContent = formattedNumber;
        
        // Set color based on whether it's positive or negative
        if (sign === '+') {
            volumeSpan.style.color = 'rgb(144, 238, 144)';
        } else if (sign === '-') {
            volumeSpan.style.color = 'red';
        } else {
            volumeSpan.style.color = 'whitesmoke'; // Neutral color for zero or no change
        }
        
        // Return the span element with the formatted and colored volume
        return volumeSpan.outerHTML;
    }


    prices.forEach(function(priceCell) {
        priceCell.textContent = formatPrice(priceCell.textContent);
    });

    marketCaps.forEach(function(marketCapCell) {
        marketCapCell.textContent = formatMarketCap(marketCapCell.textContent);
    });

    changes.forEach(function(changeCell) {
        changeCell.innerHTML = formatChange(changeCell.textContent);
    });

});