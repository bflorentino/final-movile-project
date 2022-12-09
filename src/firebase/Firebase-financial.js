import { addDoc, 
    collection,
    setDoc,
    getDocs, 
    query, 
    where, } from 'firebase/firestore';

    import { db } from './Firebase.config'


export const addFinancialTransaction = async (data, email, newLoan, LoanPayment) => {

    let prestamoId = "";

    if(newLoan){

        const loanToAdd = {
            balance: parseInt(data.monto), 
            monto: parseInt(data.monto),
            persona: data.persona,
            prestador: data.tipo === "Gasto" && data.tipo_gasto === 3,
            fecha: data.fecha,
            email
        }

       prestamoId = await addNewLoan(loanToAdd)
    }

    const transactionToAdd = {
        descripcion : data.descripcion,
        fecha: data.fecha,
        monto: data.monto,
        email,
        prestamo: prestamoId,
    }

    data.tipo === "Gasto" 
        ? transactionToAdd.tipo_gasto = data.tipo_gasto 
        : transactionToAdd.tipo_ingreso = data.tipo_ingreso

    const collect = data.tipo === "Gasto" ? "Gastos" : "Ingresos"

    try{
        await addDoc(collection(db, collect), transactionToAdd)
        return true
     }
     catch(e){
        console.log(e)
        return false
     }
} 

const addNewLoan = async (data) => {

    try{
        const ref = await addDoc(collection(db, "Prestamos"), data)
        return ref.id

    }catch(e){
        console.log(e)
        return false
    }
}

const addLoadPayment = (data) => {

}

export const getActiveLoans = async (email) => {

    const q = query(collection(db, "Prestamos"), where("email", "==", email), where("balance", ">", 0))
    const { docs } = await getDocs(q)
    const snapshot = docs.map(doc => ({...doc.data(), id:doc.id}))

    console.log(snapshot)

    return snapshot
}