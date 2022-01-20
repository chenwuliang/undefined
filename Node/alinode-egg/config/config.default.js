/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    alinode: {
      server: 'wss://agentserver.node.aliyun.com:8080',
      appid: '88602',
      secret: '6d57a9623543df9acbee1a3b36d4eb5aa1573c8d',
      logdir: '/ttmp/',
      error_log: [
        '/root/.logs/error.#YYYY#-#MM#-#DD#.log',
      ],
      agentidMode: 'IP',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1642128624507_2685';

  // add your middleware config here
  config.middleware = [
    'alinode',
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
