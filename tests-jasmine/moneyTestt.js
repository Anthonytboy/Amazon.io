import { formatCurrency } from '../Scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
  it('Converts cents into dollar', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('Works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

    it('rounds up or not', () => {
      expect(formatCurrency(2000.4)).toEqual('20.00');
    });
  
});
