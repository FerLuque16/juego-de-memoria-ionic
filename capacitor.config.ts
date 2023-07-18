import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'memoria.app',
  appName: 'juego-memoria-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins:{
    SplashScreen:{
      launchShowDuration: 1000
    }
  }
};

export default config;
