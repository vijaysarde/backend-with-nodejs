# Mongo DB

## Spin mongodb and mongo-express containers
```
version: '3.8'

services:
  mongodb:
    image: mongo
    container_name: mongodb-container
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin_password
    volumes:
      - ./mogodb_data:/data/db
    networks:
      - mongo-network

  mongo-express:
    image: mongo-express
    container_name: mongo-express-container
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_SERVER: mongodb
      ME_CONFIG_MONGODB_ADMINUSERNAME: admin
      ME_CONFIG_MONGODB_ADMINPASSWORD: admin_password
    depends_on:
      - mongodb
    networks:
      - mongo-network

networks:
  mongo-network:
    driver: bridge
```
Note - access mongo-express on `http://localhost:8081`, use `admin:pass` as credentials or see the container logs for the same
`2024-07-08 13:50:52 basicAuth credentials are "admin:pass", it is recommended you change this in your config.js!`

### exec in mongodb-container
```
// Login to MongoDB Container
mongosh -u admin -p admin_password --authenticationDatabase admin

// show the dbs
show dbs

// select the db
use vijay

// create user and provide the role
db.createUser({
    user: "vijayuser",
    pwd: "vijay_password",
    roles: [{ role: "readWrite", db: "vijay" }]
  })
```

## MongoDB with mongoose

### Methods in Mongoose
In addition to find() and findOne() methods, Mongoose provides several other methods to interact with MongoDB:

##### findById()
Finds a single document by its _id field.
```javascript
const user = await User.findById("60e5f63e3f9f4a001f9a949d");
```

##### findOneAndUpdate()
Finds a single document that matches the query criteria and updates it.
Options:
new: Return the updated document if true. Defaults to false.
upsert: Creates a new document if no document matches the query criteria. Defaults to false.
```javascript
const updatedUser = await User.findOneAndUpdate(
  { username: "johndoe" },
  { email: "newemail@example.com" },
  { new: true, upsert: true }
);
```

##### findOneAndDelete()
Finds a single document that matches the query criteria and deletes it.
```javascript
const deletedUser = await User.findOneAndDelete({ email: "jane.doe@example.com" });
```

##### updateOne() and updateMany()
Updates one or multiple documents that match the query criteria.
```javascript
const result = await User.updateOne(
  { username: "johndoe" },
  { email: "updatedemail@example.com" }
);

const result = await User.updateMany(
  { age: { $gte: 25 } },
  { $set: { isAdult: true } }
);
```

##### deleteOne() and deleteMany()

Deletes one or multiple documents that match the query criteria.
```javascript
const result = await User.deleteOne({ username: "johndoe" });

const result = await User.deleteMany({ age: { $lt: 18 } });
```

### Operators in MongoDB Queries
Operators provide powerful ways to query and manipulate data in MongoDB:

#### Comparison Operators

##### $eq: Matches values that are equal to a specified value.
```javascript
const users = await User.find({ age: { $eq: 30 } }); // Find users aged 30
```

#####  $gt, $gte: Greater than, Greater than or equal to.
```javascript
const users = await User.find({ age: { $gte: 25 } }); // Find users older than or equal to 25
```

#####  $lt, $lte: Less than, Less than or equal to.
```javascript
const users = await User.find({ age: { $lt: 40 } }); // Find users younger than 40
```

#####  $ne: Not equal to.
```javascript
const users = await User.find({ username: { $ne: "admin" } }); // Find users not named "admin"
```

#### Logical Operators

#####  $and: Joins query clauses with a logical AND.
```javascript
const users = await User.find({ $and: [{ age: { $gte: 25 } }, { age: { $lte: 40 } }] }); // Find users aged between 25 and 40
```

#####  $or: Joins query clauses with a logical OR.
```javascript
const users = await User.find({ $or: [{ role: "admin" }, { role: "user" }] }); // Find users with role "admin" or "user"
```

##### $not: Inverts the effect of a query expression and returns documents that do not match the query expression.
```javascript
const users = await User.find({ age: { $not: { $eq: 30 } } }); // Find users whose age is not 30
```

#### Element Operators

##### $exists: Matches documents that have the specified field.
```javascript
const users = await User.find({ email: { $exists: true } }); // Find users with an email field
```

#####  $type: Matches documents where the value of a field is of the specified type.
```javascript
const users = await User.find({ age: { $type: "number" } }); // Find users where age is a number
```

#### Array Operators

#####  $in: Matches any of the values specified in an array.
```javascript
const users = await User.find({ username: { $in: ["johndoe", "janedoe"] } }); // Find users with usernames "johndoe" or "janedoe"
```

#####  $all: Matches arrays that contain all elements specified in the query.
```javascript
const users = await User.find({ tags: { $all: ["mongodb", "nodejs"] } }); // Find users with tags containing "mongodb" and "nodejs"
```

#### Evaluation Operators

##### $regex: Provides regular expression capabilities for pattern matching strings.
```javascript
const users = await User.find({ username: { $regex: /^johndoe/i } }); // Find users with usernames starting with "johndoe" (case-insensitive)
```

##### $text: Performs a text search on string fields.
```javascript
const users = await User.find({ $text: { $search: "MongoDB" } }); // Find users with text "MongoDB" in any text index fields
```
#### Query Modifiers
Mongoose provides additional query modifiers to specify which fields to include or exclude:

#####  .select(): Specifies which fields to include or exclude in the query results.
```javascript
const users = await User.find({}).select("username email"); // Include only username and email fields
```

##### .limit(): Limits the number of documents returned.
```javascript
const users = await User.find({}).limit(10); // Limit to 10 documents
```

##### .skip(): Skips the specified number of documents.
```javascript
const users = await User.find({}).skip(10); // Skip the first 10 documents
```

##### .sort(): Sorts the documents based on specified criteria.
```javascript
const users = await User.find({}).sort({ username: 1 }); // Sort by username in ascending order (1 for ascending, -1 for descending)
```

##### .populate(): Populates referenced documents in other collections.
```javascript
const users = await User.find({}).populate('posts'); // Populate 'posts' field with actual post documents
```
