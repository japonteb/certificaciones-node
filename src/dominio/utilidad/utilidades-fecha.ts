export class UtilidadesFecha {
  public static arregloFestivos: Date[] = [
    new Date(2022, 1, 1),
    new Date(2022, 1, 10),
    new Date(2022, 3, 21),
    new Date(2022, 4, 14),
    new Date(2022, 4, 15),
    new Date(2022, 5, 1),
    new Date(2022, 5, 30),
    new Date(2022, 6, 20),
    new Date(2022, 6, 27),
    new Date(2022, 7, 4),
    new Date(2022, 7, 20),
    new Date(2022, 8, 7),
    new Date(2022, 8, 15),
    new Date(2022, 10, 17),
    new Date(2022, 11, 7),
    new Date(2022, 11, 14),
    new Date(2022, 12, 8),
    new Date(2022, 12, 25),
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
