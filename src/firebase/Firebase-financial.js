import { addDoc, 
    collection,
    setDoc,
    getDocs, 
    query, 
    where,
    updateDoc,
    doc,
    getDoc, } from 'firebase/firestore';

    import { db } from './Firebase.config'


export const addFinancialTransaction = async (data, email, newLoan, loanPayment) => {

    let prestamoId = "";

    if(newLoan){

        const loanToAdd = {
            balance: parseFloat(data.monto), 
            monto: parseFloat(data.monto),
            persona: data.persona,
            prestador: data.tipo === "Gasto" && data.tipo_gasto === 3,
            fecha: data.fecha,
            dia: data.dia,
            mes: data.mes + 1,
            anio: data.anio,
            email
        }

       prestamoId = await addNewLoan(loanToAdd)
    }

    if(loanPayment){
        await addLoadPayment(data.prestamo, data.monto)
    }

    const transactionToAdd = {
        descripcion : data.descripcion,
        fecha: data.fecha,
        monto: parseFloat(data.monto),
        dia: data.dia,
        mes: data.mes + 1,
        anio: data.anio,
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

const addLoadPayment = async (loanId, amountPaid) => {
    
    const refLoan = doc(db, "Prestamos", loanId)
    const loanSnap = await getDoc(refLoan)

    console.log(refLoan)

     await updateDoc(refLoan, {
        balance : loanSnap.data().balance - amountPaid
    })
}

export const getActiveLoans = async (email) => {

    const q = query(collection(db, "Prestamos"), where("email", "==", email), where("balance", ">", 0))
    const { docs } = await getDocs(q)
    const snapshot = docs.map(doc => ({...doc.data(), id:doc.id}))

    console.log(snapshot)

    return snapshot
}

export const getExpenses = async (email) => {

    const q = query(collection(db, "Gastos"), where("email", "==", email))
    const { docs } = await getDocs(q)
    const snapshot = docs.map(doc => ({...doc.data(), id:doc.id}))

    console.log(snapshot)

    return snapshot
}

export const getIncomes = async (email) => {

    const q = query(collection(db, "Ingresos"), where("email", "==", email))
    const { docs } = await getDocs(q)
    const snapshot = docs.map(doc => ({...doc.data(), id:doc.id}))

    console.log(snapshot)

    return snapshot
}