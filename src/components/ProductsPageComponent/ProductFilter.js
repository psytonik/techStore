import React from 'react';
import styled from 'styled-components';
import {ProductConsumer} from "../../context";

const ProductFilter = () => {
    return (
        <ProductConsumer>
            {value =>{
                const {search,price,company,minPrice,maxPrice,shipping,handleChange,storeProducts} = value;
                let companies = new Set();
                companies.add('all');
                for(let product in storeProducts){
                    companies.add(storeProducts[product]["company"])
                }
                companies = [...companies];
                return(
                    <div className="row my-5">
                        <div className="col-10 mx-auto">
                            <FilterWrapper>
                                <div>
                                    <label htmlFor="search">
                                        search products
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={search}
                                        type="text"
                                        name="search"
                                        id="search"
                                        className="filter-item"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="company">Company</label>
                                    <select name="company" id="company" className="filter-item" onChange={handleChange} value={company}>
                                        {companies.map((company,i) => {
                                            return(
                                                <option key={i} value={company}>{company}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="price">
                                        <p className="mb-2">product price: <span>${price}</span></p>
                                    </label>
                                    <input
                                        type="range"
                                        name="price"
                                        min={minPrice}
                                        max={maxPrice}
                                        value={price}
                                        onChange={handleChange}
                                        className="filter-price-slider"
                                        id="price" />
                                </div>
                                <div>
                                    <label htmlFor="shipping" className="mx-2">
                                        free shipping
                                    </label>
                                    <input
                                        name="shipping"
                                        type="checkbox"
                                        onChange={handleChange}
                                        checked={shipping && true}
                                        id="shipping"
                                        className="shipping-checkbox"
                                    />
                                </div>
                            </FilterWrapper>
                        </div>
                    </div>
                )
            }}
        </ProductConsumer>
    );
};
const FilterWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
    grid-column-gap: 2rem;
    grid-row-gap: 1rem;
    label {
      font-weight: bold;
      text-transform: capitalize;
    }
  .filter-item, 
  .filter-price-slider {
    display: block;
    width: 100%;
    background: transparent;
    border-radius: 0.5rem;
    border: 2px solid var(--darkGrey);
  }
`;
export default ProductFilter;
