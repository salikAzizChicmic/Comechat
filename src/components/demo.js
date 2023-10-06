var obj = require("lodash");
const inventory = [
    { name: "asparagus",date:new Date() ,type: "vegetables", quantity: 5 },
    { name: "bananas",date:new Date("2022-03-25"), type: "fruit", quantity: 0 },
    { name: "goat",date:new Date(), type: "meat", quantity: 23 },
    { name: "cherries",date:new Date(), type: "fruit", quantity: 5 },
    { name: "fish",date:new Date(), type: "meat", quantity: 22 },
];
  
const result = obj.groupBy(inventory, ({ date }) => date.getTime());
  console.log(result);