;(function () {
    const ID = setImmediate(() => {
        console.log('call async');

        clearImmediate(ID);
    });
})();
