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

  static #FESTIVOS = new Set<Date>(this.arregloFestivos);

  static esFestivo(fecha: Date): boolean {
    const fechaCopia = new Date(fecha.valueOf());
    fechaCopia.setHours(0, 0, 0, 0);

    return this.#FESTIVOS.has(fechaCopia);
  }

  public static esFinDeSemana(fecha: Date): boolean {
    const diaDeSemana: number = fecha.getDay();
    return diaDeSemana === 6 || diaDeSemana === 0;
  }
}
