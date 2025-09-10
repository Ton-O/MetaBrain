const logModules = [ 
                    {logComponent: "Global",logLevel:"QUIET"},
                    {logComponent: "cp6",logLevel:"VERBOSE",FollowGlobal:"true"},
                    {logComponent: "deviceadapter",logLevel:"VERBOSE",FollowGlobal:"true"},
                    {logComponent: "directoryadapter",logLevel:"VERBOSE",FollowGlobal:"true"},
                    {logComponent: "imageservice",logLevel:"VERBOSE",FollowGlobal:"true"},
                    {logComponent: "homekit",logLevel:"VERBOSE",FollowGlobal:"true"}
                   ]
const  produceNrSnapshotWhenError = 200;
module.exports = {logModules,produceNrSnapshotWhenError};
