import { faker } from '@faker-js/faker';
import 'dotenv/config'
import bcrypt from 'bcryptjs';

import connectDB from '../config/database.js';
import ProductModel from '../models/productModel.js';
import mongoose from 'mongoose';

await connectDB()

const categories = ["electronics", "clothing", "book", "toys", "sports"]
const products = []

const NMMBER_OF_PRODUCTS = 1000000

for (let i = 0; i < NMMBER_OF_PRODUCTS; i++) {
    products.push({
        name: faker.commerce.productName(),
        category: faker.helpers.arrayElement(categories),
        price: faker.number.int({ min: 10, max: 1000 }),
        stock: faker.number.int({ min: 5, max: 200 }),
        createdAt: faker.date.past()
    })
}

await ProductModel.insertMany(products)
console.log(`Created ${NMMBER_OF_PRODUCTS}`)

await mongoose.connection.close()

// import PostModel from '../models/postModel.js';
// import UserModel from '../models/userModel.js';

// const NUMBER_OF_USERS = 100;
// const NUMBER_OF_POSTS = 1000000;

// const userIDs = []

// // Generate admin
// const saltRounds = 12;
// const hashedPassword = await bcrypt.hash("admin", saltRounds);
// const user = new UserModel({
//     firstName: faker.person.firstName(),
//     lastName: faker.person.lastName(),
//     email: 'admin@tdevs.com',
//     username: 'admin',
//     dateOfBirth: faker.date.birthdate(),
//     age: faker.number.int({ min: 18, max: 100 }),
//     role: 'admin',
//     password: hashedPassword
// })
// await user.save()
// userIDs.push(user._id)

// for (let i = 0; i < NUMBER_OF_USERS; i++) {
//     const saltRounds = 12;
//     const hashedPassword = await bcrypt.hash("12345678", saltRounds);
//     const user = new UserModel({
//         firstName: faker.person.firstName(),
//         lastName: faker.person.lastName(),
//         email: faker.internet.email(),
//         username: faker.internet.username(),
//         dateOfBirth: faker.date.birthdate(),
//         age: faker.number.int({ min: 18, max: 100 }),
//         role: faker.helpers.arrayElement(['user', 'editor', 'admin']),
//         password: hashedPassword
//     })
//     await user.save()
//     userIDs.push(user._id)
//     console.log(`User ${user.username} with _id: ${user._id} generated!`)
// }

// for (let i = 0; i < NUMBER_OF_POSTS; i++) {
//     const post = new PostModel({
//         text: faker.lorem.paragraphs(2),
//         title: faker.lorem.sentence(5),
//         author: faker.helpers.arrayElement(userIDs)
//     })
//     await post.save()
//     console.log(`Post with _id: ${post._id} generated!`)
// }