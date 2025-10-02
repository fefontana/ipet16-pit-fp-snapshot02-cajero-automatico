// La función model es un codigo de programa javascript que crea el objeto cajero automático en cuestión.
// Se cuestiona:
// ¿Donde "vive" este objeto? (indique su ubicación y existencia en un diagrama de arquitectura de sistema)
// ¿Cuanto "vive" este objeto? Entonces, ¿Cómo se destruye?
// ¿Cómo es posible crear tal estructura?
// ¿Exactamente en que instante se genera? (indique la linea de código asociada)


function model() {
    let estado = false;
    let hashTableMoney = new Map();
    let nroextraccion = 0;

    return {
        configurar(billetes) {
            billetes.forEach(b => hashTableMoney.set(b, 0));
        },
        cargar(montos) {

            if (estado) {
                console.log("No se puede cargar con cajero encendido. Primero apague.");
                return;
            }
            else{
                let i = 0;
                for (let billete of hashTableMoney.keys()) {
                    hashTableMoney.set(billete, montos[i]);
                    i++;
                }
            }

        },
        //status(nuevoEstado) {
        status() {
            //estado = (nuevoEstado === 'ON');
            console.log(`Estado del cajero: ${estado ? '✅ Encendido' : '❌ Apagado'}`);
        },
        start() {
            estado = true;
            console.log("Cajero encendido.");
        },
        stop() {
            estado = false;
            console.log("Cajero apagado.");
        },
        retirar(monto) {
            if (!estado) {
                console.log("No se puede retirar. El cajero está apagado.");
                return false;
            }
            if(isNaN(monto)){
                console.log("⚠️ Eso NO es un número entero válido.");
                return false;
            }
            if(parseInt(monto) <= 0 || monto==''){
                console.log("⚠️ Monto inválido.");
                return false;
            }

            const saldoDisponible = this.verificarDisponibilidadSaldo();
            if (monto > saldoDisponible) {
                console.log("⚠️ Fondos insuficientes.");
                return false;
            }

            const resultado = this.decidirBilletesSegunMontoSolicitado(monto);
            if (!resultado.exito) {
                console.log("⚠️ No se puede entregar el monto exacto con los billetes disponibles.");
                return false;
            }

            this.entregarBilletes(resultado.billetesEntregados);
            console.log("Retiro exitoso:");
            nroextraccion++;
            resultado.billetesEntregados.forEach(([billete, cantidad]) => {
                console.log(`${cantidad} billete(s) de $${billete}`);
            });

            console.log(`Saldo restante: $${this.verificarDisponibilidadSaldo()}`);
            return true;
        },
        verificarDisponibilidadSaldo() {
            if (!estado) {
                console.log("No se puede consultar saldo con cajero apagado.");
                return;
            }
            else{
                let total = 0;
                hashTableMoney.forEach((cantidad, billete) => {
                    total += cantidad * billete;
                });
                return total;
            }
        },
        showCaja() {
            //let total = 0;
            hashTableMoney.forEach((cantidad, billete) => {
                console.log("Billetes de [" + billete + "]: " + cantidad);
                //total += cantidad * billete;
            });
            //return total;
        },
        
        showNroExtraccion(){
            return nroextraccion;
        },
        decidirBilletesSegunMontoSolicitado(monto) {
            let montoRestante = monto;
            const billetesEntregados = [];
            const copia = new Map(hashTableMoney);

            const billetesOrdenados = Array.from(copia.keys()).sort((a, b) => b - a);

            for (let billete of billetesOrdenados) {
                const cantidadDisponible = copia.get(billete);
                const cantidadNecesaria = Math.floor(montoRestante / billete);
                const cantidadAEntregar = Math.min(cantidadDisponible, cantidadNecesaria);

                if (cantidadAEntregar > 0) {
                    billetesEntregados.push([billete, cantidadAEntregar]);
                    montoRestante -= cantidadAEntregar * billete;
                    copia.set(billete, cantidadDisponible - cantidadAEntregar);
                }
            }

            if (montoRestante > 0) {
                return { exito: false };
            }

            return { exito: true, billetesEntregados };
        },
        entregarBilletes(billetesEntregados) {
            billetesEntregados.forEach(([billete, cantidad]) => {
                const actual = hashTableMoney.get(billete);
                hashTableMoney.set(billete, actual - cantidad);
            });
        }
    };
}
