import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'
import es from 'vuetify/es5/locale/es'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      // light: {
      //   primary: '#1976D2',
      //   secondary: '#424242',
      //   accent: '#82B1FF',
      //   error: '#FF5252',
      //   info: '#2196F3',
      //   success: '#4CAF50',
      //   warning: '#FFC107',
      // },
      dark: {
        primary: colors.indigo.lighten1,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
        // primary: colors.purple.lighten4,
        // secondary: colors.grey.darken1,
        // accent: colors.shades.black,
        // error: colors.red.accent3,
      }
    }
  },
  lang: {
    locales: {es},
    current: 'es',
  }
});
