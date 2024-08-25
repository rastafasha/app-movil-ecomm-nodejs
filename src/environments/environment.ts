// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  //local
  baseUrl: 'http://localhost:3000/api',
  mediaUrl: 'http://localhost:3000/api/uploads/',
  soketServer : 'http://localhost:3000',
  //remoto
  // baseUrl: 'https://backend-mean-eccm-main.vercel.app/api',
  // mediaUrl: 'https://backend-mean-eccm-main.vercel.app/api/uploads/',
  // soketServer : 'https://backend-mean-eccm-main.vercel.app/',
  //plugins
  rapidapiKey: 'a7036a3222mshc2920e679cd1cafp141e56jsn81cbe707ac15',
  rapidapiHost: 'apidojo-17track-v1.p.rapidapi.com',
  notificacionApiPublickey:'BOD_CraUESbh9BhUEccgqin8vbZSKHAziTtpqvUFl8B8LO9zrMnfbectiViqWIsTLglTqEx3c0XsmqQQ5A-KALg',
  //https://paypal.developer.com
  clientIdPaypal: 'AXlazeNsZ0CmjfJIronSzcqzw4hLHkcoVEM5fO5BY7AbD-_GhKoKezRcavq6-T4kQuRqaTXFB_VXmheG',
  sandboxPaypal: 'AQhKPBY5mgg0JustLJCcf6ncmd9RghCiNhXT_b6rNUakyQtnEn8MzCn_dkHAyt5n7_P0Omo5M05to5j0',
  //https://console.cloud.google.com/apis/
  client_idGoogle: '291137676127-svvuuca518djs47q2v78se9q6iggi4nq.apps.googleusercontent.com',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
