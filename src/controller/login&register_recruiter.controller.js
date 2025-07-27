import user_recruiter from "../model/user_recruiter.model.js";
import { sendEmail } from "../../mail.js";
import recruiter_jobData from "../model/recruiter_jobPostData.model.js";

export default class login_register_recruiter{
    static getintro(req, res){
        res.render("intro" , {layout: false});

    }
    static getregister(req , res){
        
            res.render('register_recruiter' , {layout:false ,userType: 'recruiter'});
    }
     static postregister(req , res){
        req.session.name=req.body.name;
          req.session.email=req.body.email;
          
            console.log("Session saved email and name");

         user_recruiter.add(req);
         const text="Welcome to CareerLink. Lets get you the right people:)";
         sendEmail(req.body.email , "Registered",text);
         res.locals.styles='<link rel="stylesheet" href="/homepage_recruiter.css">'
        res.render("homepage_recruiter" , {layout:"layout_recruiter" ,jobs:null});
    
        }
        static getHome(req , res){
            console.log(recruiter_jobData.getData());
            const jobs = recruiter_jobData.getData();
            let correctjobs=[];
            for(let i=0;i<jobs.length;i++){
                if(jobs[i].email === req.session.email)
                correctjobs.push(jobs[i]);
            }
            res.locals.styles='<link rel="stylesheet" href="/homepage_recruiter.css">'
            res.render('homepage_recruiter' , {layout:"layout_recruiter" ,  jobs: correctjobs});
        }

        static getAddJob(req, res){
           res.locals.styles = '<link rel="stylesheet" href="/addJob.css">';
           res.render("addJob" , {layout:false});
        }

        static postJob(req, res){

            console.log("accessed postJOb in recruiter controller");

            recruiter_jobData.addNewJob(req.session.name , 
                                        req.session.email ,
                                        req.body.logo,
                                        req.body.jobType,
                                        req.body.location,
                                        req.body.experience,
                                        req.body.skills,
                                        req.body.company);
            
            res.redirect("/home_recruiter" );

            
        }

        static editJob(req, res){
            const id=req.params.id;
  console.log("id to be edited: " , id);
            const job=recruiter_jobData.getJobById(id);
          
           return res.render("editJob" , {layout:false , job:job});
            
        }

        static savechanges(req, res){
            const id=req.params.id;
            recruiter_jobData.makechanges(id ,req.body , req.session.name, req.session.email);
            return res.redirect("/home_recruiter" );


        }
        static deleteJob(req , res){
            const id=req.params.id;
            recruiter_jobData.delete(id);
              return res.redirect("/home_recruiter" );
        }
        static  filterJobsByCompanyOrType(req  ,res) {
    let jobs=recruiter_jobData.getDataByEmail(req.session.email); 
    let searchTerm = req.body.search;
    console.log(jobs , searchTerm);
    // If the search term is empty, return all jobs
   

    // Split the search term by commas, trim whitespace, and convert to lowercase
    const searchTermsArray = searchTerm.toLowerCase().split(',').map(term => term.trim()).filter(term => term !== '');

    // If after splitting and trimming, there are no valid terms, return all jobs
    

    // Filter the jobs
    let filteredResults = jobs.filter(job => {
        // A job matches if its company name OR job type includes ANY of the search terms
        return job.jobType===searchTerm;
    });
     filteredResults = jobs.filter(job => {
        // A job matches if its company name OR job type includes ANY of the search terms
        return job.location===searchTerm;
    });

    console.log(filteredResults);

  
    res.locals.styles='<link rel="stylesheet" href="/homepage_recruiter.css">'
            res.render('homepage_recruiter' , {layout:"layout_recruiter" ,  jobs: filteredResults});
        }
    
}