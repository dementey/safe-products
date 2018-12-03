import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { query, getCount } from "../../../redux/actions/actions";

import ProductPres from './ProductPres';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import '../../css/Styles.css';

class ProductContainer extends Component {

    componentDidMount() {//componentDidMount()	после вставки компонента в DOM	здесь можно делать асинхронные запросы, подписывать компонент на внешние события
        const nPerPage = window.innerWidth < 600 ? 15 : 50;
        if (this.props.querySymbol !== '') {
            let url = "/api/search/" + this.props.querySymbol + '/' + this.props.pageNumber + '/' + nPerPage;
            // console.log(url);
            this.props.fetchData(url);
            let urlCount = "/api/" + this.props.querySymbol + '/count';
            this.props.fetchCount(urlCount);
        }
    }


    componentWillReceiveProps(nextProps) {//componentWillReceiveProps(newProps)	вызывается перед обновлением свойств, что происходит при перерисовке данного компонента его родителем
        if (this.props.querySymbol !== nextProps.querySymbol || this.props.pageNumber !== nextProps.pageNumber) {
            let nPerPage = window.innerWidth < 600 ? 15 : 50;
            let url = "/api/search/" + nextProps.querySymbol + '/' + nextProps.pageNumber + '/' + nPerPage;
            this.props.fetchData(url);
            let urlCount = "/api/" + nextProps.querySymbol + '/count';
            this.props.fetchCount(urlCount);
        }
    }

    render() {
        return (
            <div>
                <ProductPres
                    result={this.props.querySymbol}
                    items={this.props.items}
                    hasErrored={this.props.hasErrored}
                    isLoading={this.props.isLoading}
                    totalCount={this.props.count}

                //handleScroll={this.handleScroll}
                />

                <div className='inform-panel'>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar style={{
                            margin: 10,
                            backgroundColor: 'yellow',
                            width: 30,
                            height: 30
                        }}>?</Avatar>
                        <Typography variant='caption'>
                            Информация отсутствует
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar style={{
                            margin: 10,
                            backgroundColor: 'red',
                            width: 30,
                            height: 30
                        }}>!</Avatar>
                        <Typography variant='caption'>
                            Небезопасно
                        </Typography>
                    </div>
                </div>

            </div>
        );
    }
}

ProductContainer.propTypes = {
    //pageNumber: PropTypes.number,
    querySymbol: PropTypes.string,
    items: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    count: PropTypes.number,
};

function mapStateToProps(state) {
    return {
        pageNumber: state.changePage,
        querySymbol: state.updateQuery,
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        count: state.getTotalCount
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(query(url)),
        fetchCount: (url) => dispatch(getCount(url))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer)