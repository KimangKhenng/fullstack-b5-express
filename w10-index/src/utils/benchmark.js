import 'dotenv/config'
import connectDB from '../config/database.js';
import ProductModel from '../models/productModel.js';

await connectDB()

// Test Without Index

async function withoutIndex() {
    console.log("Start testing without index")

    const result = await ProductModel.find({ category: "electronics" }).explain('executionStats')

    const stats = result.executionStats

    console.log('================Without Index======')
    console.log(`Execution Time: ${stats.executionTimeMillis}ms`)
    console.log(`Document Examined: ${stats.totalDocsExamined}`)
    console.log(`Document Returned: ${stats.nReturned}`)
    console.log(`Stage Type: ${stats.executionStages.stage}`)
    console.log('================')

}

async function withIndex() {
    console.log("Start testing with index")
    await ProductModel.collection.createIndex({ category: 1 })
    console.log("Index created")

    const result = await ProductModel.find({ category: "electronics" }).explain('executionStats')

    const stats = result.executionStats

    console.log('================With Index======')
    console.log(`Execution Time: ${stats.executionTimeMillis}ms`)
    console.log(`Document Examined: ${stats.totalDocsExamined}`)
    console.log(`Document Returned: ${stats.nReturned}`)
    console.log(`Stage Type: ${stats.executionStages.stage}`)
}

await withoutIndex()
await withIndex()