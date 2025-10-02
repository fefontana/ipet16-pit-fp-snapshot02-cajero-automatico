function actualizarUI() {
  const botones = {
    crear: document.getElementById('crear'),
    status: document.getElementById('status'),
    cargar: document.getElementById('cargar'),
    start: document.getElementById('start'),
    stop: document.getElementById('stop'),
    saldo: document.getElementById('saldo'),
    extraer: document.getElementById('extraer')
  };

  switch (estadoCajero) {
    case 'inicial':
      botones.crear.disabled = false;
      botones.status.disabled = true;
      botones.cargar.disabled = true;
      botones.start.disabled = true;
      botones.stop.disabled = true;
      botones.saldo.disabled = true;
      botones.extraer.disabled = true;
      break;
    case 'creado':
      botones.crear.disabled = true;
      botones.status.disabled = false;
      botones.cargar.disabled = false;
      botones.start.disabled = false;
      botones.stop.disabled = true;
      botones.saldo.disabled = true;
      botones.extraer.disabled = true;
      break;
    case 'encendido':
      botones.crear.disabled = true;
      botones.status.disabled = false;
      botones.cargar.disabled = true;
      botones.start.disabled = true;
      botones.stop.disabled = false;
      botones.saldo.disabled = false;
      botones.extraer.disabled = false;
      break;
    case 'apagado':
      botones.crear.disabled = false;
      botones.status.disabled = false;
      botones.cargar.disabled = false;
      botones.start.disabled = false;
      botones.stop.disabled = true;
      botones.saldo.disabled = true;
      botones.extraer.disabled = true;
      // Limpiar input y ticket al apagar
      document.getElementById('valor').value = '';
      document.getElementById('ticket').value = '';
      break;

    case 'cargado':
      botones.crear.disabled = false;
      botones.status.disabled = false;
      botones.cargar.disabled = false;
      botones.start.disabled = false;
      botones.stop.disabled = true;
      botones.saldo.disabled = true;
      botones.extraer.disabled = true;
      break;
  }
}