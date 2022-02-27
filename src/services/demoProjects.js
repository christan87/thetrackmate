//needs an author field / project admin field
const projects = [
    {
        projectName: "Project 1",
        projectDescription: "A test project...",
        collaborators: [
            {
                name: "Mark Tate",
                id: 7410
            },
            {
                name: "Rodger Bellows",
                id: 9630
            },
            {
                name:'Van Henry',
                id:29639
            }
        ],
        tickets: [
            "48625",
            "487825"
        ],
        comments:[
            "557410",
            "558520"
        ],
        status: "In Progress",
        priority: "Low",
        private: false,
        id: "123456"
    },
    {
        projectName: "Project 2",
        projectDescription: "A test project...",
        collaborators: [
            {
                name:'Van Henry',
                id:29639
            },
            {
                name:'Omar Alexander',
                id:59639
            },
            {
                name:'Virginia Andrews',
                id:99639
            }
        ],
        tickets: [
            "48725",
            "4845625"
        ],
        comments:[
            "559630",
            "557450"
        ],
        status: "In Progress",
        priority: "Medium",
        private: false,
        id: "123457"
    },
    {
        projectName: "Project 3",
        projectDescription: "A test project...",
        collaborators: [
            {
                name:'Bradley Wilkerson',
                id:89639
            },
            {
                name:'Miriam Wagner',
                id:79639
            },
            {
                name:'April Tucker',
                id:39639
            }
        ],
        tickets: [
            "486288",
            "548625"
        ],
        comments:[
            "558580",
            "559639"
        ],
        status: "Complete",
        priority: "High",
        private: true,
        id: "123458"
    },
        {
        projectName: "Project 4",
        projectDescription: "A test project...",
        collaborators: [
        ],
        tickets: [
        ],
        comments:[
        ],
        status: "Open",
        priority: "High",
        private: true,
        id: "124459"
    }
]
export default projects;