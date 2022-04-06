export class UtilidadesFecha {
  public static arregloFestivos: Date[] = [
    new Date('2022-01-01'),
    new Date('2022-01-10'),
    new Date('2022-03-21'),
    new Date('2022-04-14'),
    new Date('2022-04-15'),
    new Date('2022-05-01'),
    new Date('2022-05-30'),
    new Date('2022-06-20'),
    new Date('2022-06-27'),
    new Date('2022-07-04'),
    new Date('2022-07-20'),
    new Date('2022-08-07'),
    new Date('2022-08-15'),
    new Date('2022-10-17'),
    new Date('2022-11-07'),
    new Date('2022-11-14'),
    new Date('2022-12-08'),
    new Date('2022-12-25'),
  ];

  public static esFestivo(fecha: Date): boolean {
    let respuesta = false;

    this.arregloFestivos.forEach((festivo) => {
      if (
        festivo.getUTCMonth() === fecha.getUTCMonth() &&
        festivo.getUTCDate() === fecha.getUTCDate()
      ) {
        respuesta = true;
      }
    });

    return respuesta;
  }

  public static esFinDeSemana(fecha: Date): boolean {
    const SABADO = 6;
    const DOMINGO = 0;
    const diaDeSemana: number = fecha.getDay();
    return diaDeSemana === SABADO || diaDeSemana === DOMINGO;
  }
}
