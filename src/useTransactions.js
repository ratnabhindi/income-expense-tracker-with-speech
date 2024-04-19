import { useContext } from 'react'
import { ExpenseTrackerContext } from './context/context'
import { incomeCategories, expenseCategories, resetCategories } from './constants/categories'


const useTransactions = (type) => {
    //set all values to 0
    resetCategories();

    const { transactions } = useContext(ExpenseTrackerContext);

    // //get transaction for selected type
    const selectedTypeTransactions = transactions.filter(t => t.type === type)
    
    // //get total of selected type
    const total = selectedTypeTransactions.reduce((acc, curVal) => acc += curVal.amount, 0);

   
    // //get categories for selected type (typ: incom or expense)
    const selectedCategories = type === 'Income' ? incomeCategories : expenseCategories;

    //calculate and set total amounts for each category using the transaction amounts for the selected type
    selectedTypeTransactions.forEach(t => {
        const category = selectedCategories.find(c => c.type === t.category);

        if(category) category.amount += t.amount;
    });

    
     const filteredCategories = selectedCategories.filter((c) => c.amount > 0);

    const chartData = {
        datasets: [
            { 
                data: filteredCategories.map(c => c.amount),
                backgroundColor: filteredCategories.map(c => c.color) 
            }
        ],
        labels: filteredCategories.map(c => c.type)
    }
    
   

    return { total, chartData }
}

   

    


export default useTransactions
