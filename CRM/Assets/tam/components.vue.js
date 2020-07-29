Vue.filter('formatoFecha', function (value) {
    if (value) {
        if (value === '0001-01-01T00:00:00') {
            return 'No Asignado'
        }
        return moment(String(value)).format('DD/MM/YYYY HH:mm')
    }
});

Vue.filter('formatoLogico', function (value) {
    if (value) {
        return value == '1' ? 'Si' : 'No';
    }
});


// Datepicker
Vue.component('bootstrap-date-picker', {
    template: `<div id="dp-contacto-sucursal">
                    <div class="input-group date">                    
                        <input type="text" v-datepicker class="datepicker form-control" :value="value" @input="update($event.target.value)">
                        <span class="input-group-addon"><i class="demo-pli-calendar-4"></i></span>
                    </div>
                </div>`,
    directives: {
        datepicker: {
            inserted(el, binding, vNode) {
                $(el).datepicker({
                    autoclose: true,
                    format: 'dd-mm-yyyy'
                }).on('changeDate', function (e) {
                    vNode.context.$emit('input', e.format(0))
                })
            }
        }
    },
    props: ['value'],
    methods: {
        update(v) {
            this.$emit('input', v)
        }
    }
});

//
Vue.component('afiliado-info', {
    template: `<div class="afiliado-data panel">
                    <div class="panel-heading">
					    <h4 class="panel-title">Datos Afiliado</h4>
					</div>
                    <div class="panel-body">
                        <div class="col-sm-2">
					        <div class="form-group">
					            <label class="control-label"><b>Rut:</b> {{ value.rut }}</label>
					        </div>
					    </div>
                        <div class="col-sm-4">
					        <div class="form-group">
					            <label class="control-label"><b>Nombres:</b> {{ value.nombre }}</label>
					        </div>
					    </div>
                        <div class="col-sm-2">
					        <div class="form-group">
					            <label class="control-label"><b>Edad:</b> {{ value.edad }}</label>
					        </div>
					    </div>
                        <div class="col-sm-2">
					        <div class="form-group">
					            <label class="control-label"><b>Posee TAM:</b> {{ value.flagTamMetro | formatoLogico }}</label>
					        </div>
					    </div>
                        <div class="col-sm-2">
					        <div class="form-group">
					            <label class="control-label"><b>Score:</b> {{ score }} / 3</label>
					        </div>
					    </div>
                    </div>
               </div>`,
    props: ['value', 'score']
});