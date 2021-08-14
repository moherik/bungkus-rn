export {default as currencyFormat} from './currencyFormat';
export {storeLocalData, getLocalData, LOGIN_TOKEN} from './asyncStorage';

export const getInitialOfString = (value: string) => {
  const parts = value.split(' ');
  let initials = '';
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length > 0 && parts[i] !== '') {
      initials += parts[i][0];
    }
  }
  return initials;
};
