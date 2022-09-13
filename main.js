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
    // let ip1 = 10;
    // let ip2 = 1;
    // let ip3 = 1;
    // let ip4 = 0;

    let ip = '' + ip1 + '.' + ip2 + '.' + ip3;
    let prefijo = parseInt(document.querySelector('#prefijo').value);
    //let prefijo = 24;
    let n = 0;
    let redes = [];
    let nombres = document.querySelectorAll('.nombre');
    let numeros = document.querySelectorAll('.numero');
    for (let i = 0; i < nombres.length; i++) {
        redes.push(new Red(nombres[i].value, parseInt(numeros[i].value)));
    }

    // let r1 = new Red('A', 110);
    // let r2 = new Red('B', 60);
    // let r3 = new Red('C', 28);
    // let r4 = new Red('D', 5);
    // let r5 = new Red('E', 5)
    // redes.push(r1);
    // redes.push(r2);
    // redes.push(r3);
    // redes.push(r4);
    // redes.push(r5);

    let suma = ip4;
    let combinacion = [];
    let validar = [];

    let cantidad;
    let potencia;
    let cadena = '';
    for (let i = 0; i < redes.length; i++) {
        n = hallarN(redes[i].valor);
        cantidad = Math.pow(2, 32 - prefijo - n);
        potencia = Math.pow(2, n);

        cadena += `<span>2</span><sup>n</sup>-2 >= ${redes[i].valor}<br>`;
        cadena += `<span>n = ${n}</span><br>`;
        cadena += `<span class="fw-bold">${ip}.${suma}/${prefijo}</span><br>`;
        let aux = [];
        validar.push(n);

        let nuevo, final, primero;
        if (i == 0) {
            for (let i = 0; i < cantidad; i++) {
                aux.push(suma);
                suma += potencia;

                cadena += `<span>.........${ip}.${suma}</span><br>`;
            }

            combinacion = aux.concat(combinacion);
            nuevo = 32 - n;
            redes[i].prefijo = nuevo;
            redes[i].subred = combinacion[0];
            combinacion.splice(0, 1);
            prefijo = nuevo;

        } else {
            if (validar.indexOf(n) == -1) {
                for (let i = 0; i < cantidad - 1; i++) {
                    aux.push(suma);
                    suma += potencia;

                    cadena += `<span>.........${ip}.${suma}</span><br>`;
                }
                combinacion = aux.concat(combinacion);
                nuevo = 32 - n;
                redes[i].prefijo = nuevo;
                redes[i].subred = combinacion[0];
                combinacion.splice(0, 1);
                prefijo = nuevo;
            } else {

                suma = combinacion[0];
                for (let i = 0; i < cantidad - 1; i++) {
                    suma += potencia;
                    aux.push(suma);

                    cadena += `<span>.........${ip}.${suma}</span><br>`;
                }

                primero = [combinacion[0]];
                combinacion.splice(0, 1);
                final = combinacion;
                combinacion = primero.concat(aux);
                combinacion = combinacion.concat(final);

                nuevo = 32 - n;
                redes[i].prefijo = nuevo;
                redes[i].subred = combinacion[0];
                combinacion.splice(0, 1);
                prefijo = nuevo;
            }
        }

        $('.resolucion').append(`<div class="card py-3 px-2">
                                 <div class="card-header">${redes[i].nombre}</div>
                                 <div class="body">${cadena}</div>
                                 </div>`);

        cadena = '';

    }

    let k = combinacion[0];
    for (let i = 0; i < redes.length; i++) {

        if (i == redes.length - 1) {
            if (n == 2) {
                $('.tabla').append(`
            <tr>
                <td>${redes[i].nombre}</td>
                <td>${redes[i].valor}</td>
                <td>${ip}.${redes[i].subred}/${redes[i].prefijo}</td>
                <td>/${redes[i].prefijo}</td>
                <td>255.255.255.${mascaras[redes[i].prefijo - 24]}</td>
                <td>-</td>
                <td>${ip}.${redes[i].subred + 1} - ${ip}.${k - 2}</td>
                <td>${ip}.${k - 1}</td>
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
                <td>${ip}.${redes[i].subred + 2} - ${ip}.${k - 2}</td>
                <td>${ip}.${k - 1}</td>
            </tr>
            `);
            }
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

function aumentar() {
    $('.opciones').append(`<tr>
    <td><input type="text" class="form-control nombre"></td>
    <td><input type="text" class="form-control numero"></td>
    </tr>`);
}

