const currentBasename = process.env.REACT_APP_BASENAME || '/clinic';
export const isClinic = currentBasename === '/clinic';
export const localstoragePrefix = (process.env.REACT_APP_BASENAME || '').replace(/^\//, '');
