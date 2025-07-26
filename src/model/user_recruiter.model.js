export default class user_recruiter{
   constructor( name, email , password){
        this.name = name;
        this.email = email;
        this.password = password; 
        this.skill = this.skill;  
    }
    static add(entry){
        const newentry= new user_recruiter(entry.name , entry.email , entry.password);
        users.push(newentry);
        console.log("New recruiter added");
        
    }

}

var users=[];