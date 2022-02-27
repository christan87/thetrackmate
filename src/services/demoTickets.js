//needs an author field
export default [
    {
        name:"Bug 1",
        id: "48625",
        type: "Bug",
        description: "Testing bug...",
        priority: "High",
        status: "Open",
        assignedDevs:[],
        comments:[],
        date: "01/12/22",
        private: true,
        project:{
            id:"123456",
            name: "Project 1"
        } 
    },
    {
        name:"Goal 1",
        id: "48725",
        type: "Goal",
        description: "Generic goal...",
        priority: "Medium",
        status: "In Progress...",
        assignedDevs:[
            {
                name: "Mark Tate",
                id: 7410
            },
            {
                name: "Angela Lark",
                id: 8520
            },
        ],
        comments:[
            "761349",
            "762349"
        ],
        date: "01/12/22",
        private: true,
        project:{
            id:"123457",
            name: "Project 2"
        } 
    },
    {
        name:"Feature 1",
        id: "486288",
        type: "Feature Request",
        description: "Generic Feature Request",
        priority: "Low",
        status: "Closed",
        assignedDevs:[
            {
                name: "Rodger Bellows",
                id: 9630
            },
            {
                name: "Lark Mann",
                id: 7450
            },
            {
                name: "Recce Bullock",
                id: 8580
            },
        ],
        comments:[
            "76235449",
            "76245449",
            "76245479"
        ],
        date: "01/12/22",
        private: false,
        project:{
            id:"123458",
            name: "Project 3"
        } 
    },
    {
        name:"Bug 2",
        id: "4845625",
        type: "Bug",
        description: "Testing bug...",
        priority: "High",
        status: "Open",
        assignedDevs:[],
        comments:[],
        date: "01/12/22",
        private: true,
        project:{
            id:"123457",
            name: "Project 2"
        } 
    },
    {
        name:"Goal 2",
        id: "548625",
        type: "Goal",
        description: "Generic goal...",
        priority: "Medium",
        status: "In Progress...",
        assignedDevs:[
            {
                name: "Janet Rodgers",
                id: 9639
            },
            {
                name:'Oliver Hansen',
                id:19639
            },
        ],
        comments:[
            "6242547",
            "6272567"
        ],
        date: "01/12/22",
        private: true,
        project:{
            id:"123458",
            name: "Project 3"
        } 
    },
    {
        name:"Feature 2",
        id: "487825",
        type: "Feature Request",
        description: "Generic Feature Request",
        priority: "Low",
        status: "Closed",
        assignedDevs:[
            {
                name: "Lark Mann",
                id: 7450
            },
            {
                name: "Janet Rodgers",
                id: 9639
            },
            {
                name:'Ralph Hubbard',
                id:49639
            },
        ],
        comments:[
            "127567",
            "128567",
            "128427"
        ],
        date: "01/12/22",
        private: false,
        project:{
            id:"123456",
            name: "Project 1"
        } 
    }
]