export default {
  onUpdate: (registration: ServiceWorkerRegistration) => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    console.info('New version available. Reload');
    registration.unregister().then(() => {
      window.location.replace(process.env.PUBLIC_URL);
    });
  },
  onSuccess: (registration: ServiceWorkerRegistration) => {
    console.info('service worker on success state');
    console.log(registration);
  },
};
