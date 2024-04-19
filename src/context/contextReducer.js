export const ACTION = {
    ADD_TRANSACTION: 'add-transaction',
    DELETE_TRANSACTION: 'delete-transaction'
}

const contextReducer = (state, action) => {
    let transaction;

    switch(action.type){
        case ACTION.ADD_TRANSACTION:
            transaction = [action.payload, ...state];  
            localStorage.setItem('transactions', JSON.stringify(transaction))
            
            return transaction
        case ACTION.DELETE_TRANSACTION:
            transaction = state.filter(t => t.id !== action.payload);
            localStorage.setItem('transactions', JSON.stringify(transaction))
            
            return transaction 
        default:
            return state;
    }

}

export default contextReducer