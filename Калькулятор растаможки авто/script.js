var doc = document,
    selects = doc.querySelectorAll(".select-form"),
    input = doc.getElementById("input-price"),
    car = doc.querySelector(".type-car"),
    result = doc.getElementById("result"),
    elHidden = doc.querySelectorAll(".electro-hidden");


// for(var i = 0; i < elHidden.length; i++) {
//     console.log(elHidden[i]);
// }

car.onchange = function() {
    if(car.value === "Легковые") {
        show(true);
        // console.log(car.value);
    } else if(car.value === "Электро") {
        show(false);
    }
}

doc.querySelector("#button-res").onclick = function() {
    if(car.value === "Легковые") {
        if(selects[0].value === "EC") {
            result.innerHTML = eu(parseFloat(input.value), parseFloat(selects[1].value), typeEngine(selects[2].value), age(selects[3].value));
        } else if(selects[0].value === "Канада") {
            result.innerHTML = canada(parseFloat(input.value), parseFloat(selects[1].value), typeEngine(selects[2].value), age(selects[3].value));
        } else {
            result.innerHTML = percentOutput(10, parseFloat(input.value));
        }
    } else if(car.value === "Электро") {
        result.innerHTML = 0;
    }
};

function canada(price, volume, type, age) {
    var res = 0;
    if(age === 0) {
        res = percentOutput(volumeEngineECanada(type, volume), price);
    } else {
        res = 0;
    }
    return res;
}

function eu(price, volume, type, age) {
    var res = 0;
    if(age === 0) {
        res = percentOutput(volumeEngineEU(type, volume), price);
    } else {
        res = percentOutput(7.3, price);
    }
    return res;
}

function volumeEngineECanada(type, volume) {
    if(type) {
        // бензин
        if(volume <= 2.2) {
            return 7;
        } else if(volume > 2.2 && volume <= 3.0) {
            return 0;
        } else {
            return 7;
        }
    } else {
        // дизель
        if(volume <= 2.5) {
            return 7;
        } else {
            return 0;
        }
    }
}

function volumeEngineEU(type, volume) {
    if(type) {
        // бензин
        if(volume < 1.0) {
            return 6.3;
        } else if(volume >= 1.0 && volume < 1.5) {
            return 7.3;
        } else if(volume >= 1.5 && volume < 2.2) {
            return 6.3;
        } else if(volume >= 2.2 && volume < 3.0) {
            return 6.3;
        } else {
            return 5.0;
        }
    } else {
        // дизель
        if(volume < 2.5) {
            return 7.3;
        } else {
            return 6.3;
        }
    }
}

function typeEngine(str) {
    if(str === "бензин") return true;
    if(str === "дизель") return false;
}

function age(str) {
    if(str === "новый") return 0;
    if(str === "До 5ти лет(включительно)") return 1;
    if(str === "от 5ти до 8ми") return 2;
    if(str === "старше 8ми лет") return 3;
}

function percentOutput(percent, value) {
    return value * percent / 100;
}

function show(isShow) {
    if(isShow) {
        for(var i = 0; i < elHidden.length; i++) {
            elHidden[i].removeAttribute('style');
        }
    } else {
        for(var i = 0; i < elHidden.length; i++) {
            elHidden[i].style.display = 'none';
        }
    }
}

