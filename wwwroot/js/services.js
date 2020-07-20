

function getAlbumCatalogs($resource) {
    return {
        albumcatalogs: function (token) {
            return $resource('api/albums/GetAlbumCatalogs', null, {
                query: {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            });
        }
    }
}

function getSetsSrvNg($resource) {
    return {
        sets: function (token) {
            return $resource('api/SetsNg/GetSets/:start/:length/:sortby/:filterbyYear/:filterbyRanges/:filterbySetTypes/:groupby/:albumId',
                { start: '@start', length: '@length', sortby: '@sortby', filterbyYear: '@filterbyYear', filterbyRanges: '@filterbyRanges', filterbySetTypes: '@filterbySetTypes', groupby: '@groupby', albumId: '@albumId' }, {
                'update':
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            });

        },
        set: function (token) {
            return $resource('api/SetsNg/GetSet/:id', { id: '@id' }, {
                get: {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            });
        },
        lookups: function (token) { //this need to move to init service
            return $resource('api/SetsNg/GetLookups', null, {
                get: {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            });
        },
        coins: function (token) {
            return $resource('api/SetsNg/GetRangeCoins/:year/:type/:range', { year: '@year', type: '@type', range: '@range' }, {
                get: {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            });
        },
        //userItem : function (token) {
        //    return $resource('api/SetsNg/GetUserItem/:id', { id: '@id' }, {
        //        get: {
        //            method: 'GET',
        //            headers: {
        //                'Authorization': 'Bearer ' + token
        //            }
        //        }
        //    });
        //},
    }
}

function updateSet($resource, $sessionStorage) {
    return $resource('api/SetsNg/updateSet/:id', { id: '@id' }
        , {
            'update': {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + $sessionStorage.User.token
                }
            }
        }
    );
}

function updateUserItem($resource) {
    return $resource('api/SetsNg/updateUserItem/:id', { id: '@id' }
        , {
            'update': { method: 'PUT' }
        }
    );
}

function getCatalogSrv($resource) {
    return $resource('api/Catalogs/GetCatalog/:id', { id: '@id' }
    );
}

function getCatalogsSrv($resource) {
    return $resource('api/Catalogs/GetCatalogs', null,
        {
            'get': { method: 'GET' }
        }
    );
}

function updateAlbumCatalogSrv($resource) {
    return $resource('api/albums/updateAlbumCatalog/:id', { id: '@id' }
        , {
            'update': { method: 'PUT' }
        }
    );
}

function getUser($resource) {
    return $resource('api/Account/getUser'
    );
}

function loginUser($resource) {
    return $resource('api/Account/login/:username/:password', { username: '@username', password: '@password' }
    );
}

function authUser($resource) {
    return $resource('api/User/authenticate'
        , {
            'update': { method: 'PUT' }
        }
    );
}

function logoutUser($resource) {
    return $resource('api/Account/logout'
    );
}

function registerUser($resource) {
    return $resource('api/Account/register/:username/:email/:password', { username: '@username', email: '@email', password: '@password' }
    );
}

function getRoles($resource) {
    return $resource('api/User/getroles/:username', { username: '@username' }
    );
}

function passData() {

    var persistObject = [];

    function set(objectName, data) {
        persistObject[objectName] = data;
    }
    function get(objectName) {
        return persistObject[objectName];
    }

    return {
        set: set,
        get: get
    };
}

angular
    .module('inspinia')
    .service('updateSet', updateSet)
    .service('passData', passData)
    .service('getUser', getUser)
    .service('getCatalogSrv', getCatalogSrv)
    .service('getCatalogsSrv', getCatalogsSrv)
    .service('getAlbumCatalogs', ['$resource', getAlbumCatalogs])
    .service('updateUserItem', updateUserItem)
    .service('authUser', authUser)
    .service('loginUser', loginUser)
    .service('logoutUser', logoutUser)
    .service('registerUser', registerUser)
    .service('getRoles', getRoles)
    .service('updateAlbumCatalogSrv', updateAlbumCatalogSrv)
    .service('getSetsSrvNg', ['$resource', getSetsSrvNg]);


