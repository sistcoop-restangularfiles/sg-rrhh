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
            }
        };

        RrhhRestangular.extendModel(url, function(obj) {
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

})();