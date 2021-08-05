const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/columns', getColumns)
app.post('/columns', getData)




app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log(`App server is running and listening on port ${PORT}`);
});

const columns = [
    {
        "name": "Product",
        "function": "dimension"
    },
    {
        "name": "Year",
        "function": "dimension"
    },
    {
        "name": "Country",
        "function": "dimension"
    },
    {
        "name": "Cost",
        "function": "measure"
    },
    {
        "name": "Revenue",
        "function": "measure"
    },
    {
        "name": "Units sold",
        "function": "measure"
    },
]

//this data just for demo and I decided to make it simple and didn't use database (mongodb or sql)
const data = {
    Product: ["Diskette", "Memory Card", "HDTV Tuner", "Flat Panle Graphics Monitor", "Digital Camera", "Minitower Speaker"],
    Year: ["2010", "2011", "2012", "2013", "2014", "2015"],
    Country: ["Egypt", "Germany", "USA", "England", "Italy", "Saudi Arabia"],
    Revenue: [9000, 10000, 7000, 80000, 3400, 5500],
    'Units sold': [1000, 2000, 2300, 12000, 20000, 5030],
    Cost: [333.08, 700.07, 100.77, 194.76, 130.18, 143.3]
}




function getColumns(req, res) {
    res.json(columns);
}
function getData(req, res) {
    const { measures } = req.body;
    const { dimension } = req.body
    let result = [
        {
            "name": dimension,
            "values": data[dimension]
        }
    ]
    measures.forEach(measure => {
        result.push({
            name: measure,
            values: data[measure]
        })
    });
    res.json(result);
}
