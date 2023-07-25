const db = require("../models/index");

const Contact = db.contacts;
const User = db.users;

//searchedUser-search Result user
//searching user = who is searching
const showOrNotShowEmailAddress = async (searchedUser,searchingUser) =>{

    const searchedUserDetails = await User.findOne({
        where:{
            phoneNumber:searchedUser.phoneNumber
        },
        include:["contacts"]
    });
    
    let  allContactOfSearchedUser = searchedUserDetails.contacts;//array of contacts
    const searchingUserNum = searchingUser.phoneNumber;
    //convert all the contacts into json
    allContactOfSearchedUser = allContactOfSearchedUser.map(contactObj => {
        return contactObj.toJSON();
    });

    const isSearchingUserPresent = allContactOfSearchedUser.filter((obj)=>{
        return obj.contactNum === searchingUserNum;
    })
    if(isSearchingUserPresent.length == 0){
        searchedUser.emailAddress = undefined;
    }
    return searchedUser;
}

module.exports = showOrNotShowEmailAddress;