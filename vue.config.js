// const { defineConfig } = require('@vue/cli-service');
// const path = require('path');
// const webpack = require('webpack');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const PuppeteerRenderer = PrerenderSPAPlugin.PuppeteerRenderer;

// module.exports = defineConfig({
//   transpileDependencies: [],

//   configureWebpack: config => {
//     // общий прогресс сборки
//     config.plugins.push(
//       new webpack.ProgressPlugin((percent, message) => {
//         const pct = Math.round(percent * 100);
//         process.stdout.clearLine();
//         process.stdout.cursorTo(0);
//         process.stdout.write(`🚧 Build ${pct}% — ${message}`);
//       })
//     );

//     if (process.env.NODE_ENV === 'production') {
//       const articleRoutes = Array.from({ length: 24 }, (_, i) => `/article/${i + 1}`);

//       config.plugins.push(
//         new PrerenderSPAPlugin({
//           staticDir: path.join(__dirname, 'dist'),
//           routes: [
//             '/', '/services', '/lawyers', '/contacts',
//             ...articleRoutes
//           ],
//           // после каждого рендера выводим лог и отбрасываем неудачные маршруты
//           postProcess: renderedRoute => {
//             if (renderedRoute.errors && renderedRoute.errors.length) {
//               console.warn(`⚠️ Skipping failed route ${renderedRoute.route}:`, renderedRoute.errors);
//               return null;  // убираем из финального списка, чтобы не падал билд
//             }
//             console.error(`✅ Prerendered: ${renderedRoute.route}`);
//             return renderedRoute;
//           },
//           renderer: new PuppeteerRenderer({
//             headless: true,
//             renderAfterDocumentEvent: 'render-event',
//             renderAfterTime:        500,   
//             skipThirdPartyRequests: true,   // не грузим внешние ресурсы
//             maxConcurrentRoutes:    8,      // 8 страниц одновременно
//             navigationOptions:      { timeout: 2000 }
//           })
//         })
//       );
//     }
//   }
// });
