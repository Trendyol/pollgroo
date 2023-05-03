import { getHostUrl } from '@/helpers/getHostUrl';

describe('getHostUrl', () => {
  it('should return http URL for local host', () => {
    const host = 'localhost:3000';
    const expectedUrl = 'http://localhost:3000';

    const result = getHostUrl(host);

    expect(result).toEqual(expectedUrl);
  });

  it('should return https URL for non-local host', () => {
    const host = 'example.com';
    const expectedUrl = 'https://example.com';

    const result = getHostUrl(host);

    expect(result).toEqual(expectedUrl);
  });

  it('should return undefined for undefined host', () => {
    const host = undefined;
    const expectedUrl = "https://undefined";

    const result = getHostUrl(host);

    expect(result).toEqual(expectedUrl);
  });
});