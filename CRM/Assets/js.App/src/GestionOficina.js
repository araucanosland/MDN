var cargadorGestionOficina = {

    //================================ MODAL GESTION OFICINA ================================ -->

    cargaGestion1: function (codIngreso, tipoG) {
      
        $.SecGetJSON(BASE_URL + "/motor/api/Licencias/lista-gestion-oficina", { codingreso: codIngreso, tipog: tipoG }, function (result) {
            
              
            $("#hddevuelta").val('');

            $("#ddlGestion").val(1);
            $("#ddlGestion2").val(1);
            $("#ddlGestion3").val(1);

           

            $("#ddltipo").val('-');
            $("#ddltipo_g3").val('-1');
            $("#ddltipo_g2").val('-1');

            $("#nombre_contacto_g1").val('');
            $("#nombre_contacto_g3").val('');
            $("#nombre_contacto_g2").val('');

            $("#telefono_contacto_g1").val('');
            $("#telefono_contacto_g2").val('');
            $("#telefono_contacto").val('');

            $("#correo_g1").val('');
            $("#correo_g2").val('');
            $("#correo_g3").val('');

            $("#numero_g1").val('');
            $("#numero_g2").val('');
            $("#numero").val('');

            $("#ddlregion").val(0);
            $("#ddlregion_g2").val(0);
            $("#ddlregion_g1").val(0);

            $("#ddlcomuna").val(0);
            $("#ddlcomuna_g2").val(0);
            $("#ddlcomuna_g1").val(0);

            $("#direccion").val('');
            $("#direccion_g2").val('');
            $("#direccion_g1").val('');

            $("#comentarios3").val('');
            $("#comentarios2").val('');
            $("#comentarios").val('');


            //$("#txtregion_g1").hide();
            //$("#txtcomuna_g1").hide();
            //$("#direccion_g1").hide();
            //$("#numero_g1").hide();


            $("#ddlGestion").trigger('change');
            $("#ddlGestion2").trigger('change');
            $("#ddlGestion3").trigger('change');

            $("#btn-guardar-gestion-1").prop("disabled", false);
            $("#ddlGestion2").prop("disabled", false);
            $("#ddlGestion3").prop("disabled", false);
            $("#ddlGestion").prop("disabled", false);
            $("#comentarios").prop("disabled", false);
            $("#comentarios2").prop("disabled", false);
            $("#comentarios3").prop("disabled", false);
            $("#fecha_gestion_1").prop("disabled", true);
            $("#ddltipo").prop("disabled", false);
            $("#nombre_contacto_g1").prop("disabled", false);
            $("#telefono_contacto_g1").prop("disabled", false);
            $("#correo_g1").prop("disabled", false);
            
            $("#btn-guardar-gestion-2").prop("disabled", false);
           
           
            $("#fecha_gestion_2").prop("disabled", true);
            $("#ddltipo_g2").prop("disabled", false);
            $("#nombre_contacto_g2").prop("disabled", false);
            $("#telefono_contacto_g2").prop("disabled", false);
            $("#correo_g2").prop("disabled", false);
            $("#txtregion_g2").prop("disabled", false);
            $("#txtcomuna_g2").prop("disabled", false);
            $("#direccion_g2").prop("disabled", false);
            $("#numero_g2").prop("disabled", false);
            $("fecha_gestion_3").prop("disabled", true);
            $("#tab_gestion-1").prop("disabled", false);
            $("#tab_gestion-2").prop("disabled", true);
            $("#tab_gestion-3").prop("disabled", true);
            $('#myTab2 a[href="#gestion-1"]').tab('show');
            $.each(result, function (i, e) {
           
                if (e.NGestion == 1) {// N
                    $("#ddlGestion").prop("disabled", false);
                    $("#tab_gestion-2").prop("disabled", false);
                    $("#ddlGestion").val(e.idGestion);
                    $("#comentarios").val(e.Comentarios);
                    $("#fecha_gestion_1").val(e.Fechagestion.toFecha());
                    $("#btn-guardar-gestion-1").prop("disabled", true);
                    $("#ddlGestion").prop("disabled", true);
                    $("#comentarios").prop("disabled", true);
                    $("#fecha_gestion_1").prop("disabled", true);
                    $("#ddltipo").prop("disabled", true);
                    $("#nombre_contacto_g1").prop("disabled", true);
                    $("#telefono_contacto_g1").prop("disabled", true);
                    $("#correo_g1").prop("disabled", true);
                    $("#divregion_g2").hide();
                    $("#divcomuna_g2").hide();
                    $("#divdireccion_g2").hide();
                    $("#divnumero_g2").hide();
                    $("#divregion_g1").hide();
                    $("#divcomuna_g1").hide();
                    $("#divdireccion_g1").hide();
                    $("#divnumero_g1").hide();
              
                   
              
                    if (e.idGestion == "1") {//Contacto Telefónico
                      
                        $("#div_ddltipo").show();
                        $("#div_telefono_contacto_g1").show();
                        $("#div_nombre_contacto_g1").show();
                        $("#div_correo_g1").hide();
                        $("#ddltipo").val(e.tipoContacto);
                        $("#nombre_contacto_g1").val(e.contacto);
                        $("#telefono_contacto_g1").val(e.TelefonoContacto);
                       
                       

                    }
                    if (e.idGestion == "2") {//Correo electronico
                      
                        $("#div_ddltipo").show();
                        $("#div_telefono_contacto_g1").hide();
                        $("#div_nombre_contacto_g1").show();
                        $("#div_correo_g1").show();
                        $("#correo_g1").val(e.correo);
                        $("#ddltipo").val(e.tipoContacto);
                        $("#nombre_contacto_g1").val(e.contacto);
                   

                    }
                    if (e.idGestion == "3") {//Visita a Terreno
                       
                      
                        $("#div_ddltipo").show();
                        $("#div_telefono_contacto_g1").hide();
                        $("#div_nombre_contacto_g1").show();
                        $("#div_correo_g1").hide();
                        $("#ddltipo").val(e.tipoContacto);

                        $("#nombre_contacto_g1").val(e.contacto);

                        //-------Region
                        $("#divregion").show();
                        $("#txtregion_g1").val(e.region);
                        $("#txtregion_g1").prop("disabled", true);
                        $("#txtregion_g1").show();
                        $("#ddlregion_g1").hide();

                        //-------Comuna
                        $("#divcomuna").show();
                        $("#txtcomuna_g1").val(e.comuna);
                        $("#txtcomuna_g1").prop("disabled", true);
                        $("#txtcomuna_g1").show();
                        $("#ddlcomuna_g1").hide();

                        //---Direccion

                        $("#divdireccion").show();
                        $("#direccion_g1").val(e.direccion);
                        $("#direccion_g1").prop("disabled", true);

                       // -----numero 
                        $("#divnumero").show();
                        $("#numero_g1").prop("disabled", true);
                        $("#numero_g1").val(e.numero);

                    }

                   // $("#ddlGestion").trigger('change');
                }
                if (e.NGestion == 2) {
                    $("#tab_gestion-3").prop("disabled", false);
                    $("#ddlGestion2").val(e.idGestion);
                    $("#comentarios2").val(e.Comentarios);
                    $("#fecha_gestion_2").val(e.Fechagestion.toFecha());
                    $("#btn-guardar-gestion-2").prop("disabled", true);
                    $("#ddlGestion2").prop("disabled", true);
                    $("#comentarios2").prop("disabled", true);
                    $("#fecha_gestion_2").prop("disabled", true);
                    $("#ddltipo_g2").prop("disabled", true);
                    $("#nombre_contacto_g2").prop("disabled", true);
                    $("#telefono_contacto_g2").prop("disabled", true);
                    $("#divregion_g2").hide();
                    $("#divcomuna_g2").hide();
                    $("#divdireccion_g2").hide();
                    $("#divnumero_g2").hide();
                    $("#divregion_g1").hide();
                    $("#divcomuna_g1").hide();
                    $("#divdireccion_g1").hide();
                    $("#divnumero_g1").hide();

                    if (e.idGestion == "1") {//Contacto Telefónico

                        $("#div_ddltipo_g2").show();
                        $("#div_telefono_contacto_g2").show();
                        $("#div_nombre_contacto_g2").show();
                        $("#div_correo_g2").hide();
                        $("#ddltipo_g2").val(e.tipoContacto);
                        $("#nombre_contacto_g2").val(e.contacto);
                        $("#telefono_contacto_g2").val(e.TelefonoContacto);
                    
                    }
                    if (e.idGestion == "2") {//Contacto Telefónico

                        $("#div_ddltipo_g2").show();
                        $("#div_telefono_contacto_g2").hide();
                        $("#div_nombre_contacto_g2").show();
                        $("#div_correo_g2").show();
                        $("#correo_g2").val(e.correo);
                        $("#div_telefono_contacto_g2").hide();
                        $("#div_nombre_contacto_g2").show();
                        $("#div_correo_g2").show();
                        $("#correo_g2").val(e.correo);
                        $("#ddltipo_g2").val(e.tipoContacto);
                        $("#nombre_contacto_g2").val(e.contacto);
                        $("#correo_g2").prop("disabled", true);
               
                    }
                    if (e.idGestion == "3") {//Visita a Terreno

                        //$("#div_ddltipo_g2").hide();
                        //$("#div_telefono_contacto_g2").hide();
                        //$("#div_nombre_contacto_g2").hide();
                        //$("#div_correo_g2").hide();

                        $("#div_ddltipo_g2").show();
                        $("#div_telefono_contacto_g2").hide();
                        $("#div_nombre_contacto_g2").show();
                        $("#div_correo_g2").hide();
                        $("#ddltipo_g2").val(e.tipoContacto);
                        $("#ddltipo_g2").prop("disabled", true);
                        $("#nombre_contacto_g2").val(e.contacto);

                        //-------Region
                        $("#divregion_g2").show();
                        $("#txtregion_g2").val(e.region);
                        $("#txtregion_g2").prop("disabled", true);
                        $("#txtregion_g2").show();
                        $("#ddlregion_g2").hide();

                        //-------Comuna
                        $("#divcomuna_g2").show();
                        $("#txtcomuna_g2").val(e.comuna);
                        $("#txtcomuna_g2").prop("disabled", true);
                        $("#txtcomuna_g2").show();
                        $("#ddlcomuna_g2").hide();

                        //---Direccion

                        $("#divdireccion_g2").show();
                        $("#direccion_g2").val(e.direccion);
                        $("#direccion_g2").prop("disabled", true);

                        //-----numero 
                        $("#divnumero_g2").show();
                        $("#numero_g2").prop("disabled", true);
                        $("#numero_g2").val(e.numero);


                    }

                    //$("#ddlGestion2").trigger('change');
                }
                if (e.NGestion == 3) {

                   
                    $("#ddlregion").prop("disabled", true);
                    $("#comentarios3").prop("disabled", true);
                    $("#comentarios3").val(e.Comentarios);
                    $("#fecha_gestion_3").val(e.Fechagestion.toFecha());
                    $("#fecha_gestion_3").prop("disabled", true);

                    $("#ddlcomuna").prop("disabled", true);

                    $("#direccion").val(e.direccion);
                    $("#direccion").prop("disabled", true);

                    $("#txtcomuna").val(e.comuna);
                    $("#txtcomuna").prop("disabled", true);
                    $("#txtcomuna").show();
                    $("#ddlcomuna").hide();

                    $("#txtregion").val(e.region);
                    $("#txtregion").prop("disabled", true);
                    $("#txtregion").show();
                    $("#ddlregion").hide();


                    $("#numero").prop("disabled", true);
                    $("#btn-guardar-gestion-3").prop("disabled", true);
                    $("#direcion").prop("disabled", true);

                    $("#nombre_contacto_g3").prop("disabled", true);
                    $("#ddltipo_g3").val(e.tipoContacto);
                    $("#nombre_contacto_g3").val(e.contacto);
                }
            })



        });
    },
    cargaRegion: function () {

        $.SecGetJSON(BASE_URL + "/motor/api/Licencias/lista-regiones", function (datos) {

            $("#ddlregion").html("");
            $.each(datos, function (i, region) {

                $("#ddlregion").append($("<option>").val(region.Id).html(region.Nombre).data("id", region.Id).data("nombre", region.Nombre));
            });
        });



    },
    cargaComuna: function (regionId) {

        $.SecGetJSON(BASE_URL + "/motor/api/Licencias/lista-comunas", { regionid: regionId }, function (datos) {

            $("#ddlcomuna").html("");
            $.each(datos, function (i, region) {

                $("#ddlcomuna").append($("<option>").val(region.Id).html(region.Nombre).data("id", region.Id).data("nombre", region.Nombre));
            });
        });



    },
    cargaRegion_g1: function () {

        $.SecGetJSON(BASE_URL + "/motor/api/Licencias/lista-regiones", function (datos) {

            $("#ddlregion_g1").html("");
            $.each(datos, function (i, region) {

                $("#ddlregion_g1").append($("<option>").val(region.Id).html(region.Nombre).data("id", region.Id).data("nombre", region.Nombre));
            });
        });



    },
    cargaComuna_g1: function (regionId) {

        $.SecGetJSON(BASE_URL + "/motor/api/Licencias/lista-comunas", { regionid: regionId }, function (datos) {

            $("#ddlcomuna_g1").html("");
            $.each(datos, function (i, region) {

                $("#ddlcomuna_g1").append($("<option>").val(region.Id).html(region.Nombre).data("id", region.Id).data("nombre", region.Nombre));
            });
        });



    },
    cargaRegion_g2: function () {

        $.SecGetJSON(BASE_URL + "/motor/api/Licencias/lista-regiones", function (datos) {

            $("#ddlregion_g2").html("");
            $.each(datos, function (i, region) {

                $("#ddlregion_g2").append($("<option>").val(region.Id).html(region.Nombre).data("id", region.Id).data("nombre", region.Nombre));
            });
        });



    },
    cargaComuna_g2: function (regionId) {

        $.SecGetJSON(BASE_URL + "/motor/api/Licencias/lista-comunas", { regionid: regionId }, function (datos) {

            $("#ddlcomuna_g2").html("");
            $.each(datos, function (i, region) {

                $("#ddlcomuna_g2").append($("<option>").val(region.Id).html(region.Nombre).data("id", region.Id).data("nombre", region.Nombre));
            });
        });



    },



    guardarGestion: function (WebGestionOficinas) {

        $.SecPostJSON(BASE_URL + "/motor/api/Licencias/guardar-gestion-oficina", WebGestionOficinas, function (respuesta) {

          
            if (respuesta.Estado === "OK") {
                if (respuesta.Objeto.nGestion == 3) {
                    $.niftyNoty({
                        type: 'success',
                        icon: 'pli-like-2 icon-2x',
                        message: 'Carta certficiada enviada correctamente!!.',
                        container: '#tabcontent',
                        timer: 3000,
                        onHidden: function () {
                            location.href = BASE_URL + "/motor/App/Licencias"
                        }
                    });


                } else {

                    $.niftyNoty({
                        type: 'success',
                        icon: 'pli-like-2 icon-2x',
                        message: 'Gestión guardada correctamente!!.',
                        container: '#tabcontent',
                        timer: 3000
                    });

                }
           
                if (respuesta.Objeto.nGestion == 1) {
                    $("#tab_gestion-2").prop("disabled", false);
                    $("#btn-guardar-gestion-1").prop("disabled", true);
                    $("#ddlGestion").prop("disabled", true);
                    $("#comentarios").prop("disabled", true);
                    $("#fecha_gestion_1").prop("disabled", true);
                    $("#ddltipo").prop("disabled", true);
                    $("#nombre_contacto_g1").prop("disabled", true);
                    $("#telefono_contacto_g1").prop("disabled", true);
                    $("#correo_g1").prop("disabled", true);
                    $("#ddlregion_g1").prop("disabled", true);
                    $("#ddlcomuna_g1").prop("disabled", true);
                    $("#direccion_g1").prop("disabled", true);
                    $("#numero_g1").prop("disabled", true);
                }
                if (respuesta.Objeto.nGestion == 2) {
                    ;
                    $("#tab_gestion-3").prop("disabled", false);
                    $("#btn-guardar-gestion-2").prop("disabled", true);
                    $("#ddlGestion2").prop("disabled", true);
                    $("#comentarios2").prop("disabled", true);
                    $("#fecha_gestion_2").prop("disabled", true);
                    $("#ddltipo_g2").prop("disabled", true);
                    $("#nombre_contacto_g2").prop("disabled", true);
                    $("#telefono_contacto_g2").prop("disabled", true);
                    $("#correo_g2").prop("disabled", true);
                    $("#ddlregion_g2").prop("disabled", true);
                    $("#ddlcomuna_g2").prop("disabled", true);
                    $("#direccion_g2").prop("disabled", true);
                    $("#numero_g2").prop("disabled", true);

                }
                if (respuesta.Objeto.nGestion == 3) {
                   
                    $("#ddlcomuna").prop("disabled", true);
                    $("#comentarios3").prop("disabled", true);
                    $("#fecha_gestion_3").prop("disabled", true);
                    $("#ddlcomuna").prop("disabled", true);
                    $("#btn-guardar-gestion-3").prop("disabled", true);
                    $("#ddlregion").prop("disabled", true);
                    $("#direccion").prop("disabled", true);
                    $("#numero").prop("disabled", true);
                    $("#nombre_contacto_g3").prop("disabled", true);

                }


            }
        });

    }
}


