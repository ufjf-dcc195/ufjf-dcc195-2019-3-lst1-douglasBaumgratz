function route (pathname, handlers, request, response){
    console.log("Rounting: "+pathname);
    if(typeof handlers[pathname] == 'function'){
        handlers[pathname](request, response);
    } else {
        console.log("Não há handler para "+pathname);
    }
}

exports.route = route;
