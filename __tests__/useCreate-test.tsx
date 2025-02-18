import { renderHook, act } from '@testing-library/react-hooks';
import useCreate from '@/hooks/products/useCreate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
}));

jest.mock('expo-image-picker');
jest.mock('axios');

it('should initialize with default values for all fields', () => {
  const { result } = renderHook(() => useCreate({ codeScanned: '' }));
  
  expect(result.current.name).toBe('');
  expect(result.current.type).toBe('');
  expect(result.current.barcode).toBe('');
  expect(result.current.price).toBeDefined();
  expect(result.current.solde).toBe('');
  expect(result.current.supplier).toBeDefined();
  expect(result.current.image).toBe('');
  expect(result.current.stockName).toBe('');
  expect(result.current.quantity).toBe('');
  expect(result.current.city).toBe('');
  expect(result.current.errors).toEqual({});
});

it('should set errors if any fields are invalid', () => {
  const { result } = renderHook(() => useCreate({ codeScanned: '' }));
  
  act(() => result.current.handleSubmit());
  
  expect(result.current.errors).not.toEqual({});
  expect(result.current.errors.name).toBeDefined();
  expect(result.current.errors.price).toBeDefined();
  expect(result.current.errors.supplier).toBeDefined();
});

// it('should submit form successfully with all fields', async () => {
//   const axiosPostMock = jest.spyOn(axios, 'post').mockResolvedValue({ data: {} });
//   const { result } = renderHook(() => useCreate({ codeScanned: '' }));

//   await act(async () => {
//     result.current.setName('Product');
//     result.current.setType('Type1');
//     result.current.setBarcode('123456789');
//     result.current.setPrice('100');
//     result.current.setSolde('50');
//     result.current.setSupplier('Supplier A');
//     result.current.setImage('file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FMOHAMMED_ELGHANAM_WAREHOUSE-d21b6292-2fe6-4e62-9e95-487e5263199d/ImagePicker/850c4f27-55b1-4c29-b872-1323626dd4dd.jpeg');
//     result.current.setStockName('Stock A');
//     result.current.setQuantity('10');
//     result.current.setCity('Marrakesh');
//     result.current.handleSubmit();
//     console.log('Form submitted');
//   });

//   await waitFor(() => {
//     expect(axiosPostMock).toHaveBeenCalled(); 
//   });
// }, 10000);