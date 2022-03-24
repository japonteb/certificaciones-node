import { Cliente } from 'src/dominio/cliente/modelo/cliente';
import { ErrorCodigoClienteInvalido } from 'src/dominio/errores/error-codigo-cliente-invalido';
import { ErrorValorRequerido } from 'src/dominio/errores/error-valor-requerido';
import { EnumeracionTipoCliente } from './../../../../src/dominio/cliente/modelo/enumeracion-tipo-cliente';
import { ClienteTestDataBuilder } from './builder/cliente-test-data-builder';

describe('Cliente', () => {
  it('cliente sin nombre debería retornar error', () => {
    // Arrange
    const clienteTestDataBuilder: ClienteTestDataBuilder =
      new ClienteTestDataBuilder().conNombre(null);

    // Act - Assert
    return expect(async () =>
      clienteTestDataBuilder.build()
    ).rejects.toStrictEqual(
      new ErrorValorRequerido('Se debe ingresar el nombre del cliente')
    );
  });

  it('cliente sin tipo de cliente debería retornar error', () => {
    // Arrange
    const clienteTestDataBuilder: ClienteTestDataBuilder =
      new ClienteTestDataBuilder().conCodigoTipoCliente(null);

    // Act - Assert
    return expect(async () =>
      clienteTestDataBuilder.build()
    ).rejects.toStrictEqual(
      new ErrorValorRequerido('Se debe ingresar el tipo de cliente')
    );
  });

  it('cliente con tipo de cliente inválido debería retornar error', () => {
    // Arrange
    const clienteTestDataBuilder: ClienteTestDataBuilder =
      new ClienteTestDataBuilder().conCodigoTipoCliente(5);

    // Act - Assert
    return expect(async () =>
      clienteTestDataBuilder.build()
    ).rejects.toStrictEqual(
      new ErrorCodigoClienteInvalido(
        'El código del tipo de cliente es inválido'
      )
    );
  });

  it('cliente con tipo de cliente correcto debería retornar la enumeración del tipo de cliente correcto', () => {
    // Arrange
    const clienteTestDataBuilder: ClienteTestDataBuilder =
      new ClienteTestDataBuilder();

    // Act
    const cliente: Cliente = clienteTestDataBuilder.build();

    // Assert
    expect(cliente.nombre).toEqual('William');
    expect(cliente.tipoCliente).toEqual(EnumeracionTipoCliente.CLIENTE_TIPO_4);
  });
});
