const currentBasename = process.env.REACT_APP_BASENAME || '/study';
export const isClinic = currentBasename === '/clinic';
export const localstoragePrefix = (process.env.REACT_APP_BASENAME || '').replace(/^\//, '');
