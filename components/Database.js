import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("sala_arkadiusz_2.db");

export default class Database {

    static createTable() {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS table1 (id integer primary key not null, hour text, days text, active boolean );"
            );
        });
    }
    static add(hour, days, active) {
        db.transaction(
            tx => {
                tx.executeSql(`INSERT INTO table1 (hour, days, active) values ('${hour}', '${days}', '${active}')`);
            },
        )

    }
    static getAll() {
        var query = "SELECT * FROM table1";
        //
        return new Promise((resolve, reject) => db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {

                // console.log(JSON.stringify(results), "OK")

                resolve(JSON.stringify(results));

            }, function (tx, error) {
                // console.log(error)
                reject(error);

            });
        }))
    }
    static updateDays(id, days) {
        console.log(`UPDATE table1 SET days='${JSON.stringify(days)}' WHERE (id = ${id});`)
        db.transaction(tx => {
            tx.executeSql(`UPDATE table1 SET days='${JSON.stringify(days)}' WHERE (id = ${id});`)
        })
    }
    static remove(id) {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM table1 WHERE (id = ${id});`
            );
        });
    }
    static removeAll() {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM table1 ;"
            );
        });
    }
}