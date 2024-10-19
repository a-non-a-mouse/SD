import translations from '../translations/translations.js';

const defaultSettings = {
  country: 'us' as keyof typeof translations,
  password: '',
};

const settings = {
  ...defaultSettings,
  ...JSON.parse(localStorage.getItem('settings') || '{}'),
};

const settingsProxy = new Proxy(
  {},
  {
    set(target, key, val) {
      settings[key] = val;

      saveSettings();
      return true;
    },

    get(target, key) {
      return settings[key];
    },
  }
);

function saveSettings() {
  const settingsJSON = JSON.stringify(settings);
  localStorage.setItem('settings', settingsJSON);
}

const proxiedObj = Object.create(settingsProxy, {}) as typeof defaultSettings;

export default proxiedObj;
