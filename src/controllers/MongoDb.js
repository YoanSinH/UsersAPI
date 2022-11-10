const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb+srv://crappuser:piXg5RaaCdcYxg0j@cluster0.gyg3t.mongodb.net/?retryWrites=true&w=majority";

/**
 * Get documents
 * @param {*} dbName Database name
 * @param {*} collectionName Collection name
 * @returns Promise
 */
const getDocuments = async (dbName, collectionname) => {
    const mongoClient = new MongoClient(uri);
    const db = mongoClient.db(dbName);
    const collection = db.collection(collectionname);
    const result = await collection.find({}).toArray();
    return result;
}

/**
 * Get document by id
 * @param {*} dbName Database name
 * @param {*} collectionName Collection name
 * @param {*} id id of document to get
 * @returns Promise
 */
const getDocumentById = async (dbName, collectionName, id) => {
    const idMongo = new ObjectId(id)
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.find({ _id: idMongo }).toArray();
    return result
}

const updateDocumentById = async (dbName, collectionName, {id, data}) => {
    const idMongo = new ObjectId(id)
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    delete data._id;
    const result = await collection.replaceOne({_id: idMongo},data);
    return result
}

/**
 * Delete document
 * @param {*} dbName Database Name 
 * @param {*} collectionName Collection Name
 * @param {*} id Id of document to delete
 * @returns Promise
 */
const deleteDocument = async (dbName, collectionName, id) => {
    const idMongo = new ObjectId(id)
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.deleteOne({ _id: idMongo });
    return result
}

/**
 * Insert document
 * @param {*} dbName Database Name
 * @param {*} collectionname Collection name
 * @param {*} data Data to insert
 * @returns  Promise
 */
const insertDocument = async (dbName, collectionname, data) => {
    const mongoClient = new MongoClient(uri);
    const db = mongoClient.db(dbName);
    const collection = db.collection(collectionname);
    const result = await collection.insertOne(data);
    return result;
}

module.exports = { getDocuments, insertDocument, getDocumentById, updateDocumentById ,deleteDocument }