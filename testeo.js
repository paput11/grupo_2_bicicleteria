const bcryptjs = require("bcryptjs");

let hash = bcryptjs.hashSync("dota2",50);
        console.log(hash);
        console.log(bcryptjs.compareSync(hash,"$2a$10$0uwLg16z40EEdW0JkS491uGy0waTMza/XtDm.D0YOep73bYyeAxDq"));