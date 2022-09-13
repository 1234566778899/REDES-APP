function hallarN(numero) {
    for (let i = 0; i <= 10; i++) {
        if (Math.pow(2, i) >= numero + 2) return i;
    }
    return 0;
}

class Red {
    constructor(nombre, valor) {
        this.nombre = nombre;
        this.valor = valor;
        this.subred = 0;
        this.prefijo = 0;
    }
}



let mascaras = [0, 128, 192, 224, 240, 248, 252];



function resultado() {

    let ip1 = parseInt(document.querySelector('#ip1').value);
    let ip2 = parseInt(document.querySelector('#ip2').value);
    let ip3 = parseInt(document.querySelector('#ip3').value);
    let ip4 = parseInt(document.querySelector('#ip4').value);
    // let ip1 = 179;
    // let ip2 = 19;
    // let ip3 = 67;
    // let ip4 = 0;

    let prefijo = parseInt(document.querySelector('#prefijo').value);
    // let prefijo = 24;
    let n = 0;
    let redes = [];
    let nombres = document.querySelectorAll('.nombre');
    let numeros = document.querySelectorAll('.numero');
    for (let i = 0; i < nombres.length; i++) {
        redes.push(new Red(nombres[i].value, parseInt(numeros[i].value)));
    }

    // let r1 = new Red('Q1', 23);
    // let r2 = new Red('Q2', 19);
    // let r3 = new Red('R1', 11);
    // let r4 = new Red('R2', 7);
    // let r5 = new Red('R2', 2);

    // redes.push(r1);
    // redes.push(r2);
    // redes.push(r3);
    // redes.push(r4);
    // redes.push(r5);

    let suma = 0;
    let combinacion = [];
    let validar = [];

    let cantidad;
    let potencia;

    for (let i = 0; i < redes.length; i++) {
        n = hallarN(redes[i].valor);
        cantidad = Math.pow(2, 32 - prefijo - n);
        potencia = Math.pow(2, n);

        let aux = [];
        validar.push(n);

        if (i == 0) {
            for (let i = 0; i < cantidad; i++) {
                aux.push(suma);
                suma += potencia;
            }

            combinacion = aux.concat(combinacion);
            let nuevo = 32 - n;
            redes[i].prefijo = nuevo;
            redes[i].subred = combinacion[0];
            combinacion.splice(0, 1);
            prefijo = nuevo;

        } else {

            if (validar.indexOf(n) == -1) {
                for (let i = 0; i < cantidad - 1; i++) {
                    aux.push(suma);
                    suma += potencia;
                }
                combinacion = aux.concat(combinacion);
                let nuevo = 32 - n;
                redes[i].prefijo = nuevo;
                redes[i].subred = combinacion[0];
                combinacion.splice(0, 1);
                prefijo = nuevo;
            } else {

                suma = combinacion[0];
                for (let i = 0; i < cantidad - 1; i++) {
                    suma += potencia;
                    aux.push(suma);
                }

                let primero = [combinacion[0]];
                combinacion.splice(0, 1);
                let final = combinacion;
                combinacion = primero.concat(aux);
                combinacion = combinacion.concat(final);

                let nuevo = 32 - n;
                redes[i].prefijo = nuevo;
                redes[i].subred = combinacion[0];
                combinacion.splice(0, 1);
                prefijo = nuevo;
            }
        }


    }

    console.log(redes);
    console.log(suma);
    console.log(potencia);


    for (let i = 0; i < redes.length; i++) {

        let ip = '' + ip1 + '.' + ip2 + '.' + ip3;

        if (i == redes.length - 1) {
            $('.tabla').append(`
        <tr>
            <td>${redes[i].nombre}</td>
            <td>${redes[i].valor}</td>
            <td>${ip}.${redes[i].subred}/${redes[i].prefijo}</td>
            <td>/${redes[i].prefijo}</td>
            <td>255.255.255.${mascaras[redes[i].prefijo - 24]}</td>
            <td>${ip}.${redes[i].subred + 1}</td>
            <td>${ip}.${redes[i].subred + 1} - ${ip}.${redes[i].subred + 2}</td>
            <td>${ip}.${redes[i].subred + 3}</td>
        </tr>
        `);
        } else {
            $('.tabla').append(`
        <tr>
            <td>${redes[i].nombre}</td>
            <td>${redes[i].valor}</td>
            <td>${ip}.${redes[i].subred}/${redes[i].prefijo}</td>
            <td>/${redes[i].prefijo}</td>
            <td>255.255.255.${mascaras[redes[i].prefijo - 24]}</td>
            <td>${ip}.${redes[i].subred + 1}</td>
            <td>${ip}.${redes[i].subred + 2} - ${ip}.${redes[i + 1].subred - 2}</td>
            <td>${ip}.${redes[i + 1].subred - 1}</td>
        </tr>
        `);
        }
    }
}

function aumentar(){
    $('.opciones').append(`<tr>
    <td><input type="text" class="form-control nombre"></td>
    <td><input type="text" class="form-control numero"></td>
    </tr>`);
}


