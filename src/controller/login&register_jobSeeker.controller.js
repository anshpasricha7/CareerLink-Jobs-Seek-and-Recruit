import user_jobSeeker from "../model/user_jobSeeker.model.js";
import { sendEmail } from "../../mail.js";
import recruiter_jobData from "../model/recruiter_jobPostData.model.js";
import user_profile from "../model/jobSeeker_profile.js";
import sendUserProfile from "../../mail_profile.js";
import applicant from "../model/recruiter_applicants.js";

export default class login_register_jobSeeker{


    static getintro(req, res){
        res.render("intro" , {layout: false});

    }


    static getregister(req , res){
         
       
          res.render('register_jobSeeker' , {layout: false ,userType: 'jobSeeker'});
    }


    static postregister(req , res){
        

         req.session.name=req.body.name;
          req.session.email=req.body.email;
          
        user_jobSeeker.add(req.body);
        const text="Welcome to CareerLink. Lets help you land your dream job:)"
        sendEmail(req.body.email , "Registered",text);
        

     
        res.redirect('/JobSeeker_profile');


    }

    static postProfile(req, res){
       
        user_profile.addNewProfile(req);
        const job=recruiter_jobData.getData();
        
        recruiter_jobData.printJobs();
//Get the corrext profile to feed the homepage with
           res.locals.styles = '<link rel="stylesheet" href="/homepage_jobSeeker.css">';
           const profile = user_profile.getProfilesByEmail(req.session.email);
        return res.render("homepage_jobSeeker" , {layout: 'layout_jobSeeker' , profile: profile , jobs:job});
       
    }
    static  filterJobs(req , res) {
    let filteredResults = recruiter_jobData.getData();
    let filterJobType  = req.body.jobType
    let filterLocation= req.body.location
    let filterSkills= req.body.skills

    // Normalize filter values to lowercase and trim whitespace
    const jobTypeFilter = filterJobType ? filterJobType.toLowerCase().trim() : '';
    const locationFilter = filterLocation ? filterLocation.toLowerCase().trim() : '';
    const skillsFilterArray = filterSkills ? filterSkills.toLowerCase().split(',').map(s => s.trim()).filter(s => s !== '') : [];

    // Filter by Job Type
    if (jobTypeFilter) {
        filteredResults = filteredResults.filter(job =>
            job.jobType.toLowerCase().includes(jobTypeFilter)
        );
    }

    // Filter by Location
    if (locationFilter) {
        filteredResults = filteredResults.filter(job =>
            job.location.toLowerCase().includes(locationFilter)
        );
    }

    // Filter by Skills
    if (skillsFilterArray.length > 0) {
        // A job matches if it has AT LEAST ONE of the required skills
        filteredResults = filteredResults.filter(job => {
            // Check if every skill in skillsFilterArray is present in job.skills
            // For a "match if job has ANY of the required skills", use .some()
            // For a "match if job has ALL of the required skills", use .every()
            return skillsFilterArray.every(requiredSkill =>
                job.skills.some(jobSkill => jobSkill.toLowerCase().includes(requiredSkill))
            );
        });
    }

     res.locals.styles = '<link rel="stylesheet" href="/homepage_jobSeeker.css">';
           const profile = user_profile.getProfilesByEmail(req.session.email);
        return res.render("homepage_jobSeeker" , {layout: 'layout_jobSeeker' , profile: profile , jobs:filteredResults});
       
}
static sendProfile(req , res){
    const id=req.params.id;
    console.log("*************GOT id" , id);
    const profile=user_profile.getProfilesByEmail(req.session.email);
    const recruiter_email=recruiter_jobData.getJobById(id).email;
    
    sendUserProfile(profile , recruiter_email);
    console.log("Email and profile sent");
    
    applicant.addApplicant(profile.profilePic , req.session.name , req.session.email , profile.experience ,id);
console.log(profile.profilePic);
    const job = recruiter_jobData.getData();
    
     res.locals.styles = '<link rel="stylesheet" href="/homepage_jobSeeker.css">';
        return res.render("homepage_jobSeeker" , {
        layout: 'layout_jobSeeker',
        profile,
        jobs: job,
        successMessage: "Applied Successfully"
    });
}
static viewApplicants(req, res){
    const id=req.params.id;
    const allapps=applicant.getData();

   const apps=allapps.filter(function(aaps){
        return aaps.id === id;
    })

    res.locals.styles = '<link rel="stylesheet" href="/recruiter_applicants.css">';
    return res.render("recruiter_applicants" , {layout:'layout_recruiter' , applicants:apps});

}



}