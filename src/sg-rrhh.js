'use strict';

(function(){

    var module = angular.module('sg-rrhh', ['restangular']);


    module.provider('sgRrhh', function() {

        this.restUrl = 'http://localhost';

        this.$get = function() {
            var restUrl = this.restUrl;
            return {
                getRestUrl: function() {
                    return restUrl;
                }
            }
        };

        this.setRestUrl = function(restUrl) {
            this.restUrl = restUrl;
        };
    });


    module.factory('RrhhRestangular', ['Restangular', 'sgRrhh', function(Restangular, sgRrhh) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(sgRrhh.getRestUrl());
        });
    }]);


    module.factory('SGSucursal', ['RrhhRestangular',  function(RrhhRestangular) {

        var url = 'sucursales';
        var urlAbreviatura = url + '/abreviatura';
        var urlDenominacion = url + '/denominacion';
        var urlCount = url + '/count';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined}, modelMethos, {$save: function(){
                    return RrhhRestangular.all(url).post(this);
                }});
            },
            $save: function() {
                return RrhhRestangular.one(url, this.id).customPUT(RrhhRestangular.copy(this),'',{},{});
            },

            $find: function(id){
                return RrhhRestangular.one(url, id).get();
            },
            $search: function(queryParams){
                return RrhhRestangular.all(url).getList(queryParams);
            },

            $findByAbreviatura: function(abreviatura){
                return RrhhRestangular.one(urlAbreviatura, abreviatura).get();
            },
            $findByDenominacion: function(denominacion){
                return RrhhRestangular.one(urlDenominacion, denominacion).get();
            },

            $count: function(){
                return RrhhRestangular.one(urlCount).get();
            },

            $disable: function(){
                return RrhhRestangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return RrhhRestangular.one(url, id).remove();
            },

            $addAgencia: function(obj){
                return RrhhRestangular.all(url + '/' + this.id + '/agencias').post(obj);
            },
            $getAgencias: function(queryParams){
                return RrhhRestangular.all(url+'/'+this.id+'/agencias').getList(queryParams);
            }
        };

        RrhhRestangular.extendModel(url, function(obj) {
            if(angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({id: obj}, modelMethos)
            }
        });
        RrhhRestangular.extendModel(urlAbreviatura, function(obj) {
            if(angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({id: obj}, modelMethos)
            }
        });
        RrhhRestangular.extendModel(urlDenominacion, function(obj) {
            if(angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({id: obj}, modelMethos)
            }
        });

        return modelMethos;

    }]);

    module.factory('SGAgencia', ['RrhhRestangular',  function(RrhhRestangular) {

        var url = 'agencias';
        var urlCodigo = url + '/codigo';
        var urlCount = url + '/count';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined}, modelMethos, {$save: function(){
                    return RrhhRestangular.all(url).post(this);
                }});
            },
            $save: function() {
                return RrhhRestangular.one(url, this.id).customPUT(RrhhRestangular.copy(this),'',{},{});
            },

            $find: function(id){
                return RrhhRestangular.one(url, id).get();
            },
            $search: function(queryParams){
                return RrhhRestangular.all(url).getList(queryParams);
            },

            $findByCodigo: function(codigo){
                return RrhhRestangular.one(urlCodigo, codigo).get();
            },

            $count: function(){
                return RrhhRestangular.one(urlCount).get();
            },

            $disable: function(){
                return RrhhRestangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return RrhhRestangular.one(url, id).remove();
            },

            $addTrabajador: function(obj){
                return RrhhRestangular.all(url + '/' + this.id + '/trabajadores').post(obj);
            },
            $getTrabajadores: function(queryParams){
                return RrhhRestangular.all(url+'/'+this.id+'/trabajadores').getList(queryParams);
            }
        };

        RrhhRestangular.extendModel(url, function(obj) {
            if(angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({id: obj}, modelMethos)
            }
        });
        RrhhRestangular.extendModel(urlCodigo, function(obj) {
            if(angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({id: obj}, modelMethos)
            }
        });

        return modelMethos;

    }]);

    module.factory('SGTrabajador', ['RrhhRestangular',  function(RrhhRestangular) {

        var url = 'trabajadores';
        var urlCount = url + '/count';
        var urlBuscar = url + '/buscar';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined}, modelMethos, {$save: function(){
                    return RrhhRestangular.all(url).post(this);
                }});
            },
            $save: function() {
                return RrhhRestangular.one(url, this.id).customPUT(RrhhRestangular.copy(this),'',{},{});
            },

            $find: function(id){
                return RrhhRestangular.one(url, id).get();
            },
            $search: function(queryParams){
                return RrhhRestangular.all(url).getList(queryParams);
            },


            $count: function(){
                return RrhhRestangular.one(urlCount).get();
            },

            $disable: function(){
                return RrhhRestangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return RrhhRestangular.one(url, id).remove();
            },

            $findByTipoNumeroDocumento: function(tipoDocumento, numeroDocumento){
                var params = {
                    tipoDocumento: tipoDocumento,
                    numeroDocumento: numeroDocumento
                };
                return RrhhRestangular.one(urlBuscar).get(params);
            }
        };

        RrhhRestangular.extendModel(url, function(obj) {
            if(angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({id: obj}, modelMethos)
            }
        });
        RrhhRestangular.extendModel(urlBuscar, function(obj) {
            if(angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({id: obj}, modelMethos)
            }
        });

        return modelMethos;

    }]);

})();