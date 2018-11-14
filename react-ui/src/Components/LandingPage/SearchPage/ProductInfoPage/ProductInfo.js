import React from 'react';
import PropTypes from 'prop-types';

import ProductInfoTab from './ProductInfoTab';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import '../../../css/Styles.css';

class ProductInfo extends React.Component {

    render() {
        //console.log(item);
        const { item, open, onClose } = this.props;
        const imageUrl = 'https://' + item.image
        return (
            <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
                <DialogTitle>
                    <div className="row">
                        <div className="col-5">
                            <a href={item.url} target="_blank">
                                <Tooltip id={item.name} title="Посетить мою страницу" placement="right-end">
                                    <img className="img-thumbnail" src={imageUrl}
                                        style={{ width: '100%', height: 'auto' }}
                                        alt="Product" />
                                </Tooltip>
                            </a>
                        </div>
                        <div className="col-7">
                            <Typography variant="title">
                                {item.brand}
                            </Typography>
                            <Typography variant="subheading">
                                {item.name}
                            </Typography>
                            <Typography variant="body1">
                                {item.category} {(item.sub_category !== item.category && item.sub_category !== 'None') && ' | ' + item.sub_category}
                            </Typography>
                            <Typography variant="body1">
                                {item.price}
                            </Typography>
                            <Typography variant="caption" gutterBottom={true}>
                                {item.love_count} покупателям понравилось
                            </Typography>
                            {
                                item.ingredients[0] === 'None' ?
                                    <Typography color='primary' variant='body1'>
                                        Информация о ингридиенах не найдена
                                    </Typography> :
                                    !item.is_safe &&
                                    <div>
                                        <Typography color='secondary' variant='body1'>
                                            Этот продукт является небезопасным!
                                        </Typography>
                                        <Typography color='secondary' variant='body1'>
                                            Вредные ингридиенты: {item.unsafe_ingredients}
                                        </Typography>
                                    </div>
                            }
                        </div>
                    </div>
                </DialogTitle>
                <ProductInfoTab itemInfo={item} />
            </Dialog>
        );
    }
}

ProductInfo.propTypes = {
    item: PropTypes.object.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func

};

export default ProductInfo;
