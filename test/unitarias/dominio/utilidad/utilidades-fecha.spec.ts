import { UtilidadesFecha } from 'src/dominio/utilidad/utilidades-fecha';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';

describe('Utilidades Fecha', () => {
  it('Deberia devolver que no es festivo', () => {
    // arrange
    const fecha: Date = new Date('2022-2-23');

    // assert
    expect(UtilidadesFecha.esFestivo(fecha)).toBe(false);
  });

  it('Deberia devolver que si es festivo', () => {
    // arrange
    const fecha = new Date('2022-12-25');

    // assert
    expect(UtilidadesFecha.esFestivo(fecha)).toBe(false);
  });

  it('Deberia devolver que no es fin de semana', () => {
    // arrange
    const fecha: Date = new Date('2017-12-22');

    // assert
    expect(UtilidadesFecha.esFinDeSemana(fecha)).toBe(false);
  });

  it('Deberia devolver que si es fin de semana para un sábado', () => {
    // arrange
    const fecha: Date = new Date('2017-12-23');

    // assert
    expect(UtilidadesFecha.esFinDeSemana(fecha)).toBe(false);
  });

  it('Deberia devolver que si es fin de semana para un domingo', () => {
    // arrange
    const fecha: Date = new Date('2017-12-24');

    // assert
    expect(UtilidadesFecha.esFinDeSemana(fecha)).toBe(true);
  });
});
