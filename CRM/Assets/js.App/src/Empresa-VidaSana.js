var metodos = {

    CargaGrillaVidaSana: function (Rut, Credito, Estado, FechaVentaDesde, FechaVentaHasta, Filtro) {

        $("#tblDigitalizacion").bootstrapTable('refresh', {
            url: '/motor/api/digitalizacion/listar-digitalizacion',
            query: {
                Id: 0,
                Rut: Rut,
                Credito: Credito,
                Estado: Estado,
                FechaVentaDesde: FechaVentaDesde,
                FechaVentaHasta: FechaVentaHasta,
                Oficina: getCookie("Oficina"),
                Tipo: 1,
                Filtro: Filtro,
                Ejecutivo: getCookie("Rut")
            }
        });
    }
}

$(function () {
    $("#btn-gestion-VidaSana").on("click", function () {
        debugger;
        $('#modal-Vida-sana').modal('show');
    });
});