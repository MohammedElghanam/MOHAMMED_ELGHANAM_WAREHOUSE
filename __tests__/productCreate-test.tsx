import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
// import productCreate from './productCreate'; // Adjust the import path as needed
import { useLocalSearchParams } from 'expo-router';
import useCreate from '@/hooks/products/useCreate'; // Adjust the import path as needed
import ProductCreate from '@/app/productCreate';

// Mock the useLocalSearchParams hook
jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
}));

// Mock the useCreate hook
jest.mock('@/hooks/products/useCreate', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('productCreate Component', () => {
  const mockUseCreate = {
    name: '',
    type: '',
    price: '',
    image: '',
    stockName: '',
    barcode: '',
    quantity: '',
    city: '',
    supplier: '',
    solde: '',
    setName: jest.fn(),
    setType: jest.fn(),
    setPrice: jest.fn(),
    setStockName: jest.fn(),
    setBarcode: jest.fn(),
    setQuantity: jest.fn(),
    setCity: jest.fn(),
    setSupplier: jest.fn(),
    setSolde: jest.fn(),
    handleSubmit: jest.fn(),
    pickImage: jest.fn(),
    warehouseOptions: [{ id: 1, name: 'Warehouse 1' }],
    errors: {},
  };

  beforeEach(() => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ codeScanned: '123456' });
    (useCreate as jest.Mock).mockReturnValue(mockUseCreate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all fields correctly', () => {
    const { getByPlaceholderText, getByText } = render(<ProductCreate />);

    // Check if all input fields are rendered
    expect(getByPlaceholderText('Product Name')).toBeTruthy();
    expect(getByPlaceholderText('Barcode')).toBeTruthy();
    expect(getByPlaceholderText('Price')).toBeTruthy();
    expect(getByPlaceholderText('Solde')).toBeTruthy();
    expect(getByPlaceholderText('Supplier')).toBeTruthy();
    expect(getByPlaceholderText('Stock Quantity')).toBeTruthy();

    // Check if pickers are rendered
    expect(getByText('Select Type')).toBeTruthy();
    expect(getByText('Select Warehouse')).toBeTruthy();
    expect(getByText('Select City')).toBeTruthy();

    // Check if the submit button is rendered
    expect(getByText('Create')).toBeTruthy();
  });

  it('updates input fields correctly', () => {
    const { getByPlaceholderText } = render(<ProductCreate />);

    const productNameInput = getByPlaceholderText('Product Name');
    const barcodeInput = getByPlaceholderText('Barcode');
    const priceInput = getByPlaceholderText('Price');
    const soldeInput = getByPlaceholderText('Solde');
    const supplierInput = getByPlaceholderText('Supplier');
    const quantityInput = getByPlaceholderText('Stock Quantity');

    // Simulate user input
    fireEvent.changeText(productNameInput, 'New Product');
    fireEvent.changeText(barcodeInput, '987654321');
    fireEvent.changeText(priceInput, '200');
    fireEvent.changeText(soldeInput, '100');
    fireEvent.changeText(supplierInput, 'Supplier B');
    fireEvent.changeText(quantityInput, '50');

    // Check if the corresponding state update functions were called
    expect(mockUseCreate.setName).toHaveBeenCalledWith('New Product');
    expect(mockUseCreate.setBarcode).toHaveBeenCalledWith('987654321');
    expect(mockUseCreate.setPrice).toHaveBeenCalledWith('200');
    expect(mockUseCreate.setSolde).toHaveBeenCalledWith('100');
    expect(mockUseCreate.setSupplier).toHaveBeenCalledWith('Supplier B');
    expect(mockUseCreate.setQuantity).toHaveBeenCalledWith('50');
  });

  it('handles picker selection correctly', () => {
    const { getByText } = render(<ProductCreate />);

    const typePicker = getByText('Select Type');
    const warehousePicker = getByText('Select Warehouse');
    const cityPicker = getByText('Select City');

    // Simulate selecting a value from the pickers
    fireEvent(typePicker, 'onValueChange', 'Informatique');
    fireEvent(warehousePicker, 'onValueChange', 'Warehouse 1');
    fireEvent(cityPicker, 'onValueChange', 'Marrakesh');

    // Check if the corresponding state update functions were called
    expect(mockUseCreate.setType).toHaveBeenCalledWith('Informatique');
    expect(mockUseCreate.setStockName).toHaveBeenCalledWith('Warehouse 1');
    expect(mockUseCreate.setCity).toHaveBeenCalledWith('Marrakesh');
  });

  it('displays validation errors correctly', () => {
    (useCreate as jest.Mock).mockReturnValue({
      ...mockUseCreate,
      errors: {
        name: 'Name is required',
        barcode: 'Barcode is required',
        price: 'Price is required',
        solde: 'Solde is required',
        supplier: 'Supplier is required',
        quantity: 'Quantity is required',
        type: 'Type is required',
        stockName: 'Warehouse is required',
        city: 'City is required',
        image: 'Image is required',
      },
    });

    const { getByText } = render(<ProductCreate />);

    // Check if all error messages are displayed
    expect(getByText('Name is required')).toBeTruthy();
    expect(getByText('Barcode is required')).toBeTruthy();
    expect(getByText('Price is required')).toBeTruthy();
    expect(getByText('Solde is required')).toBeTruthy();
    expect(getByText('Supplier is required')).toBeTruthy();
    expect(getByText('Quantity is required')).toBeTruthy();
    expect(getByText('Type is required')).toBeTruthy();
    expect(getByText('Warehouse is required')).toBeTruthy();
    expect(getByText('City is required')).toBeTruthy();
    expect(getByText('Image is required')).toBeTruthy();
  });

  it('calls handleSubmit when the submit button is pressed', () => {
    const { getByText } = render(<ProductCreate />);

    const submitButton = getByText('Create');
    fireEvent.press(submitButton);

    // Check if handleSubmit was called
    expect(mockUseCreate.handleSubmit).toHaveBeenCalled();
  });

  it('calls pickImage when the image picker button is pressed', () => {
    const { getByText } = render(<ProductCreate />);

    const pickImageButton = getByText('Pick an image from gallery');
    fireEvent.press(pickImageButton);

    // Check if pickImage was called
    expect(mockUseCreate.pickImage).toHaveBeenCalled();
  });
});