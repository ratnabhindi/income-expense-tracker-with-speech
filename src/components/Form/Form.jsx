import React, { useState, useContext, useEffect } from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, Menu } from '@material-ui/core'
import { v4 as  uuidv4} from 'uuid'
import { useSpeechContext } from '@speechly/react-client'

import useStyles from './styles'
import { ExpenseTrackerContext } from '../../context/context'
import { incomeCategories, expenseCategories } from '../../constants/categories'
import formatDate from '../../utils/formatDate'
import CustomSnackbar from '../Snackbar/Snackbar'

const intialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date())
}

const Form = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState(intialState);
    const [open, setOpen] = useState(false);
    const {addTransaction} = useContext(ExpenseTrackerContext);
    const categoryExpenses = formData.type === 'Income' ? incomeCategories : expenseCategories;
    const { segment } = useSpeechContext();
    useEffect(() => {
        if(segment)
        {
            if(segment.intent.intent === 'add_income')
                setFormData({...formData, type: 'Income'});
            else if(segment.intent.intent === 'add_expense')
                setFormData({...formData, type: 'Expense'})
            else if(segment.isFinal && segment.intent.intent === 'create_transaction')
                return createTransaction();
            else if(segment.isFinal && segment.intent.intent === 'cancel_transaction')
                return setFormData(intialState);

            console.log(segment.intent.intent);

            segment.entities.forEach(e => {
                switch(e.type)
                {
                    case 'category':
                        const category = e.value[0] + e.value.substring(1).toLowerCase();
                        console.log(category);
                        if(incomeCategories.map(c => c.type).includes(category)){
                            setFormData({...formData, type: 'Income', category})
                        }
                        else if(expenseCategories.map(c => c.type).includes(category)){
                            setFormData({...formData, type: 'Expense', category})
                        }
                        
                    break;
                    case 'amount':
                        setFormData({...formData, amount: e.value})
                    break;
                    case 'date':
                        setFormData({...formData, date: formatDate(e.value)})
                    break;
                    default:
                        break;
                }
            });

            //if all formdate presetn create transaction
            if(segment.isFinal && formData.amount && formData.category && formData.type && formData.date)
                createTransaction();
        }
    }, [segment]);

    const createTransaction = () => {
    //validation
        if(!formData.amount.trim() || !formData.category) return;

        if(Number.isNaN(Number(formData.amount) || !formData.date.includes('-'))) return;

        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4()}
        
        addTransaction(transaction);
        setOpen(true);
        setFormData(intialState);
    }
        
    return (
        <Grid container spacing={2}>
            <CustomSnackbar open={open} setOpen={setOpen}/>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    { segment ? segment.words.map(w => w.value).join(' ') : null}
                    </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl  fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                        {categoryExpenses.map(c => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)} 
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth type="number" label="Amount" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth type="date" label="Date" value={formData.date} onChange={e => setFormData({...formData, date: formatDate(e.target.value)})} />
            </Grid>
            <Button fullWidth className={classes.button} variant="outlined" color="primary" onClick={createTransaction}>Add Transaction</Button>
        </Grid>
    )
}

export default Form
