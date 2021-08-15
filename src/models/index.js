const User = require('./User');
const Login = require('./Login');
const Study = require('./Study');
const File = require('./File');
const Graph = require('./Graph');


User.hasMany(Login);
Login.belongsTo(User);

User.hasMany(Study);
Study.belongsTo(User);

Study.hasMany(File);
File.belongsTo(Study)

Study.hasMany(Graph);
Graph.belongsTo(Study);
