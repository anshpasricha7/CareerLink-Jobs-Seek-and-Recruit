export default class user_profile {
    constructor(profilePicPath, phone, age, experience, resumePath , email) {
        // We'll store the path to the uploaded files, not the files themselves
        this.profilePic = profilePicPath; // Path where the profile picture is saved
        this.phone = phone;
        this.age = age;
        this.experience = experience;
        this.resume = resumePath; // Path where the resume PDF is saved
        this.email=email;
    }

    
    displayProfile() {
        console.log(`Profile Picture: ${this.profilePic}`);
        console.log(`Phone: ${this.phone}`);
        console.log(`Age: ${this.age}`);
        console.log(`Experience: ${this.experience}`);
        console.log(`Resume: ${this.resume}`);
    }
    static addNewProfile(req ){
         const profilePicPath = req.files?.profilePic?.[0]?.filename;
    const resumePath = req.files?.resume?.[0]?.filename;
        const newentry= new user_profile(profilePicPath , req.body.phone , req.body.age ,req.body.experience , resumePath, req.session.email);
        profiles.push(newentry);
        console.warn("new profile added");
    }
    static getProfilesByEmail(email){
        return profiles.find(function(profile){
            return profile.email===email;
        })
    }
}

let profiles = [];
