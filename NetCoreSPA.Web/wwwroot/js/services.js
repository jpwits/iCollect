function getOrdersSrv($resource) {
    return $resource('api/Orders/GetOrders/:id', { id: '@id' }
    );
}

function getProductsSrv($resource) {
    return $resource('api/Products/GetProducts/:id', { id: '@id' }
    );
}

function getCustomersSrv($resource) {
    return $resource('api/Customers/GetCustomers/:id', { id: '@id' }
    );
}

function getSetSrv($resource) {
    return $resource('api/Sets/GetSet/:id', { id: '@id' }
    );
}

function getSetsSrv($resource) {
    return $resource('api/Sets/GetSets/:start/:length', { start: '@start', length:'@length' }
    );
}
        
function getImage($resource) {
    return $resource('api/Sets/GetImage/:id', { filename: '@id' }
    );
}

function updateImage($resource) {
    return $resource('api/Sets/Edit/:id', {id: '@id' }
        ,{
        'update': { method: 'PUT' }
        }
    );
}

function delImage($resource) {
    return $resource('api/Sets/Delete/:id', { filename: '@id' }
        , {
            'update': { method: 'POST' }
        }
    );
}

angular
    .module('inspinia')
    .service('getProductsSrv', getProductsSrv)
    .service('getOrdersSrv', getOrdersSrv)
    .service('getCustomersSrv', getCustomersSrv)
    .service('getSetSrv', getSetSrv)
    .service('getImage', getImage)
    .service('delImage', delImage)
    .service('updateImage', updateImage)
    .service('getSetsSrv', getSetsSrv);
