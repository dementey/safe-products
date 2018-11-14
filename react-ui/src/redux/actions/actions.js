export function itemsHasErrored(bool) {//ошибка загрузки
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {//состояние загрузки для CircularProgress
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function updatePage(page) {//обновление страници при пагинации
    return {
        type: 'UPDATE_PAGE',
        pageNumber: page
    };
}

export function itemsFetchDataSuccess(items) {//получение данных
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items: items
    };
}

export function sendQuery(valueSearch) { //отправить запрос
    return {
        type: 'SEND_QUERY',
        query: valueSearch
    };
}

export function getCountAction(count) {//запросить количество элементов
    return {
        type: 'GET_COUNT',
        count: count
    };
}

export function getCount(url) {//запросить количество элементов

    return (dispatch) => {
        fetch(url)
            .then(response => response.json())
            .then(count => dispatch(getCountAction(count.count)))
            .catch(() => 'error')
    };
}

export function query(url) {//запрос возвращает json
    // console.log('function query(url) '+url);
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => {
                dispatch(itemsFetchDataSuccess(items))
            })
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}