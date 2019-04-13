"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Posicion = function Posicion(x, y) {
  _classCallCheck(this, Posicion);

  this.x = x;
  this.y = y;
};

var ElementoMapa = function ElementoMapa(nombre, x, y) {
  _classCallCheck(this, ElementoMapa);

  this.posicion = new Posicion(x, y);
  this.id = parseInt(Math.random() * 10000);
  this.nombre = nombre;
  this.colorStyle = 'rgb(0,0,0)';
  this.historialMovimientos = [];
  this.travelLog = [];
};

var Rover =
/*#__PURE__*/
function (_ElementoMapa) {
  _inherits(Rover, _ElementoMapa);

  function Rover(nombre, xinicio, yinicio, direccionInicial) {
    var _this;

    _classCallCheck(this, Rover);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rover).call(this, nombre, xinicio, yinicio));
    _this.direccionInicial = direccionInicial;
    _this.isVerbose = true;
    return _this;
  }

  _createClass(Rover, [{
    key: "getNewDirection",
    value: function getNewDirection(direccionActual, tipoMovimiento) {
      var listaDireccion = ['W', 'N', 'E', 'S'];

      if (tipoMovimiento === 'forward' || tipoMovimiento === 'backward') {
        return direccionActual;
      }

      var indexDir = listaDireccion.findIndex(function (letra) {
        return letra === direccionActual;
      });
      var newIndex = 0;

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
  }, {
    key: "validarMovimiento",
    value: function validarMovimiento(movimiento) {
      var listaMovPermitidos = ['forward', 'backward', 'turnLeft', 'turnRight'];
      var indexMov = listaMovPermitidos.findIndex(function (texto) {
        return texto === movimiento;
      });
      return indexMov >= 0;
    }
  }, {
    key: "mover",
    value: function mover(tipoMovimiento) {
      //validar
      var isValid = this.validarMovimiento(tipoMovimiento);

      if (!isValid) {
        return this;
      }

      var dir = this.direccion;
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


      this.posicion.x = this.posicion.x < -10 ? -10 : this.posicion.x;
      this.posicion.x = this.posicion.x > 10 ? 10 : this.posicion.x;
      this.posicion.y = this.posicion.y < -10 ? -10 : this.posicion.y;
      this.posicion.y = this.posicion.y > 10 ? 10 : this.posicion.y;

      if (this.isVerbose) {
        console.log(this.posicion);
      } //guardar historial de ubicaciones


      this.travelLog.push({
        x: this.posicion.x,
        y: this.posicion.y
      });
      return this;
    }
  }, {
    key: "moverConComandos",
    value: function moverConComandos(comandos) {
      comandos = comandos || '';

      if (comandos === '') {
        return;
      }

      var listaCodigo = comandos.split('');

      for (var i = 0; i < listaCodigo.length; i++) {
        var letra = listaCodigo[i];
        var m = '';

        if (letra === 'f') {
          m = 'forward';
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
    }
  }, {
    key: "resetPosicion",
    value: function resetPosicion() {
      this.direccion = 'N';
      this.posicion.x = 0;
      this.posicion.y = 0;
    }
  }, {
    key: "randomPosicion",
    value: function randomPosicion() {
      var n1 = parseInt(Math.random() * 20 + -10);
      var n2 = parseInt(Math.random() * 20 + -10);

      if (n1 < -10) {
        n1 = -10;
      }

      if (n1 > 10) {
        n1 = 10;
      }

      if (n2 < -10) {
        n2 = -10;
      }

      if (n2 > 10) {
        n2 = 10;
      }

      this.direccion = 'N';
      this.posicion.x = n1;
      this.posicion.y = n2;
    }
  }, {
    key: "setRandomColor",
    value: function setRandomColor() {
      var n1 = Math.random() * 255;
      var n2 = Math.random() * 255;
      var n3 = Math.random() * 255;
      this.colorStyle = 'rgb(' + n1 + ',' + n2 + ',' + n3 + ')';
    }
  }]);

  return Rover;
}(ElementoMapa);

if (module && module.exports) {
  module.exports = {
    factory: function factory(nombre, xinicio, yinicio, direccionInicial) {
      return new Rover(nombre, xinicio, yinicio, direccionInicial);
    }
  };
}