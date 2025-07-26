export default class recruiter_jobData{
    constructor(name , email ,id, logo , jobType,location, experience , skills , company){
      this.name=name;
      this.email=email;
      this.logo=logo;
      this.id=id;
      this.jobType=jobType;
      this.location=location
      this.experience=experience;
      this.skills = skills.split(',').map(s => s.trim());
      this.company=company
    }

    static addNewJob(name , email , logo , jobType,location, experience , skills, company){
        
        const newentry=new recruiter_jobData(name , email,currentId , logo , jobType,location, experience , skills , company);

        jobPostings.push(newentry);
        
        currentId++;
        

    }
    static getData(){
        return jobPostings;
    }
     static getDataByEmail(email){
     const jobs=jobPostings.filter(function(job){
        return job.email===email;
     });
     return jobs;
    }


    static getJobById(id){

        const job = jobPostings.find(function(job){
            return job.id===parseInt(id);
        });
        if(!job) console.warn("NO JOB FoUND");
      
        return job;
    }

    static makechanges(id , body){
          const index = jobPostings.findIndex(function(job){
            return job.id===parseInt(id);
        });
        jobPostings[index].name=body.name;
        jobPostings[index].email=body.email;
        jobPostings[index].logo=body.logo;
        jobPostings[index].jobType=body.jobType;
        jobPostings[index].experience=body.experience;
        jobPostings[index].skills =body.skills.split(',').map(s => s.trim());
        return ;
    }
    static delete(id){
        var index= jobPostings.findIndex(function(job){
            return job.id===parseInt(id);
        });
        jobPostings.splice(index, 1);
    }
    static printJobs(){
        
    }

}
let currentId=1;
var jobPostings=[];