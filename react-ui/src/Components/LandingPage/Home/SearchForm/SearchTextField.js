import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    textFieldRoot: {
        padding: 0,
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    textFieldInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            'Roboto',
        ].join(','),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
});



const CustomizedInputs = (props) => {

    const { classes, cbOnChange } = props;
    return (
        <TextField
            //required={true} //Если значение true, метка отображается по мере необходимости, и вход будет необходим.
            autoFocus={true} //Если значение true, вход будет сфокусирован во время первого монтирования
            onChange={cbOnChange}
            //label="Введите продукт"
            //defaultValue ="Введите данные"
            InputProps={{//Свойства, применяемые к элементу ввода
                disableUnderline: true,//Убираем подчеркивание
                classes: {
                    root: classes.textFieldRoot,//Стили применяются к корневому элементу
                    input: classes.textFieldInput
                }
            }}
        //InputLabelProps={{
        //   shrink: true,
        //   className: classes.bootstrapFormLabel,
        // }}
        />
    );
};


CustomizedInputs.propTypes = {
    classes: PropTypes.object.isRequired,
    cbOnChange: PropTypes.func
};


export default withStyles(styles)(CustomizedInputs);