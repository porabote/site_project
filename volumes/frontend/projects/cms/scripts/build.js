"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = require("webpack");
var webpack_config_1 = require("../webpack.config");
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.on('unhandledRejection', function (err) {
    throw err;
});
function build() {
    var config = (0, webpack_config_1.default)({ mode: "production" });
    var compiler = (0, webpack_1.default)(config);
    console.log('Compile starting...');
    return new Promise(function (resolve, reject) {
        compiler.run(function (err) {
            console.log(err);
            // console.log(stats.toString({
            //     chunks: false,  // Makes the build much quieter
            //     colors: true    // Shows colors in the console
            // }));
            // if (entries !== undefined && entries.hasErrors()) {
            //
            //   console.log(entries.toString());
            //
            //   return reject(entries.compilation.errors)
            // }
            // if (err) {
            //   return reject(err)
            // }
            ['SIGINT', 'SIGTERM'].forEach(function (sig) {
                process.on(sig, function () {
                    //  devServer.close();
                    process.exit();
                });
            });
            // compiler.close((closeErr) => {
            //     if(closeErr) {
            //         reject(closeErr)
            //     }
            // });
        });
        return resolve('ok');
    });
}
var buildPromise = build();
buildPromise.then(function (res) {
    console.log('Compiling successfull!');
});
buildPromise.then(null, function (err) {
    console.log('Compiling error');
});
