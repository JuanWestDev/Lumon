document.addEventListener('DOMContentLoaded', function() {

    const sortColumn = document.body.getAttribute('data-sort-column');
    const sortDirection = document.body.getAttribute('data-sort-direction');


    console.log("sortColumn: ", sortColumn);
    console.log("sortDirection: ", sortDirection);


    if(sortColumn == "rank" && sortDirection =="asc"){
        document.querySelector(".arrow.up").classList.add("selected");
        document.querySelector(".arrow.down").classList.remove("selected");
    }else if(sortColumn == "rank" && sortDirection =="desc"){
        document.querySelector(".arrow.down").classList.add("selected");
        document.querySelector(".arrow.up").classList.remove("selected");
    }else if(sortColumn == "price" && sortDirection =="asc"){
        document.querySelector(".price-up").classList.toggle("selected");
        document.querySelector(".price-down").classList.remove("selected");
    }else if(sortColumn == "price" && sortDirection =="desc"){
        document.querySelector(".price-down").classList.add("selected");
        document.querySelector(".price-up").classList.remove("selected");
    }else if(sortColumn == "mc" && sortDirection =="asc"){
        document.querySelector(".mc-up").classList.add("selected");
        document.querySelector(".mc-down").classList.remove("selected");
    }else if(sortColumn == "mc" && sortDirection =="desc"){
        document.querySelector(".mc-down").classList.add("selected");
        document.querySelector(".mc-up").classList.remove("selected");
    }else if(sortColumn == "24" && sortDirection =="asc"){
        document.querySelector(".change-up").classList.add("selected");
        document.querySelector(".change-down").classList.remove("selected");
    }else if(sortColumn == "24" && sortDirection =="desc"){
        document.querySelector(".change-down").classList.add("selected");
        document.querySelector(".change-up").classList.remove("selected");
    }


});


function changeRankUpArrowColor(element){
    if(element == "rank"){
        document.querySelector(".arrow.up").classList.add("selected");
        document.querySelector(".arrow.down").classList.remove("selected");
    }else if(element == "price"){
        document.querySelector(".price-up").classList.add("selected");
        document.querySelector(".price-down").classList.remove("selected");
    }else if(element == "mc"){
        document.querySelector(".mc-up").classList.add("selected");
        document.querySelector(".mc-down").classList.remove("selected");
    }else if(element == "24hr"){
        document.querySelector(".change-up").classList.add("selected");
        document.querySelector(".change-down").classList.remove("selected");
    }

}

function changeRankDownArrowColor(element){
    if(element == "rank"){
        document.querySelector(".arrow.down").classList.add("selected");
        document.querySelector(".arrow.up").classList.remove("selected");
    }else if(element == "price"){
        document.querySelector(".price-down").classList.add("selected");
        document.querySelector(".price-up").classList.remove("selected");
    }else if(element == "mc"){
        document.querySelector(".mc-down").classList.add("selected");
        document.querySelector(".mc-up").classList.remove("selected");
    }else if(element == "24hr"){
        document.querySelector(".change-down").classList.add("selected");
        document.querySelector(".change-up").classList.remove("selected");
    }
}

// function changePriceUpArrowColor(){
//     document.querySelector(".arrow.up.price").classList.toggle("selected");
//     document.querySelector(".arrow.down.price").classList.remove("selected");
// }

// function changePriceDownArrowColor(){
//     document.querySelector(".arrow.down.price").classList.toggle("selected");
//     document.querySelector(".arrow.up.price").classList.remove("selected");
// }