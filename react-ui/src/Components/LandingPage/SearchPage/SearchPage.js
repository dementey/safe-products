import React from 'react';

import SearchForm from '../Home/SearchForm/SearchForm';
import ProductContainer from './ProductContainer';

import '../../css/Styles.css';

const SearchPage = () =>

    <div className='searchpage'>
        <SearchForm fire={false} />
        <br/>
        <ProductContainer/>
    </div>

export default SearchPage;
