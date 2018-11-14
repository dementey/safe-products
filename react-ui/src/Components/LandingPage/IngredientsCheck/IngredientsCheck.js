import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core//Typography';

import '../../css/Styles.css';


const harmful_ingredients = ['глутамат натрия', 'нитрит натрия', 'аспартам', 'бензоат натрия',
    'формальдегид', 'сульфиты', 'Е103', 'E107', 'E125', 'E127', 'E128', 'E140', 'E153', 'яд'];

const getHighlightedText = (text, higlight) => {
    let re = '(' + higlight.join('|') + ')';
    let parts = text.split(new RegExp(re, 'gi'));
    return <span> {parts.map((part, i) =>
        <span key={i}
            style={higlight.some(function (item) {
                return part.toLowerCase() === item.toLowerCase()
            })
                ? {
                    backgroundColor: 'red',
                } : {}}>
            {part}
        </span>)
    } </span>;
};


const ResultDisplay = ({ length, onreturn, content, unsafe }) => {
    if (length > 0) {
        let displayContent = getHighlightedText(content, unsafe);
        return (
            <div>
                <div className="alert alert-danger fadeIn" role="alert">
                    Небезопасно! Найдены вредные ингридиенты!
                </div>
                <Paper elevation={4} style={{ padding: '20px' }}>
                    <Typography variant='body1' gutterBottom={true}>
                        {displayContent}
                    </Typography>
                </Paper>
                <button className="btn btn-primary btn-lg btn-block" onClick={onreturn}>Повторить</button>
            </div>
        )
    } else {
        return (
            <div>
                <div className="alert alert-primary fadeIn" role="alert">
                    Безопасно! Вредные ингридиенты не найдены
                </div>
                <Paper elevation={4} style={{ padding: '20px' }}>
                    <Typography variant='body1' gutterBottom={true}>
                        {content}
                    </Typography>
                </Paper>
                <button className="btn btn-primary btn-lg btn-block" onClick={onreturn}>Проверить еще?</button>
            </div>
        )
    }
};


const CheckDisplay = ({ onChange, onClick, onPress }) =>

    <form>
        <Typography variant='title' gutterBottom={true}>Инструмент проверки ингредиентов на вредность</Typography>
        <textarea placeholder="Введите или вставьте ингридиенты продукта" onChange={onChange} autoFocus={true}
            className="form-control" onKeyPress={onPress} rows="5" />
        <input type="button" onClick={onClick} className="btn btn-primary btn-lg btn-block"
            value='Проверить' />
    </form>


class IngredientsCheck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            unsafe: [],
            checked: false,
            content: ''
        };
        this.onPress = this.onPress.bind(this);
        this.onclick = this.onclick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onclickreturn = this.onclickreturn.bind(this);
    }

    checkIngre = (content) => {
        let contentlower = content.toLowerCase();
        let unsafeIng = [];
        harmful_ingredients.forEach(function (ing) {
            if (contentlower.includes(ing)) {
                unsafeIng.push(ing);
            }
        });
        return unsafeIng;
    };

    onPress = (EO) => {
        const validation = /[a-zA-Z]/;
        if (EO.key === 'Enter' && validation.test(this.state.content)) {
            this.onclick(EO) //e
        }
    };

    onChange = (EO) => {
        this.setState({
            content: EO.target.value
        })
    };

    onclick = (EO) => {
        if (this.state.content !== '') {
            this.setState({
                checked: true,
                unsafe: this.checkIngre(this.state.content)
            })
        }
    };

    onclickreturn = (EO) => {
        this.setState({
            checked: false,
            content: ''
        })
    };

    render() {
        return (
            <div className="home-box container">
                {
                    this.state.checked ?
                        <ResultDisplay length={this.state.unsafe.length} onreturn={this.onclickreturn}
                            content={this.state.content}
                            unsafe={this.state.unsafe} /> :
                        <CheckDisplay onChange={this.onChange} onClick={this.onclick} onPress={this.onPress} />
                }
            </div>
        );
    }
}

export default IngredientsCheck;