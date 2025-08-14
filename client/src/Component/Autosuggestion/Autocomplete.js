import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Autocomplete = () => {
  const products = useSelector(state => state.siteData.siteData.products);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([])

  const handleChange = (event) => {
    const inputValue = event.target.value;
    onSearchChange(event.target.value);
    setInputValue(inputValue);

  };

  const handleSelect = (product) => {
    setInputValue('');
    console.log(product.productId);
    onSearchChange('');
    navigate('/product-details/'+product.productId);
  };

    const onSearchChange = (searchTerm) => {

        console.log("typeing ...|" + searchTerm + "|||");

        if (searchTerm === "") {
            console.log("suggestion blank");
            setFilteredProducts([]);

        } else {
            const suggestedProducts = products.filter(product => product.productName.toLowerCase().includes(searchTerm.toLowerCase()));
            console.log('suggestedProducts', suggestedProducts);
            setFilteredProducts(suggestedProducts);

        }
    };

  useEffect(() => {

    console.log("autocoplete component filtered products",filteredProducts);

  }, [filteredProducts])



  return (
    <div className="autocomplete-container">
      <input
        className="autocomplete-input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type to search..."
      />
      <ul className="autocomplete-suggestions">
        {filteredProducts.map((product, index) => (
          <li key={index} className="autocomplete-suggestion" onClick={() => handleSelect(product)}>
            <img style={{width:'50px', height:'50px'}} src={product.imgSrc} className="card-img-top" alt="..." /> {product.productName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;