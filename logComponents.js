const logModules = [ 
                    {logComponent: "Global",logLevel:"QUIET"},
                    {logComponent: "cp6",logLevel:"VERBOSE",FollowGlobal:"true",Enum:1},
                    {logComponent: "deviceadapter",logLevel:"VERBOSE",FollowGlobal:"true",Enum:2},
                    {logComponent: "directoryadapter",logLevel:"VERBOSE",FollowGlobal:"true",Enum:3},
                    {logComponent: "imageservice",logLevel:"VERBOSE",FollowGlobal:"true",Enum:4},
                    {logComponent: "homekit",logLevel:"VERBOSE",FollowGlobal:"true",Enum:5}
                   ]
const produceNrSnapshotWhenError = 200
module.exports = {logModules,produceNrSnapshotWhenError};
