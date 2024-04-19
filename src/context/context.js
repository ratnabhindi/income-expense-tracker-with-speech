import React, { useReducer, createContext} from 'react'

import contextReducer, { ACTION } from './contextReducer.js'

const initialState = JSON.parse(localStorage.getItem('transactions')) || [
    //initialize with some data
    {amount: 500, category: "Car", type: "Expense", date: "2021-02-01", id: "64bd91ca-fea6-45df-9ce9-6893f54b724e"},
    {amount: 1000, category: "Bills", type: "Expense", date: "2021-02-01", id: "2bb95c87-3fe9-4a6d-87f7-415a0e9eb6f7"},
    {amount: 100, category: "Business", type: "Income", date: "2021-02-01", id: "8eea1afe-2435-4e99-a26f-d0a80e843e50"},
    {amount: 5000, category: "Salary", type: "Income", date: "2021-02-01", id: "b631a669-e794-456a-a314-94457b161a96"},
]

console.log(localStorage.getItem('transactions'));


export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children}) => {
    const[transactions, dispatch] = useReducer(contextReducer, initialState);

    console.log(transactions);

    const balance = transactions.reduce((prev, curr) =>  (curr.type === 'Income' ? prev + curr.amount : prev - curr.amount), 0);
    //Actions  
    const deleteTransaction = (id) => dispatch({ type: ACTION.DELETE_TRANSACTION, payload: id})

    const addTransaction = transaction => dispatch({ type: ACTION.ADD_TRANSACTION, payload: transaction})

    return(
        <ExpenseTrackerContext.Provider value={{ 
            deleteTransaction,
            addTransaction,
            transactions,
            balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}