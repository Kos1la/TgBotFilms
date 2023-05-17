// const { MongoClient } = require("mongodb");

// // URL подключения к MongoDB
// const url = "mongodb://localhost:27017/Kos1la";

// let dbConnection;

// module.exports = {
//   connectToDb: (cb) => {
//     MongoClient.connect(URL)
//       .then((client) => {
//         console.log("Connected to Db");
//         dbConnection = client.db();
//         return cb();
//       })
//       .catch();
//   },
//   getDb: () => dbConnection,
// };

// // Имя базы данных
// const dbName = "Kos1la";

// // Функция для получения названия фильма по номеру из базы данных
// async function getMovieTitleByCode(movieCode) {
//   const client = new MongoClient(url);
//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const moviesCollection = db.collection("movies");
//     const movie = await moviesCollection.findOne({ code: movieCode });
//     return movie ? movie.title : null;
//   } finally {
//     await client.close();
//   }
// }

// module.exports = {
//   getMovieTitleByCode,
// };
