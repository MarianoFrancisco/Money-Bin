import AccountModel from "../models/account-model.js";
import AccountUpdateModel from '../models/account-update-model.js';
import sequelize from '../../config/database-connection.js';
import generateAccountNumber from "../middleware/numberAccount-middleware.js";
import ComplaintsModel from "../models/complaints-model.js";
import dotenv from 'dotenv';
import sendEmail from "../services/send-mail-service.js";
import UserModel from "../models/user-model.js";
import RequestLoanModel from "../models/service-request-loan-model.js";
import CurrencyExchangeModel from "../models/currency-exchange-model.js";

import ServiceCancellation from "../models/service_cancellations-model.js";
import requestChangeInfo from "../models/request-change-info-model.js";
import LoanModel from "../models/loan-model.js";

dotenv.config();

const reporte_prestamos = async (req, res) => {

    //loan_type 
    //total_amount
    //remaining_balance
    //interest_rate
    //state
    //created_at

    try {
        //Registro de prestamos
        const registros = await LoanModel.findAll()



        let registro_prestamos = []
        console.log(registros.length)
        for (let i = 0; i < registros.length; i++) {
            const usuario = await AccountModel.findOne({
                where: {
                    id: registros[i].account_id
                }
            })

            //Cambiar la fecha a formato original
            const date = new Date(registros[i].created_at * 1000);

            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();

            const registro = {
                Account_number: usuario.account_number,
                loand_type: registros[i].loan_type,
                total_amount: registros[i].total_amount,
                remaining_balance: registros[i].remaining_balance,
                interest_rate: registros[i].interest_rate,
                state: registros[i].state,
                created_at: `${day}/${month}/${year}`
            }
            //console.log(registro)

            registro_prestamos.push(registro)

        }

        //Buscar numero de cuenta




        return res.status(200).json({ message: registro_prestamos });



    } catch (error) {
        res.status(500).json({ message: 'Error interno', error: error.message });
    }


    
    



}








export {
    reporte_prestamos
}