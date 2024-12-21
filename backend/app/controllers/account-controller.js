import AccountModel from "../models/account-model.js";
import AccountUpdateModel from '../models/account-update-model.js';
import sequelize from '../../config/database-connection.js';

const getBalance = async (req, res) => {

    const userModel = req.userModel;

    try {
        const accountModel = await AccountModel.findOne({
            where: {
                user_id: userModel.id
            }
        })

        res.status(200).json({
            "Saldo": accountModel.balance,
            "Fecha": accountModel.update_balance_at
        });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching accounts: ' + error.message });
    }
}

const getSecurityQuestionByAccountNumber = async (req, res) => {
    const { account_number } = req.query;

    if (!account_number) {
        return res.status(400).json({ message: 'Account number is required.' });
    }

    try {
        const account = await AccountModel.findOne({
            where: { account_number },
            attributes: ['security_question']
        });

        if (!account) {
            return res.status(404).json({ message: 'Account not found.' });
        }

        res.status(200).json({
            message: 'Security question retrieved successfully.',
            security_question: account.security_question
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving security question.', error: error.message });
    }
};

const getPhotographyPathByAccountNumber = async (req, res) => {
    const { account_number } = req.query;

    if (!account_number) {
        return res.status(400).json({ message: 'Account number is required.' });
    }

    try {
        const account = await AccountModel.findOne({
            where: { account_number },
            attributes: ['photo_path']
        });

        if (!account) {
            return res.status(404).json({ message: 'Account not found.' });
        }

        res.status(200).json({
            message: 'Photography path retrieved successfully.',
            photo_path: account.photo_path
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving photography path.', error: error.message });
    }
};

const updateAccountInfo = async (req, res) => {
    const { account_number, security_answer, updates } = req.body;

    if (!account_number || !security_answer || !updates || typeof updates !== 'object') {
        return res.status(400).json({ message: 'Account number, security answer, and updates are required.' });
    }

    const transaction = await sequelize.transaction();

    try {
        const account = await AccountModel.findOne({ where: { account_number } });

        if (!account) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Account not found.' });
        }

        if (account.security_answer !== security_answer) {
            await transaction.rollback();
            return res.status(403).json({ message: 'Invalid security answer.' });
        }

        const allowedFields = [
            'phone',
            'email',
            'name',
            'last_name',
            'photo_path',
            'address',
            'cui',
            'gender',
            'age'
        ];

        const fieldsToUpdate = {};
        const updateDetails = [];

        if (req.photoPath) {
            updates.photo_path = req.photoPath;
        }

        for (const [field, newValue] of Object.entries(updates)) {
            if (allowedFields.includes(field) && account[field] !== undefined && account[field] !== newValue) {
                updateDetails.push({
                    field_name: field,
                    old_value: account[field],
                    new_value: newValue
                });
                fieldsToUpdate[field] = newValue;
            }
        }

        if (updateDetails.length > 0) {
            await account.update(fieldsToUpdate, { transaction });

            const logEntry = {
                account_id: account.id,
                field_name: updateDetails.length === 1 ? updateDetails[0].field_name : 'Multiple fields',
                old_value: updateDetails.length === 1
                    ? updateDetails[0].old_value
                    : JSON.stringify(updateDetails.map(d => ({ field: d.field_name, value: d.old_value }))),
                new_value: updateDetails.length === 1
                    ? updateDetails[0].new_value
                    : JSON.stringify(updateDetails.map(d => ({ field: d.field_name, value: d.new_value }))),
                updated_at: Math.floor(Date.now() / 1000)
            };

            await AccountUpdateModel.create(logEntry, { transaction });
        }

        await transaction.commit();

        res.status(200).json({ message: 'Account information updated successfully.' });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: 'Error updating account information.', error: error.message });
    }
};

export {
    getBalance,
    getSecurityQuestionByAccountNumber,
    getPhotographyPathByAccountNumber,
    updateAccountInfo
}