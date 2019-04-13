class Posicion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class ElementoMapa {

    constructor(nombre, x, y) {

        this.posicion = new Posicion(x, y);
        this.id = parseInt(Math.random() * 10000);
        this.nombre = nombre;
        this.colorStyle = 'rgb(0,0,0)';
        this.historialMovimientos = [];
        this.travelLog = [];
    }
}

class Rover extends ElementoMapa {

    constructor(nombre, xinicio, yinicio, direccionInicial) {
        super(nombre, xinicio, yinicio);
        this.direccionInicial = direccionInicial;

        this.isVerbose = true;
    }

    getNewDirection(direccionActual, tipoMovimiento) {
        let listaDireccion = ['W', 'N', 'E', 'S'];

        if (tipoMovimiento === 'forward' || tipoMovimiento === 'backward') {
            return direccionActual;
        }


        let indexDir = listaDireccion.findIndex(function (letra) {
            return letra === direccionActual;
        });

        let newIndex = 0;
        if (tipoMovimiento === 'turnLeft') {
            newIndex = indexDir - 1;
        } else {
            newIndex = indexDir + 1;
        }

        if (newIndex < 0) {
            newIndex = 3;
        }

        if (newIndex > 3) {
            newIndex = 0;
        }

        return listaDireccion[newIndex];
    }


    validarMovimiento(movimiento) {

        let listaMovPermitidos = ['forward', 'backward', 'turnLeft', 'turnRight'];

        let indexMov = listaMovPermitidos.findIndex(function (texto) {
            return texto === movimiento;
        });

        return indexMov >= 0;
    };

    mover(tipoMovimiento) {

        //validar
        let isValid = this.validarMovimiento(tipoMovimiento);

        if (!isValid) {
            return this;
        }


        let dir = this.direccion;

        this.historialMovimientos.push(tipoMovimiento);


        if (tipoMovimiento === 'forward') {
            //cambia la posicion

            if (dir === 'N') {
                this.posicion.y++;
            } else if (dir === 'S') {
                this.posicion.y--;
            } else if (dir === 'E') {
                this.posicion.x++;
            } else if (dir === 'W') {
                this.posicion.x--;
            }

        } else if (tipoMovimiento === 'backward') {

            if (dir === 'N') {
                this.posicion.y--;
            } else if (dir === 'S') {
                this.posicion.y++;
            } else if (dir === 'E') {
                this.posicion.x--;
            } else if (dir === 'W') {
                this.posicion.x++;
            }

        } else {
            //cambia la direccion
            this.direccion = this.getNewDireccion(this.direccion, tipoMovimiento);
        }

        if (this.isVerbose) {
            console.log(tipoMovimiento + " was called!");
            console.log('Direccion ' + this.direccion);
        }

        /* validar limites */

        this.posicion.x = (this.posicion.x < -10) ? -10 : this.posicion.x;
        this.posicion.x = (this.posicion.x > 10) ? 10 : this.posicion.x;
        this.posicion.y = (this.posicion.y) < -10 ? -10 : this.posicion.y;
        this.posicion.y = (this.posicion.y) > 10 ? 10 : this.posicion.y;


        if (this.isVerbose) {
            console.log(this.posicion);
        }

        //guardar historial de ubicaciones
        this.travelLog.push({x: this.posicion.x, y: this.posicion.y});


        return this;
    };

    moverConComandos(comandos) {

        comandos = comandos || '';

        if (comandos === '') {
            return;
        }

        let listaCodigo = comandos.split('');


        for (let i = 0; i < listaCodigo.length; i++) {

            let letra = listaCodigo[i];
            let m = '';

            if (letra === 'f') {
                m = 'forward'
            } else if (letra === 'b') {
                m = 'backward';
            } else if (letra === 'l') {
                m = 'turnLeft';
            } else if (letra === 'r') {
                m = 'turnRight';
            } else {
                m = '';
            }

            this.mover(m);
        }

    };

    resetPosicion() {
        this.direccion = 'N';
        this.posicion.x = 0;
        this.posicion.y = 0;
    };


    randomPosicion () {

        let n1 =  parseInt(Math.random() * 20 + -10);
        let n2 = parseInt(Math.random() * 20 + -10);


        if (n1 < -10) {
            n1 = -10
        }
        if (n1 > 10) {
            n1 = 10;
        }

        if (n2 < -10) {
            n2 = -10
        }
        if (n2 > 10) {
            n2 = 10;
        }

        this.direccion = 'N';
        this.posicion.x = n1;
        this.posicion.y = n2;

    };

    setRandomColor(){

        let n1 = Math.random() * 255;
        let n2 = Math.random() * 255;
        let n3 = Math.random() * 255;

        this.colorStyle = 'rgb(' + n1 + ',' + n2 + ',' + n3 + ')';

    }

}

