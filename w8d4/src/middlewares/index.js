import { validationResult, body, query } from 'express-validator'
import UserModel from '../models/userModel.js';
export const validateResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => ({
            field: err.path,
            message: err.msg
        }));

        return res.status(400).json({
            success: false,
            errors: formattedErrors
        });
    }

    next();
};
export const createUserValidator = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('firstName is required')
        .isAlpha('en-US')
        .withMessage('Only English alphanets allowed')
    ,
    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('lastName is required')
        .isAlpha('en-US')
        .withMessage('Only English alphanets allowed'),
    body('age')
        .isInt({ min: 18, max: 100 })
        .withMessage('Age must be between 18 and 100'),
    body('username')
        .trim()
        .notEmpty()
        .withMessage('username is required')
        .toLowerCase(),
    body('dateOfBirth')
        .isISO8601()
        .toDate()
        .withMessage('Invalid date format')
        .custom((date) => {
            const age = Math.floor((new Date() - date) / 31557600000);
            if (age < 18) {
                throw new Error('Must be at least 18 years old');
            }
            return true;
        }),
    body('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Please provided valid email address!")
        .custom(async (email) => {
            const user = await UserModel.findOne({ email });
            if (user) {
                throw new Error('Email already exists');
            }
        }),
    validateResult
]

export const createPostValidator = [
    body('text')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isString(),
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 12 })
        .withMessage("title chareacters count must be 12 minimum!"),
    body('author')
        .trim()
        .notEmpty()
        .withMessage('Author is required')
        .isMongoId()
        .withMessage("Author must be a valid Mongodb ID"),
    validateResult
]

export const getPostValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .toInt(),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .toInt(),
    validateResult
]