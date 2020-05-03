
function getSetSrv($resource) {
    return $resource('api/SetsNg/GetSet/:id', { id: '@id' }
    );
}

function getAlbums($resource) {
    return $resource('api/albums/GetAlbums');
}

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
    return $resource('api/Collections/GetCollection/:start/:length', { start: '@start', length: '@length' }
    );
}

function getImage($resource) {
    return $resource('api/Sets/GetImage/:id', { filename: '@id' }
    );
}

function updateImage($resource) {
    return $resource('api/SetsNg/Edit/:id', { id: '@id' }
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

function updateAlbumSrv($resource) {
    return $resource('api/albums/updateAlbum/:id', { id: '@id' }
        , {
            'update': { method: 'PUT' }
        }
    );
}

function getUser($resource) {
    return $resource('api/Account/getUser/:username', { username: '@username' }
    );
}

function loginUser($resource) {
    return $resource('api/Account/login/:username/:password', { username: '@username', password: '@password' }   
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
    .service('updateImage', updateImage)
    .service('passData', passData)
    .service('getUser', getUser)
    .service('getCollectionSrv', getCollectionSrv)
    .service('getCollectionsSrv', getCollectionsSrv)
    .service('updateUserItem', updateUserItem)
    .service('getSetSrv', getSetSrv)
    .service('getLookups', getLookups)
    .service('loginUser', loginUser)
    .service('getAlbums', getAlbums)
    .service('updateAlbumSrv', updateAlbumSrv)
    .service('getItemSrvNg', getItemSrvNg)
    .service('getSetsSrvNg', getSetsSrvNg);


