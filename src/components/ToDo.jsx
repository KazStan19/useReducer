import React, {useState,useReducer} from 'react';
import {Table} from 'react-bootstrap'

const reduceFunction = (state,action) =>{

    switch (action.type) {
        case 'input':
            
            let date = new Date()
            let dateItem = date.getFullYear() + '-' + ('0' + date.getMonth() + 1).slice(-2) + '-' + ('0'+date.getDay()).slice(-2)

            return {

                count: state.count + 1,
                toDos: [

                    ...state.toDos,
                    {
                        id:state.count,
                        title: action.payload.title,
                        from: dateItem,
                        until: action.payload.date,
                        complete: false
                    }

                ]

            };

        case 'remove':
        
        return{

            count: state.count,
            toDos: state.toDos.filter(item => item.id !== action.payload)
        
        }

        case 'toggle':
        
        return{

            count: state.count,
            toDos: state.toDos.map((item) => item.id === action.payload ? { ...item , complete: !item.complete} : item)
        
        }
        
            
    
        default: return state;
            
    }

}

const ToDo = () => {
    
    const [{toDos,count}, dispatch] = useReducer(reduceFunction,{ toDos: [], count: 1});
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');

    const inputHandler = () =>{

        dispatch({type:'input', payload: { title: title, date: date } })
        console.log(toDos)
        setDate('')
        setTitle('')

    }

    const removeHandler = (item) =>{

        dispatch({type:'remove',payload:item})

    }

    const toggleHandler = (item) =>{

        dispatch({type:'toggle',payload:item})

    } 


    return (

        <div className='d-flex flex-column align-items-center'>

        <Table>

            <thead>

                <tr>
                        
                        <th>#</th>
                        <th>Title</th>
                        <th>Nuo</th>
                        <th>Iki</th>
                        <th>Remove</th>

                </tr>

            </thead>
            <tbody>



                   {

                        toDos.map(t =>{

                            return(

                                <tr onClick={(e) =>{

                                    e.preventDefault()
                                    toggleHandler(t.id)

                                }} style = {{opacity: t.complete ? '50%' : ''}} key={t.id}>

                                    <td>{t.id}</td>
                                    <td>{t.title}</td>
                                    <td>{t.from}</td>
                                    <td>{t.until}</td>
                                    <td><button onClick={(e) =>{

                                        e.preventDefault()
                                        removeHandler(t.id)


                                    }} className='btn btn-danger'>Remove</button></td>

                                </tr>

                            )

                        })

                   }



            </tbody>


        </Table>

        <form className='d-flex flex-column w-lg-25 w-50 align-items-center' onSubmit={(e) => {

            e.preventDefault()
            inputHandler()

        }}>

        <label htmlFor='titleInput' className='form-label'>Title :</label>
            <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} className='form-control' id='titleInput' placeholder='Title'/>

        <label htmlFor='dateInput' className='form-label'>Do till : </label>
            <input type='date' onChange={(e) => setDate(e.target.value)} value={date} className='form-control' id='dateInput' />

        <button  className='btn btn-success mt-3'>Submit</button>

        </form>

        </div>

  );
};

export default ToDo;
