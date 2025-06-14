<<<<<<< HEAD
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');


const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};


module.exports = mergeConfig(getDefaultConfig(__dirname), config);



=======
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
>>>>>>> b6a3167d22ddf2d3419ddae27a5d9080a7138809
