let Rover = require( '../public/scripts/rover');

let rover =  Rover.factory('mazinzaga',0,0,'N');
let explorer =  Rover.factory('robotina',0,0,'N');



describe("Mover ", function () {

  // rober es global asi que no se necesita insanciar el objeto
  it("test", function () {

    /* comando jasmine*/
    expect(3).toBe(3);




  });


});



