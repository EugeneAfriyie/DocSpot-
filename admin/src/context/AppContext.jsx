import { createContext } from "react"




export const AppContext = createContext()

const AppcontextProvider = (props) => {

    const currencySymbol = "$"

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };

    const slotDateFormat = (slotdate) => {
        const dataArray = slotdate.split('-');
        const day = dataArray[0];
        const month = dataArray[1];
        const year = dataArray[2];
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return day + ' ' + months[Number(month - 1)] + ' ' + year;
    };

    const value ={
         calculateAge,
        slotDateFormat,
        currencySymbol

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}


export default AppcontextProvider