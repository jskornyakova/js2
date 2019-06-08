// *Некая сеть фастфуда предлагает несколько видов гамбургеров:
//
// ### Маленький (50 рублей, 20 калорий).
// ### Большой (100 рублей, 40 калорий).
// ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// ### С сыром (+10 рублей, +20 калорий).
// ### С салатом (+20 рублей, +5 калорий).
// ### С картофелем (+15 рублей, +10 калорий).
// ### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий).
// ### 3Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
// Можно использовать примерную архитектуру класса из методички, но можно использовать и свою.

let cost = 0;
let calory = 0;
function getSize(){
    let size = [
        {id: 1, name: 'little', price: 50, calory: 20},
        {id: 2, name: 'big', price: 100, calory: 40},
    ];
    let idx;
    let $sizeBurger = document.querySelectorAll('.size');
    for (let i = 0; i < $sizeBurger.length; i++){
        if($sizeBurger[i].checked) {
            idx = +$sizeBurger[i].id;
            break;
        }
    }
    for (let i = 0; size.length; i++){
        if(idx === +size[i].id){
            cost += size[i].price;
            calory += size[i].calory;
            break;
        }
    }
}



function getFilling(){
    let filling = [
        {id: 3, name: 'cheese', price: 10, calory: 20},
        {id: 4, name: 'salat', price: 20, calory: 5},
        {id: 5, name: 'potatoes', price: 15, calory: 10},
    ];
    let idx;
    let $fillingBurger = document.querySelectorAll('.filling');
    for (let i = 0; i < $fillingBurger.length; i++){
        if($fillingBurger[i].checked) {
            idx = +$fillingBurger[i].id;
            break;
        }
    }
    for (let i = 0; filling.length; i++){
        if(idx === +filling[i].id){
            cost += filling[i].price;
            calory += filling[i].calory;
            break;
        }
    }
}



function getTopping(){
    let topping = [
        {id: 6, name: 'herb', price: 15, calory: 0},
        {id: 7, name: 'mayo', price: 20, calory: 5},
    ];
    let idx;
    let $toppingBurger = document.querySelectorAll('.topping');
    for (let i = 0; i < $toppingBurger.length; i++){
        if($toppingBurger[i].checked) {
            idx = +$toppingBurger[i].id;
            for (let i = 0; topping.length; i++){
                if(idx === +topping[i].id){
                    cost += topping[i].price;
                    calory += topping[i].calory;
                    break;
                }
            }
            break;
        } else {
            cost += 0;
            calory += 0;
        }
    }

}

function handleClickChoose() {
    getSize();
    getFilling();
    getTopping();
    alert('Стоимость бургера: ' + cost + ', калорийность: ' + calory);
}

function init(){
    document.querySelector('.choose').addEventListener("click", handleClickChoose);
}

init();
