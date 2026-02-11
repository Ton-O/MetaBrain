const logModules = [ 
                    {logComponent: "Global",logLevel:"QUIET"},
                    {logComponent: "cp6",logLevel:"QUIET",FollowGlobal:"true",Enum:1},
                    {logComponent: "deviceadapter",logLevel:"QUIET",FollowGlobal:"true",Enum:2},
                    {logComponent: "directoryadapter",logLevel:"QUIET",FollowGlobal:"true",Enum:3},
                    {logComponent: "imageservice",logLevel:"QUIET",FollowGlobal:"true",Enum:4},
                    {logComponent: "homekit",logLevel:"QUIET",FollowGlobal:"true",Enum:5}
                   ]
const produceNrSnapshotWhenError = 1000
module.exports = {logModules,produceNrSnapshotWhenError};
