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


const data = {
    Product: ["Diskette", "Memory Card", "HDTV Tuner", "Flat Panle Graphics Monitor", "Digital Camera", "Minitower Speaker"],
    Cost: [333.08, 7.07, 10.77, 194.76, 13.18, 143.3]
}






function getColumns(req, res) {
    res.json(columns);
}
function getData(req, res) {
    const { measures } = req.body;
    const { dimension } = req.body
    console.log(measures);
    let result = [
        {
            "name": dimension,
            "values": data[dimension]
        }, {
            "name": measures[0],
            "values": data[measures[0]]
        }
    ]
    res.json(result);
}
