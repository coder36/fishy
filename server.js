const express = require('express');

const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const loki = require('lokijs');
const csv = require('csvtojson');

let db;

async function initDb() {
    const conn = new loki();
    db = {conn, fish: conn.addCollection('fish')};
    await db.fish.insert( await csv({delimiter: '|'}).fromFile('./fish.csv') );
}


async function run() {

    await initDb();
    const app = express();

    app.use(cors());
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(helmet.noCache());

    app.get( '/api/species/search', async (req, res) => {
        const {query} =  req.query;
        if( !query ) return res.json({error: 'no searchTerm provided'})

        const data = await db.fish.chain().find({
            $or: [
                {name: {$regex: new RegExp( query, 'i')} },
                {fao_code: {$regex: new RegExp( query, 'i')} },
                {scientific_name: {$regex: new RegExp( query, 'i')} },
            ]
        }).data();

        removeLokiMetaData(data);
        res.json(data);
    });

    const port = process.env.PORT || 5001;
    app.listen(port, () => console.log(`API listening on port ${port}`));
}


function removeLokiMetaData(obj) {
    if(!obj) return obj;
    if( Array.isArray(obj) ) {
        obj.forEach( o => {
            delete o.meta;
            delete o.$loki;
        });
        return obj;
    }
    else {
        delete obj.$loki;
        delete obj.meta;
    }
    return obj;
}


run();




