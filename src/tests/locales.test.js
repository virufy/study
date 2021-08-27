import enJson from '../locales/en.json';
import frJson from '../locales/fr.json';

let errorLine = 0;
const objectsWithSameKeys = (array1, array2) => {
  const keys1 = Object.keys(array1);
  const keys2 = Object.keys(array2);

  if (keys1.length !== keys2.length) {
    console.log('Key Missing in object:', errorLine);
    return false
  }

  errorLine += 1;
  const result = keys1.every((key1) => {
    errorLine += 1;

    // Key missing
    if (array2[key1] === undefined) {
      console.log('Key Missing:', key1, ' line: ', errorLine - 1);
      return false;
    }

    const isArrayValue1 = typeof array1[key1] === 'object';
    const isArrayValue2 = typeof array2[key1] === 'object';

    if (!isArrayValue1 && isArrayValue2) return false;
    if (isArrayValue1 && !isArrayValue2) return false;
    if (isArrayValue1 && isArrayValue2) {
      return objectsWithSameKeys(array1[key1], array2[key1], errorLine);
    }

    return true;
  });

  return result;
}

describe("Translation tests", () => {
  test('The should have same keys', () => {
    const result = objectsWithSameKeys(enJson, frJson)
    // assert
    expect(result).toBe(true);
  });
 })