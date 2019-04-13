let Rover = require('../public/scripts/rover');

let rover = Rover.factory('mazinzaga', 0, 0, 'N');
let explorer = Rover.factory('robotina', 0, 0, 'N');


var l = 'turnLeft';
var f = 'forward';
var r = 'turnRight';
var b = 'backward';


describe("Random , Reset posicion y validar movimientos ", function () {

    it("al hacer random se pone en otra posicion diferente a 0,0", function () {
        rover.randomPosicion();
        expect(rover.posicion.x === 0 && rover.posicion.y === 0).toBe(false);
    });


    it("al hacer reset position la posicion se pone en 0,0,N", function () {
        rover.resetPosicion();
        expect(rover.direccion).toEqual('N');
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(0);
    });

    it("validar movimientos", function () {


        expect(rover.validarMovimiento(r)).toBe(true);
        expect(rover.validarMovimiento(l)).toBe(true);
        expect(rover.validarMovimiento(f)).toBe(true);
        expect(rover.validarMovimiento(b)).toBe(true);

        expect(rover.validarMovimiento('otra cosa')).toBe(false);

    });


});

describe("Movimiento básicos - girar ", function () {

    it("al girar 4 veces damos una vuelta", function () {

        rover.resetPosicion();

        rover.mover(r);
        expect(rover.direccion).toEqual('E');
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(0);

        rover.mover(r);
        expect(rover.direccion).toEqual('S');
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(0);

        rover.mover(r);
        expect(rover.direccion).toEqual('W');
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(0);

        rover.mover(r);
        expect(rover.direccion).toEqual('N');
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(0);

        rover.resetPosicion();

        rover.mover(l);
        expect(rover.direccion).toEqual('W');
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(0);

        rover.mover(l);
        expect(rover.direccion).toEqual('S');
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(0);

        rover.mover(l);
        expect(rover.direccion).toEqual('E');
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(0);

        rover.mover(l);
        expect(rover.direccion).toEqual('N');
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(0);
    });


    it("al mover frf  debera apuntar E y estar a  1,1", function () {

        rover.resetPosicion();
        rover.mover(f).mover(r).mover(f);

        expect(rover.direccion).toEqual('E');
        expect(rover.posicion.x).toEqual(1);
        expect(rover.posicion.y).toEqual(1);

    });

});


describe("Mover con comandos", function () {

    it(" mover con el comando rrr nos debe dar posicion 0,0 (no se movio) y direccion W ", function () {

        rover.resetPosicion();
        rover.moverConComandos('rrr');

        expect(rover.direccion).toEqual('W');
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(0);

    });

    it("al frf  debera apuntar E y estar a  1,1", function () {

        rover.resetPosicion();
        rover.moverConComandos('frf');

        expect(rover.direccion).toEqual('E');
        expect(rover.posicion.x).toEqual(1);
        expect(rover.posicion.y).toEqual(1);

    });


    it("al rrrrr  debera apuntar E y estar 0,0", function () {


        rover.resetPosicion();
        rover.moverConComandos('rrrrr');

        expect(rover.direccion).toEqual('E');
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(0);

    });

    it("al lllll  debera apuntar W y estar 0,0", function () {


        rover.resetPosicion();
        rover.moverConComandos('lllll');

        expect(rover.direccion).toEqual('W');
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(0);

    });

    it("al  avanza 5,gira derecha y avanza 5, gira derecha y avanza 5  fffffrfffffrfffff  debera apuntar S y estar 5,0 ", function () {

        rover.resetPosicion();
        rover.moverConComandos('fffffrfffffrfffff');

        expect(rover.direccion).toEqual('S');
        expect(rover.posicion.x).toEqual(5);
        expect(rover.posicion.y).toEqual(0);

    });

});

describe("Hacer cumplir los limites, debe estar en limites de -10 a 10", function () {

    it("al  avanza f debe quedarse en 0,10 ", function () {

        rover.resetPosicion();
        rover.moverConComandos('fffffffff');

        expect(rover.direccion).toEqual('N');
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(9);

        rover.mover(f);
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(10);

        rover.moverConComandos('fff');
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(10);

    });

    it("al  retroceder b debe quedarse en 0,10 ", function () {

        rover.resetPosicion();
        rover.moverConComandos('bbbbbbbbb');

        expect(rover.direccion).toEqual('N');
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(-9);

        rover.mover(b);
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(-10);

        rover.moverConComandos('bbb');
        expect(rover.posicion.x).toEqual(0);
        expect(rover.posicion.y).toEqual(-10);

    });

    it("al  girar a la derecha y retroceder b debe quedarse en -10,0 ", function () {

        rover.resetPosicion();
        rover.moverConComandos('rbbbbbbbbb');

        expect(rover.direccion).toEqual('E');
        expect(rover.posicion.x).toEqual(-9);
        expect(rover.posicion.y).toEqual(0);

        rover.mover(b);
        expect(rover.posicion.x).toEqual(-10);
        expect(rover.posicion.y).toEqual(0);

        rover.moverConComandos('bbb');
        expect(rover.posicion.x).toEqual(-10);
        expect(rover.posicion.y).toEqual(0);

    });

    it("al  girar a la izquierda y retroceder b debe quedarse en 10,0 ", function () {

        rover.resetPosicion();
        rover.moverConComandos('lbbbbbbbbb');

        expect(rover.direccion).toEqual('W');
        expect(rover.posicion.x).toEqual(9);
        expect(rover.posicion.y).toEqual(0);

        rover.mover(b);
        expect(rover.posicion.x).toEqual(10);
        expect(rover.posicion.y).toEqual(0);

        rover.moverConComandos('bbb');
        expect(rover.posicion.x).toEqual(10);
        expect(rover.posicion.y).toEqual(0);

    });
});

describe("Más de un rover ", function () {

    it("validar que los dos rober tieen posicion diferente", function () {

        rover.resetPosicion();
        explorer.resetPosicion();

        rover.moverConComandos('rfff');
        explorer.moverConComandos('rrfff');

        expect(rover.posicion.x).toEqual(3);
        expect(rover.posicion.y).toEqual(0);
        expect(explorer.posicion.x).toEqual(0);
        expect(explorer.posicion.y).toEqual(-3);

    });
});


