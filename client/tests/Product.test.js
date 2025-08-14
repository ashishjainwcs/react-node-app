import React from 'react';
import { render, screen } from '@testing-library/react';
import Product from '../src/components/Product'; // adjust path as needed
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock subcomponents
jest.mock('../src/order/AddToCart', () => () => <div>AddToCart Button</div>);
jest.mock('../src/order/BuyNow', () => () => <div>BuyNow Button</div>);

// Mock useSelector
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

// Mock product selector
const mockProduct = {
  productId: '123',
  imgSrc: 'test-image.jpg',
  productName: 'Test Product',
  productPrice: '$99',
  categoryCode: 'TEST',
};

describe('Product Component', () => {
  beforeEach(() => {
    useSelector.mockImplementation(() => ({
      siteData: {
        loggedInUserType: 'customer',
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders product details', () => {
    render(
      <Router>
        <Product productProp={mockProduct} indexProp={0} />
      </Router>
    );

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Price\s*: \$99/i)).toBeInTheDocument();
    expect(screen.getByText(/Category\s*:TEST/i)).toBeInTheDocument();
  });

  test('renders BuyNow and AddToCart buttons when user is logged in', () => {
    render(
      <Router>
        <Product productProp={mockProduct} indexProp={0} />
      </Router>
    );

    expect(screen.getByText(/BuyNow Button/i)).toBeInTheDocument();
    expect(screen.getByText(/AddToCart Button/i)).toBeInTheDocument();
  });

  test('does not render buttons when user is not logged in', () => {
    useSelector.mockImplementation(() => ({
      siteData: {
        loggedInUserType: '', // empty = not logged in
      },
    }));

    render(
      <Router>
        <Product productProp={mockProduct} indexProp={0} />
      </Router>
    );

    expect(screen.queryByText(/BuyNow Button/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/AddToCart Button/i)).not.toBeInTheDocument();
  });
});