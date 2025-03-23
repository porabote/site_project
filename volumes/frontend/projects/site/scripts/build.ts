import Webpack from 'webpack';
import webpackConfig from "../webpack.config";

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
  throw err;
});

function build() {

  const config = webpackConfig({mode: "production"});
  const compiler = Webpack(config);

  console.log('Compile starting...');

  return new Promise((resolve, reject) => {

    compiler.run((err: Error | null | undefined ) => {
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

    })

    return resolve('ok');
  })

}


let buildPromise = build()

buildPromise.then(res => {
  console.log('Compiling successfull!');
})

buildPromise.then(null, err => {
  console.log('Compiling error');

})