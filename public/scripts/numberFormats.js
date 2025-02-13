document.addEventListener("DOMContentLoaded", function() {

    let prices = document.querySelectorAll(".price");
    let marketCaps = document.querySelectorAll(".mc");
    let mcCoinPage = document.querySelectorAll(".mcp");
    let changes = document.querySelectorAll(".change");

    function formatPrice(numStr){
        let number = parseFloat(numStr);

        if (isNaN(number)) return numStr;

        let precision;
        if (number < 0.01) {
            // For numbers less than 0.01, use up to 7 decimal places
            let decimalPart = number.toString().split('.')[1] || '';
            let significantDigits = decimalPart.length;
            precision = Math.min(significantDigits, 7);
        } else {
            // For numbers 0.01 and above, use 2 decimal places
            precision = 2;
        }
        
        let formattedNumber = number.toFixed(precision).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        return '$' + formattedNumber;
        // let formattedNumber = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        // return '$' + formattedNumber;
    }

    function formatMarketCap(numStr) {
        let number = parseFloat(numStr);
    
        let formattedNumber = Math.floor(number).toLocaleString('en-US');
        return '$' + formattedNumber;
    }

    function formatMarketCapForCoinPage(numStr) {
        let number = parseFloat(numStr);
        if (number >= 1e12) {
            return '$' + (number / 1e12).toFixed(1) + 'T';
        } else if (number >= 1e9) {
            return '$' + (number / 1e9).toFixed(1) + 'B';
        } else if (number >= 1e6) {
            return '$' + (number / 1e6).toFixed(1) + 'M';
        } else if (number >= 1e3) {
            return '$' + (number / 1e3).toFixed(1) + 'k';
        } else {
            return '$' + number.toFixed(1);
        }


        // let formattedNumber = Math.floor(number).toLocaleString('en-US');
        // return '$' + formattedNumber;
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

    mcCoinPage.forEach(function(mcpCell){
        mcpCell.textContent = formatMarketCapForCoinPage(mcpCell.textContent);
    });

    changes.forEach(function(changeCell) {
        changeCell.innerHTML = formatChange(changeCell.textContent);
    });

});