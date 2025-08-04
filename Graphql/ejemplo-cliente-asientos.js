// Ejemplo de implementación del cliente GraphQL para la pantalla de selección de asientos

// 1. Query para cargar datos iniciales del evento
const OBTENER_DATOS_EVENTO = `
  query ObtenerDatosEvento($eventoId: Int!) {
    evento(id: $eventoId) {
      id
      nombre
      descripcion
      fechaEvento
      horaInicio
      capacidadTotal
      entradasDisponibles
      imagenUrl
    }
    
    asientosPorEvento(eventoId: $eventoId) {
      nombre
      totalAsientos
      asientosDisponibles
      asientos {
        id
        seccion
        fila
        numero
        ocupado
        tipoAsiento
        precio
        posicionX
        posicionY
      }
    }
    
    tiposEntradaPorEvento(eventoId: $eventoId) {
      id
      nombre
      descripcion
      precio
      beneficios
    }
  }
`;

// 2. Mutation para reservar asientos seleccionados
const RESERVAR_ASIENTOS = `
  mutation ReservarAsientos($eventoId: Int!, $asientosIds: [Int!]!, $usuarioId: Int!) {
    reservarAsientos(eventoId: $eventoId, asientosIds: $asientosIds, usuarioId: $usuarioId) {
      exito
      mensaje
      asientosReservados
    }
  }
`;

// 3. Mutation para crear pedido final
const CREAR_PEDIDO = `
  mutation CrearPedido($createPedidoInput: CreatePedidoInput!) {
    crearPedido(createPedidoInput: $createPedidoInput) {
      id
      estado
      total
      fechaCreacion
      entradas {
        eventoId
        tipoEntradaId
        cantidad
        precio
        asientosAsignados
      }
    }
  }
`;

// Ejemplo de uso en React/Vue/Angular
class SeleccionAsientosComponent {
  constructor() {
    this.eventoId = 1; // ID del evento seleccionado
    this.usuarioId = 1; // ID del usuario logueado
    this.asientosSeleccionados = [];
    this.tipoEntradaSeleccionado = null;
  }

  // Cargar datos iniciales
  async cargarDatosEvento() {
    const variables = { eventoId: this.eventoId };
    
    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: OBTENER_DATOS_EVENTO,
          variables
        })
      });
      
      const data = await response.json();
      
      // Actualizar estado del componente
      this.evento = data.data.evento;
      this.secciones = data.data.asientosPorEvento;
      this.tiposEntrada = data.data.tiposEntradaPorEvento;
      
      this.renderizarMapaAsientos();
      this.renderizarTiposEntrada();
      
    } catch (error) {
      console.error('Error cargando datos del evento:', error);
    }
  }

  // Manejar selección de asiento
  async seleccionarAsiento(asientoId) {
    const asiento = this.encontrarAsientoPorId(asientoId);
    
    if (asiento.ocupado) {
      alert('Este asiento ya está ocupado');
      return;
    }

    // Toggle selección
    if (this.asientosSeleccionados.includes(asientoId)) {
      this.asientosSeleccionados = this.asientosSeleccionados.filter(id => id !== asientoId);
    } else {
      this.asientosSeleccionados.push(asientoId);
    }

    this.actualizarVisualizacionAsientos();
    this.actualizarResumenCompra();
  }

  // Confirmar reserva de asientos
  async confirmarReserva() {
    if (this.asientosSeleccionados.length === 0) {
      alert('Debe seleccionar al menos un asiento');
      return;
    }

    if (!this.tipoEntradaSeleccionado) {
      alert('Debe seleccionar un tipo de entrada');
      return;
    }

    const variables = {
      eventoId: this.eventoId,
      asientosIds: this.asientosSeleccionados,
      usuarioId: this.usuarioId
    };

    try {
      // 1. Reservar asientos temporalmente
      const reservaResponse = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: RESERVAR_ASIENTOS,
          variables
        })
      });

      const reservaData = await reservaResponse.json();

      if (!reservaData.data.reservarAsientos.exito) {
        alert(reservaData.data.reservarAsientos.mensaje);
        return;
      }

      // 2. Crear pedido
      await this.crearPedido();

    } catch (error) {
      console.error('Error en la reserva:', error);
      alert('Error al procesar la reserva. Por favor intente nuevamente.');
    }
  }

  // Crear pedido final
  async crearPedido() {
    const createPedidoInput = {
      usuarioId: this.usuarioId,
      entradas: [{
        eventoId: this.eventoId,
        tipoEntradaId: this.tipoEntradaSeleccionado.id,
        cantidad: this.asientosSeleccionados.length,
        asientosSeleccionados: this.asientosSeleccionados
      }]
    };

    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: CREAR_PEDIDO,
          variables: { createPedidoInput }
        })
      });

      const data = await response.json();
      const pedido = data.data.crearPedido;

      // Redirigir a página de pago o confirmación
      this.redirigirAPago(pedido.id);

    } catch (error) {
      console.error('Error creando pedido:', error);
    }
  }

  // Métodos de utilidad
  encontrarAsientoPorId(id) {
    for (const seccion of this.secciones) {
      const asiento = seccion.asientos.find(a => a.id === id);
      if (asiento) return asiento;
    }
    return null;
  }

  calcularTotal() {
    if (!this.tipoEntradaSeleccionado) return 0;
    return this.asientosSeleccionados.length * this.tipoEntradaSeleccionado.precio;
  }

  // Métodos de renderizado (específicos del framework usado)
  renderizarMapaAsientos() {
    // Implementar visualización del mapa de asientos
    // Mostrar asientos disponibles, ocupados y seleccionados
  }

  renderizarTiposEntrada() {
    // Renderizar las opciones de tipo de entrada como en la imagen:
    // - Entrada General
    // - Entrada VIP  
    // - Entrada Premium
  }

  actualizarVisualizacionAsientos() {
    // Actualizar estilos visuales de asientos seleccionados
  }

  actualizarResumenCompra() {
    // Actualizar el resumen con:
    // - Cantidad de asientos seleccionados
    // - Tipo de entrada
    // - Total a pagar
  }

  redirigirAPago(pedidoId) {
    // Redirigir a la página de pago con el ID del pedido
    window.location.href = `/pago/${pedidoId}`;
  }
}

// Ejemplo de variables para las queries
const ejemploVariables = {
  // Para cargar evento
  eventoId: 1,
  
  // Para reservar asientos
  reservarAsientos: {
    eventoId: 1,
    asientosIds: [15, 16, 17], // IDs de los asientos seleccionados
    usuarioId: 1
  },
  
  // Para crear pedido
  crearPedido: {
    createPedidoInput: {
      usuarioId: 1,
      entradas: [{
        eventoId: 1,
        tipoEntradaId: 2, // ID del tipo VIP
        cantidad: 3,
        asientosSeleccionados: [15, 16, 17]
      }]
    }
  }
};

export { SeleccionAsientosComponent, ejemploVariables };
