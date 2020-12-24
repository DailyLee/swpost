console.log('mihoyoCloudFunc running');
self.mihoyoCloudFunc = function () {
    return new Promise(((resolve) => {
        setTimeout(() => {
            resolve('result from mihoyoCloundFunc');
        }, 1000);
    }));
};
