import { UtilidadesFecha } from 'src/dominio/utilidad/utilidades-fecha';

describe('Utilidades Fecha', () => {
  it('Deberia devolver que no es festivo', () => {
    // Arrange
    const fecha: Date = new Date(Date.UTC(2022, 3, 6, 5, 0, 0));

    // Act - Assert
    expect(UtilidadesFecha.esFestivo(fecha)).toBe(false);
  });

  it('Deberia devolver que si es festivo', () => {
    // Arrange
    const fecha: Date = new Date(Date.UTC(2022, 11, 25, 5, 0, 0));

    // Act - Assert
    expect(UtilidadesFecha.esFestivo(fecha)).toBe(true);
  });

  it('Deberia devolver que no es fin de semana', () => {
    // Arrange
    const fecha: Date = new Date(Date.UTC(2022, 3, 6, 5, 0, 0));

    // Act - Assert
    expect(UtilidadesFecha.esFinDeSemana(fecha)).toBe(false);
  });

  it('Deberia devolver que si es fin de semana para un sábado', () => {
    // Arrange
    const fecha: Date = new Date(Date.UTC(2022, 5, 11, 5, 0, 0));

    // Act - Assert
    expect(UtilidadesFecha.esFinDeSemana(fecha)).toBe(true);
  });

  it('Deberia devolver que si es fin de semana para un domingo', () => {
    // Arrange
    const fecha: Date = new Date(Date.UTC(2022, 9, 23, 5, 0, 0));

    // Act - Assert
    expect(UtilidadesFecha.esFinDeSemana(fecha)).toBe(true);
  });
});
