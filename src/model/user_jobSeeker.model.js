export default class user_jobSeeker{
   constructor( name, email , password){
        this.name = name;
        this.email = email;
        this.password = password; 

  
    }
    static add(entry){
        const newentry= new user_jobSeeker(entry.name , entry.email , entry.password);
        users.push(newentry);

        console.log("New job seeker" , newentry);
        //add nodemail
    }

}

var users=[];