$(function () {

    var hoy = new Date();
    var d = hoy.getDate().toString().paddingLeft("00") + "-" + (hoy.getMonth() + 1).toString().paddingLeft("00") + "-" + hoy.getFullYear().toString();

    $('#demo-foo-filtering_devueltas_gestion').footable().on('footable_filtering', function (e) {

        e.clear = !e.filter;
    });


    $('#demo-foo-filtering_busqueda').footable().on('footable_filtering', function (e) {

        e.clear = !e.filter;
    });

    $('#myTab2 a[href="#gestion-1"]').tab('show');


    $("#ddlregion").on("change", function (e) {

        if ($(this).find(':selected').data('id') > 0) {

            cargadorGestionOficina.cargaComuna($("#ddlregion").val());

        }
    });


    $("#ddlregion_g1").on("change", function (e) {

        if ($(this).find(':selected').data('id') > 0) {

            cargadorGestionOficina.cargaComuna_g1($("#ddlregion_g1").val());

        }
    });
    $("#ddlregion_g2").on("change", function (e) {

        if ($(this).find(':selected').data('id') > 0) {

            cargadorGestionOficina.cargaComuna_g2($("#ddlregion_g2").val());

        }
    });



    $("#tab_gestion-1").prop("disabled", false);
    $("#tab_gestion-2").prop("disabled", true);
    $("#tab_gestion-3").prop("disabled", true);

    $("#fecha_gestion_1").prop("disabled", true);
    $("#fecha_gestion_2").prop("disabled", true);
    $("#fecha_gestion_3").prop("disabled", true);

    $("#fecha_gestion_1").val(d);
    $("#fecha_gestion_2").val(d);
    $("#fecha_gestion_3").val(d);
    $('#modal-gestion-oficina').on('show.bs.modal', function (event) {
 
        var link = $(event.relatedTarget);
        if (typeof $(link).data("codingreso") != 'undefined') {
            var tipo = $(link).data("tipo")
            var codingreso = $(link).data("codingreso");
            $("#hdCodIngreso").val(codingreso);
            $("#hddevuelta").val(tipo);
            cargadorGestionOficina.cargaGestion1(codingreso, tipo);

            cargadorGestionOficina.cargaRegion();
            cargadorGestionOficina.cargaRegion_g1();
            cargadorGestionOficina.cargaRegion_g2();

        }
    })




    $("#btn-guardar-gestion-2").on("click", function () {

        if ($("#ddlGestion2").val() == "-1") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error</strong> Debe seleccionar una gestión ',
                container: '#tabcontent',
                timer: 5000
            });
            $("#ddlGestio2n").focus();
            return;
        }


        if ($("#ddlGestion2").val() == "1") {//Contacto Telefónico

            if ($("#ddltipo_g2").val() == "-1") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe seleccionar a quien contacta',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#ddltipo_g2").focus();
                return;
            }
            if ($("#nombre_contacto_g2").val() == "") {

                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe ingresar nombre de contacto',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#nombre_contacto_g2").focus();
                return;
            }
            if ($("#telefono_contacto_g2").val() == "") {

                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe ingresar teléfono o celular de contacto',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#telefono_contacto_g2").focus();
                return;
            }
            var dato = $('#telefono_contacto_g2').val();
            //if (dato != '') {

            if (dato.length != 9) {
                $.niftyNoty({
                    type: 'danger',
                    container: '#tabcontent',
                    html: '<strong>Error</strong> Largo teléfono o celular no válido (9 números)!!',
                    timer: 5000
                });
                $('#telefono_contacto_g2').focus();
                return;
            }
            //}

            if (isNaN(dato)) {
                $.niftyNoty({
                    type: 'danger',
                    container: '#tabcontent',
                    html: '<strong>Error</strong> Formato de teléfono o celualar no válido!!',
                    timer: 5000
                });
                $('#telefono_contacto_g2').focus();
                return;
            }

        }

        if ($("#ddlGestion2").val() == "2") {//correo electronico

        
            var correoaux = $("#correo_g2").val()
            if (correoaux == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe ingresar un correo electrónico',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#correo_g2").focus();
                return;
            }


            var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            if (regex.test(correoaux)==false) {

                $.niftyNoty({
                    type: 'danger',
                    container: '#tabcontent',
                    html: '<strong>Error</strong> Formato de Email no válido!!',
                    focus: false,
                    timer: 5000
                });

                $("#correo_g2").focus();
                return;

            }

        }

        if ($("#ddlGestion2").val() == "3") {//visita terreno

            if ($("#ddltipo_g2").val() == "-1") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe seleccionar a quien contacta',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#ddltipo_g2").focus();
                return;
            }
            if ($("#nombre_contacto_g2").val() == "") {

                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe ingresar nombre de contacto',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#nombre_contacto_g2").focus();
                return;
            }
            if ($("#ddlregion_g2").val() == "0") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe seleccionar un región',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#ddlregion_g2").focus();
                return;
            }
            if ($("#ddlcomuna_g2").val() == "0") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe seleccionar comuna',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#ddlcomuna_g2").focus();
                return;
            }
            if ($("#direccion_g2").val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe ingresar una dirección',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#direccion_g2").focus();
                return;
            }

            if ($("#numero_g2").val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe ingresar una número de dirección',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#numero_g2").focus();
                return;
            }
        }

        if ($("#comentarios2").val() == "") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error</strong> Debe ingresar un comentario',
                container: '#tabcontent',
                timer: 5000
            });
            $("#comentarios2").focus();
            return;
        }

        var WebGestionOficinas = {
            codIngreso: $("#hdCodIngreso").val(),
            nGestion: "2",
            tipoDevuelta: $("#hddevuelta").val(),
            IdGestion: $("#ddlGestion2").val(),
            idRegion: $("#ddlregion_g2").val(),
            idComuna: $("#ddlcomuna_g2").val(),
            direccion: $("#direccion_g2").val(),
            comentarios: $("#comentarios2").val(),
            tipo: $("#ddltipo_g2").val(),
            nombre_contacto: $("#nombre_contacto_g2").val(),
            telefono_contacto: $("#telefono_contacto_g2").val(),
            email: $("#correo_g2").val(),
            numero: $("#numero_g2").val(),
        }
        cargadorGestionOficina.guardarGestion(WebGestionOficinas);
    })

   

    $("#btn-guardar-gestion-1").on("click", function () {

        if ($("#ddlGestion").val() == "-1") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error</strong> Debe seleccionar una gestión',
                container: '#tabcontent',
                timer: 5000
            });
            $("#ddlGestion").focus();
            return;
        }
        if ($("#ddlGestion").val() == "1") {//Contacto Telefónico

            if ($("#ddltipo").val() == "-1") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe seleccionar a quien contacta',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#ddltipo").focus();
                return;
            }
            if ($("#nombre_contacto_g1").val() == "") {

                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe ingresar nombre de contacto',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#nombre_contacto_g1").focus();
                return;
            }
            if ($("#telefono_contacto_g1").val() == "") {

                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe ingresar teléfono o celular de contacto',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#telefono_contacto_g1").focus();
                return;
            }
            var dato = $('#telefono_contacto_g1').val();
            //if (dato != '') {

            if (dato.length != 9) {
                $.niftyNoty({
                    type: 'danger',
                    container: '#tabcontent',
                    html: '<strong>Error</strong> Largo teléfono o celular no válido (9 números)!!',
                    timer: 5000
                });
                $('#telefono_contacto_g1').focus();
                return;
            }
            //}

            if (isNaN(dato)) {
                $.niftyNoty({
                    type: 'danger',
                    container: '#tabcontent',
                    html: '<strong>Error</strong> Formato de teléfono o celualar no válido!!',
                    timer: 5000
                });
                $('#telefono_contacto_g1').focus();
                return;
            }

        }

        if ($("#ddlGestion").val() == "2") {//correo electronico

         
            var correoaux = $("#correo_g1").val()
            if (correoaux == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe ingresar un correo electrónico',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#correo_g1").focus();
                return;
            }


            var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            if (regex.test(correoaux)==false) {

                $.niftyNoty({
                    type: 'danger',
                    container: '#tabcontent',
                    html: '<strong>Error</strong> Formato de Email no válido!!',
                    focus: false,
                    timer: 5000
                });

                $("#correo_g1").focus();
                return;

            }

        }

        if ($("#ddlGestion").val() == "3") {//visita terreno

            if ($("#ddltipo").val() == "-1") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe seleccionar a quien contacta',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#ddltipo").focus();
                return;
            }
            if ($("#nombre_contacto_g1").val() == "") {

                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe ingresar nombre de contacto',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#nombre_contacto_g1").focus();
                return;
            }
            if ($("#ddlregion_g1").val() == "0") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe seleccionar un región',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#ddlregion_g1").focus();
                return;
            }
            if ($("#ddlcomuna_g1").val() == "0") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe seleccionar comuna',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#ddlcomuna_g1").focus();
                return;
            }
            if ($("#direccion_g1").val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe ingresar una dirección',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#direccion_g1").focus();
                return;
            }

            if ($("#numero_g1").val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error</strong> Debe ingresar una número de dirección',
                    container: '#tabcontent',
                    timer: 5000
                });
                $("#numero_g1").focus();
                return;
            }
        }
        if ($("#comentarios").val() == "") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error</strong> Debe ingresar un comentario',
                container: '#tabcontent',
                timer: 5000
            });
            $("#comentarios").focus();
            return;
        }

        var WebGestionOficinas = {
            codIngreso: $("#hdCodIngreso").val(),
            nGestion: "1",
            tipoDevuelta: $("#hddevuelta").val(),
            IdGestion: $("#ddlGestion").val(),
            idRegion: $("#ddlregion_g1").val(),
            idComuna: $("#ddlcomuna_g1").val(),
            direccion: $("#direccion_g1").val(),
            comentarios: $("#comentarios").val(),
            tipo: $("#ddltipo").val(),
            nombre_contacto: $("#nombre_contacto_g1").val(),
            telefono_contacto: $("#telefono_contacto_g1").val(),
            email: $("#correo_g1").val(),
            numero: $("#numero_g1").val()
        }
   
        cargadorGestionOficina.guardarGestion(WebGestionOficinas);
    })



    $("#ddlGestion").on("change", function (e) {
   
        //if ($(this).find(':selected').data('id') > 0) {

        if ($("#ddlGestion").val() == "1") {//Contacto Telefónico

            $("#div_ddltipo").show();
            $("#div_telefono_contacto_g1").show();
            $("#div_nombre_contacto_g1").show();
            $("#div_correo_g1").hide();
            $("#divregion").hide();
            $("#divcomuna").hide();
            $("#divdireccion").hide();
            $("#divnumero").hide();
            $("#ddlregion_g1").hide();
            $("#ddlcomuna_g1").hide();
            $("#txtregion_g1").hide();
            $("#txtcomuna_g1").hide();
            $("#lblregion").hide();
            $("#lblcomuna").hide();
            $("#lblnumero").hide();
            $("#lbldireccion").hide();
        }
        else if ($("#ddlGestion").val() == "2") {//Envío Correo Electrónico
            $("#div_ddltipo").show();
            $("#div_telefono_contacto_g1").hide();
            $("#div_nombre_contacto_g1").show();
            $("#div_correo_g1").show();
            $("#divregion").hide();
            $("#divcomuna").hide();
            $("#divdireccion").hide();
            $("#divnumero").hide();
            $("#ddlregion_g1").hide();
            $("#ddlcomuna_g1").hide();
            $("#txtregion_g1").hide();
            $("#txtcomuna_g1").hide();
            $("#lblregion").hide();
            $("#lblcomuna").hide();
            $("#lblnumero").hide();
            $("#lbldireccion").hide();
        }
        else if ($("#ddlGestion").val() == "3") {//Visita a Terreno
            $("#div_ddltipo").show();
            $("#div_telefono_contacto_g1").hide();
            $("#div_nombre_contacto_g1").show();
            $("#div_correo_g1").hide();
            $("#divregion").show();
            $("#divcomuna").show();
            $("#divdireccion").show();
            $("#divnumero").show();
            $("#ddlregion_g1").show();
            $("#ddlcomuna_g1").show();
            //$("#txtregion_g1").hide();
            //$("#txtcomuna_g1").hide();
            $("#lblregion").show();
            $("#lblcomuna").show();
            $("#lblnumero").show();
            $("#lbldireccion").show();
            $("#direccion_g1").prop("disabled", false);
            $("#numero_g1").prop("disabled", false);
            $("#ddlregion_g1").prop("disabled", false);
            $("#ddlcomuna_g1").prop("disabled", false);

        }

        //}
    });


    $("#ddlGestion2").on("change", function (e) {

    
        if ($("#ddlGestion2").val() == "1") {//Contacto Telefónico

            $("#div_ddltipo_g2").show();
            $("#div_telefono_contacto_g2").show();
            $("#div_nombre_contacto_g2").show();
            $("#div_correo_g2").hide();
            $("#divregion_g2").hide();
            $("#divcomuna_g2").hide();
            $("#divdireccion_g2").hide();
            $("#divnumero_g2").hide();
            $("#ddlregion_g2").hide();
            $("#ddlcomuna_g2").hide();
            $("#txtregion_g2").hide();
            $("#txtcomuna_g2").hide();
            $("#lblregion_g2").hide();
            $("#lblcomuna_g2").hide();
            $("#lblnumero_g2").hide();
            $("#lbldireccion_g2").hide();
        }
        else if ($("#ddlGestion2").val() == "2") {//Envío Correo Electrónico
            $("#div_ddltipo_g2").show();
            $("#div_telefono_contacto_g2").hide();
            $("#div_nombre_contacto_g2").show();
            $("#div_correo_g2").show();
            $("#divregion_g2").hide();
            $("#divcomuna_g2").hide();
            $("#divdireccion_g2").hide();
            $("#divnumero_g2").hide();
            $("#divdireccion_g2").hide();
            $("#divnumero_g2").hide();
            $("#ddlregion_g2").hide();
            $("#ddlcomuna_g2").hide();
            $("#txtregion_g2").hide();
            $("#txtcomuna_g2").hide();
            $("#lblregion_g2").hide();
            $("#lblcomuna_g2").hide();
            $("#lblnumero_g2").hide();
            $("#lbldireccion_g2").hide();
        }
        else if ($("#ddlGestion2").val() == "3") {//Visita a Terreno
            $("#div_ddltipo_g2").show();
            $("#div_telefono_contacto_g2").hide();
            $("#div_nombre_contacto_g2").show();
            $("#div_correo_g2").hide();
            $("#divregion_g2").show();
            $("#divcomuna_g2").show();
            $("#divdireccion_g2").show();
            $("#divnumero_g2").show();
            $("#ddlregion_g2").show();
            $("#ddlcomuna_g2").show();
            $("#txtregion_g2").hide();
            $("#txtcomuna_g2").hide();
            $("#lblregion_g2").show();
            $("#lblcomuna_g2").show();
            $("#lblnumero_g2").show();
            $("#lbldireccion_g2").show();
            $("#direccion_g2").prop("disabled", false);
            $("#numero_g2").prop("disabled", false);
            $("#ddlregion_g2").prop("disabled", false);
            $("#ddlcomuna_g2").prop("disabled", false);
        }

        //}
    });



    $("#btn-guardar-gestion-3").on("click", function () {

        if ($("#ddltipo_g3").val() == "-1") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error</strong> Debe seleccionar a quien contacta',
                container: '#tabcontent',
                timer: 5000
            });
            $("#ddltipo_g3").focus();
            return;
        }
        if ($("#nombre_contacto_g3").val() == "") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error</strong> Debe Ingresar Nombre De Contacto',
                container: '#tabcontent',
                timer: 5000
            });
            $("#nombre_contacto_g3").focus();
            return;
        }

        if ($("#ddlregion").val() == "0") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error</strong> Debe seleccionar un región',
                container: '#tabcontent',
                timer: 5000
            });
            $("#ddlregion").focus();
            return;
        }
        if ($("#ddlcomuna").val() == "0") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error</strong> Debe seleccionar comuna',
                container: '#tabcontent',
                timer: 5000
            });
            $("#ddlcomuna").focus();
            return;
        }
        if ($("#direccion").val() == "") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error</strong> Debe ingresar una dirección',
                container: '#tabcontent',
                timer: 5000
            });
            $("#direccion").focus();
            return;
        }

        if ($("#numero").val() == "") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error</strong> Debe ingresar una número de dirección',
                container: '#tabcontent',
                timer: 5000
            });
            $("#numero").focus();
            return;
        }



        if ($("#comentarios3").val() == "") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error</strong> Debe ingresar un comentario',
                container: '#tabcontent',
                timer: 5000
            });
            $("#comentarios3").focus();
            return;
        }
        $("#fecha_gestion_1").prop("disabled", true);
        var WebGestionOficinas = {
            codIngreso: $("#hdCodIngreso").val(),
            nGestion: "3",
            tipoDevuelta: $("#hddevuelta").val(),
            IdGestion: 0,
            idRegion: $("#ddlregion").val(),
            idComuna: $("#ddlcomuna").val(),
            direccion: $("#direccion").val(),
            comentarios: $("#comentarios3").val(),
            tipo: $("#ddltipo_g3").val(),
            nombre_contacto: $("#nombre_contacto_g3").val(),
            telefono_contacto: "",
            email: "",
            numero: $("#numero").val()

        }

        cargadorGestionOficina.guardarGestion(WebGestionOficinas);
    })

});



