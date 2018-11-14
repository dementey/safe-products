import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Product from './Product';
import Pagination from './Pagination';
import ScrollButton from './ScrollToTopButton';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CircularProgress from '@material-ui/core/CircularProgress';
import Subheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

import '../../css/Styles.css';


class ProductPres extends Component {


    render() {
        const { result, items, hasErrored, isLoading, totalCount } = this.props;//присваиваем одноименным переменным соотсветсвующие значения props синтаксис ES6

        const col = window.innerWidth < 600 ? 1 : 4;//Количество столбцов
        const nPerPage = window.innerWidth < 600 ? 15 : 50;//Количество элементов 

        if (hasErrored) {
            return (
                <div className='container'>
                    <Typography variant="display2">Ошибка загрузки!</Typography>
                </div>
            );
        };

        if (isLoading) {
            return (
                <div className='container'>
                    <CircularProgress className='loading' size={100} />
                </div>
            );
        };
     
        return (
            <div className='container' style={{ maxWidth: window.innerWidth }}>
                <GridList cols={col}>

                    <GridListTile
                        cols={col}
                        style={{ height: 'auto' }}>
                        <Subheader component='div'> Результат поиска "{result}":   {totalCount}</Subheader>
                    </GridListTile>

                    {
                        items.map(
                            v => (
                                <GridListTile
                                    key={v.url}
                                    style={{ height: 'auto', paddingTop: 5 }}>
                                    <Product itemInfo={v} />
                                </GridListTile>
                            )
                        )
                    }

                </GridList>

                <Pagination
                    pageNumber={this.props.pageNumber}
                    otalCount={Math.ceil(totalCount / nPerPage)} />

                <br />

                <ScrollButton
                    scrollStepInPx="80"
                    delayInMs="10" />

            </div>
        );
    }
}

ProductPres.propTypes = {// Props передаются из родительского компонента ProductContainer
    result: PropTypes.string,
    items: PropTypes.array,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    totalCount: PropTypes.number,
    //handleScroll: PropTypes.string,
}


export default ProductPres;



