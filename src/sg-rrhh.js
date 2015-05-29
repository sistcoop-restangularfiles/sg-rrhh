'use strict';

(function () {

    var module = angular.module('sg-rrhh', ['restangular']);


    module.provider('sgRrhh', function () {

        this.restUrl = 'http://localhost';

        this.$get = function () {
            var restUrl = this.restUrl;
            return {
                getRestUrl: function () {
                    return restUrl;
                }
            }
        };

        this.setRestUrl = function (restUrl) {
            this.restUrl = restUrl;
        };
    });


    module.factory('RrhhRestangular', ['Restangular', 'sgRrhh', function (Restangular, sgRrhh) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(sgRrhh.getRestUrl());
        });
    }]);


    module.factory('SGSucursal', ['RrhhRestangular', function (RrhhRestangular) {

        var url = 'sucursales';

        var modelMethos = {

            $new: function (id) {
                return angular.extend({denominacion: id}, modelMethos);
            },
            $build: function () {
                return angular.extend({denominacion: undefined}, modelMethos, {
                    $save: function () {
                        return RrhhRestangular.all(url).post(this);
                    }
                });
            },
            $save: function (obj) {
                if(angular.isUndefined(obj))
                    return RrhhRestangular.one(url, this.denominacion).customPUT(RrhhRestangular.copy(this), '', {}, {});
                else
                    return RrhhRestangular.one(url, this.denominacion).customPUT(RrhhRestangular.copy(obj), '', {}, {});
            },

            $find: function (id) {
                return RrhhRestangular.one(url, id).get();
            },
            $findById: function (id) {
                return RrhhRestangular.all(url).one('id', id).get();
            },
            $search: function (queryParams) {
                return RrhhRestangular.all(url).getList(queryParams);
            },

            $remove: function (id) {
                if(angular.isUndefined(id))
                    return RrhhRestangular.one(url, this.denominacion).remove();
                else
                    return RrhhRestangular.one(url, id).remove();
            },

            $findAgencia: function (id) {
                return RrhhRestangular.one(url, this.denominacion).one('agencias', id).get();
            },
            $getAgencias: function (queryParams) {
                return RrhhRestangular.one(url, this.denominacion).all('agencias').getList(queryParams);
            },
            $addAgencia: function (obj) {
                return RrhhRestangular.one(url, this.denominacion).all('agencias').post(obj);
            },
            $updateAgencia: function (id, obj) {
                return RrhhRestangular.one(url, this.denominacion).one('agencias', id).customPUT(RrhhRestangular.copy(obj), '', {}, {});
            },
            $removeAgencia: function (id) {
                return RrhhRestangular.one(url, this.denominacion).one('agencias', id).remove();
            }

        };

        RrhhRestangular.extendModel(url, function (obj) {
            if (angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({denominacion: obj}, modelMethos)
            }
        });
        RrhhRestangular.extendCollection(url, function (collection) {
            angular.forEach(collection, function (row) {
                angular.extend(row, modelMethos);
            });
            return collection;
        });

        return modelMethos;

    }]);

    module.factory('SGAgencia', ['RrhhRestangular', function (RrhhRestangular) {

        var url = 'agencias';

        var modelMethos = {

            $new: function (id) {
                return angular.extend({denominacion: id}, modelMethos);
            },
            $build: function () {
                return angular.extend({denominacion: undefined}, modelMethos, {
                    $save: function (sucursal) {
                        return RrhhRestangular.one('sucursales', sucursal).all(url).post(this);
                    }
                });
            },
            $save: function (sucursal, obj) {
                if(angular.isUndefined(obj))
                    return RrhhRestangular.one('sucursales', sucursal).one(url, this.denominacion).customPUT(RrhhRestangular.copy(this), '', {}, {});
                else
                    return RrhhRestangular.one('sucursales', sucursal).one(url, this.denominacion).customPUT(RrhhRestangular.copy(obj), '', {}, {});
            },


            $find: function (sucursal, id) {
                return RrhhRestangular.one('sucursales', sucursal).one(url, id).get();
            },
            $search: function (sucursal, queryParams) {
                return RrhhRestangular.one('sucursales', sucursal).all(url).getList(queryParams);
            },


            $remove: function (sucursal, id) {
                if(angular.isUndefined(id))
                    return RrhhRestangular.one('sucursales', sucursal).one(url, this.denominacion).remove();
                else
                    return RrhhRestangular.one('sucursales', sucursal).one(url, id).remove();
            },


            $addTrabajador: function (sucursal, agencia, obj) {
                return RrhhRestangular.one('sucursales', sucursal).one(url, agencia).all('trabajadores').post(obj);
            },
            $getTrabajadores: function (queryParams) {
                return RrhhRestangular.one('sucursales', sucursal).all(url + '/' + this.id + '/trabajadores').getList(queryParams);
            }

        };

        RrhhRestangular.extendModel(url, function (obj) {
            if (angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({id: obj}, modelMethos)
            }
        });

        return modelMethos;

    }]);

    module.factory('SGTrabajador', ['RrhhRestangular', function (RrhhRestangular) {

        var url = 'trabajadores';
        var urlBuscar = url + '/buscar';

        var modelMethos = {
            $new: function (id) {
                return angular.extend({id: id}, modelMethos);
            },
            $build: function () {
                return angular.extend({id: undefined}, modelMethos, {
                    $save: function () {
                        return RrhhRestangular.all(url).post(this);
                    }
                });
            },
            $save: function (obj) {
                if(angular.isUndefined(obj))
                    return RrhhRestangular.one(url, this.id).customPUT(RrhhRestangular.copy(this), '', {}, {});
                else
                    return RrhhRestangular.one(url, this.id).customPUT(RrhhRestangular.copy(obj), '', {}, {});
            },

            $find: function (id) {
                return RrhhRestangular.one(url, id).get();
            },
            $search: function (queryParams) {
                return RrhhRestangular.all(url).getList(queryParams);
            },

            $remove: function (id) {
                if(angular.isUndefined(id))
                    return RrhhRestangular.one(url, id).remove();
                else
                    return RrhhRestangular.one(url, this.id).remove();
            },

            $findByTipoNumeroDocumento: function (tipoDocumento, numeroDocumento) {
                var params = {
                    tipoDocumento: tipoDocumento,
                    numeroDocumento: numeroDocumento
                };
                return RrhhRestangular.one(urlBuscar).get(params);
            },

            $addTrabajadorUsuario: function (obj) {
                return RrhhRestangular.all(url + '/' + this.id + '/trabajadorUsuarios').post(obj);
            },
            $getTrabajadorUsuario: function () {
                return RrhhRestangular.one(url + '/' + this.id + '/trabajadorUsuarios').get();
            },

            $getAgencia: function () {
                return RrhhRestangular.one(url + '/' + this.id + '/agencia').get();
            }
        };

        RrhhRestangular.extendModel(url, function (obj) {
            if (angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({id: obj}, modelMethos)
            }
        });
        RrhhRestangular.extendModel(urlBuscar, function (obj) {
            if (angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({id: obj}, modelMethos)
            }
        });

        return modelMethos;

    }]);

    module.factory('SGTrabajadorUsuario', ['RrhhRestangular', function (RrhhRestangular) {

        var url = 'trabajadorUsuarios';

        var modelMethos = {
            $new: function (id) {
                return angular.extend({id: id}, modelMethos);
            },
            $build: function () {
                return angular.extend({id: undefined}, modelMethos, {
                    $save: function () {
                        return RrhhRestangular.all(url).post(this);
                    }
                });
            },
            $save: function () {
                return RrhhRestangular.one(url, this.id).customPUT(RrhhRestangular.copy(this), '', {}, {});
            },

            $find: function (id) {
                return RrhhRestangular.one(url, id).get();
            },
            $search: function (queryParams) {
                return RrhhRestangular.all(url).getList(queryParams);
            },

            $disable: function () {
                return RrhhRestangular.all(url + '/' + this.id + '/disable').post();
            },
            $remove: function (id) {
                return RrhhRestangular.one(url, id).remove();
            },

            $findByUsuario: function (usuario) {
                return RrhhRestangular.one(url + '/usuario/' + usuario).get();
            }
        };

        RrhhRestangular.extendModel(url, function (obj) {
            if (angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({id: obj}, modelMethos)
            }
        });

        return modelMethos;

    }]);

})();