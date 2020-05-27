﻿
function getSetSrv($resource) {
    return $resource('api/SetsNg/GetSet/:id', { id: '@id' }
    );
}

function getAlbumCollections($resource) {
    return $resource('api/albums/GetAlbumCollections');
}

//function getAlbumCollections($resource) {
//    return {
//        jokes: function (token) {
//            return $resource('api/albums/GetAlbumCollections', null, {
//                query: {
//                    method: 'GET',
//                    headers: {
//                        'Authorization': 'Bearer ' + token
//                    }
//                }
//            });
//        }
//    }
//}

function getSetsSrvNg($resource) {
    return $resource('api/SetsNg/GetSets/:start/:length/:sortby/:filterbyYear/:filterbyRanges/:filterbySetTypes/:groupby/:albumId',
        { start: '@start', length: '@length', sortby: '@sortby', filterbyYear: '@filterbyYear', filterbyRanges: '@filterbyRanges', filterbySetTypes: '@filterbySetTypes', groupby: '@groupby', albumId: '@albumId' }
        , {
            'update': { method: 'PUT' }
        }
    );
}

function getLookups($resource) {
    return $resource('api/SetsNg/GetLookups'
    );
}

function getItemSrvNg($resource) {
    return $resource('api/SetsNg/GetUserItem/:id', { id: '@id' }
    );
}

function getCollectionSrv($resource) {
    return $resource('api/Collections/GetCollection/:id', { id: '@id' }
    );
}

function getCollectionsSrv($resource) {
    return $resource('api/Collections/GetCollections', null,
        {
            'get': { method: 'GET' }
        }
    );
}

function getImage($resource) {
    return $resource('api/Sets/GetImage/:id', { filename: '@id' }
    );
}

function updateSet($resource) {
    return $resource('api/SetsNg/updateSet/:id', { id: '@id' }
        , {
            'update': { method: 'PUT' }
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

function updateAlbumCollectionSrv($resource) {
    return $resource('api/albums/updateAlbumCollection/:id', { id: '@id' }
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

function logoutUser($resource) {
    return $resource('api/Account/logout'
    );
}

function registerUser($resource) {
    return $resource('api/Account/register/:username/:email/:password', { username: '@username',email:'@email', password: '@password' }
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
    .service('getImage', getImage)
    .service('updateSet', updateSet)
    .service('passData', passData)
    .service('getUser', getUser)
    .service('getCollectionSrv', getCollectionSrv)
    .service('getCollectionsSrv', getCollectionsSrv)
    .service('getAlbumCollections', getAlbumCollections)
    .service('updateUserItem', updateUserItem)
    .service('getSetSrv', getSetSrv)
    .service('getLookups', getLookups)
    .service('loginUser', loginUser)
    .service('logoutUser', logoutUser)
    .service('registerUser', registerUser)
    .service('updateAlbumCollectionSrv', updateAlbumCollectionSrv)
    .service('getItemSrvNg', getItemSrvNg)
    .service('getSetsSrvNg', getSetsSrvNg);


